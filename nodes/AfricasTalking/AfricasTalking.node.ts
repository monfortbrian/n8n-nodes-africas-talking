import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class AfricasTalking implements INodeType {
	description: INodeTypeDescription = {
		displayName: "Africa's Talking",
		name: 'africasTalking',
		icon: 'file:africas-talking.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: "Send SMS, make calls, and more with Africa's Talking API",
		defaults: {
			name: "Africa's Talking",
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'africasTalkingApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL:
				'={{$credentials.environment === "sandbox" ? "https://api.sandbox.africastalking.com/version1" : "https://api.africastalking.com/version1"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'SMS',
						value: 'sms',
					},
					{
						name: 'Airtime',
						value: 'airtime',
					},
					{
						name: 'Voice',
						value: 'voice',
					},
				],
				default: 'sms',
			},

			// SMS Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sms'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						description: 'Send an SMS message',
						action: 'Send an SMS',
					},
					{
						name: 'Fetch Messages',
						value: 'fetchMessages',
						description: 'Fetch your messages',
						action: 'Fetch messages',
					},
					{
						name: 'Create Subscription',
						value: 'createSubscription',
						description: 'Create a premium subscription',
						action: 'Create subscription',
					},
				],
				default: 'send',
			},

			// SMS Send Parameters
			{
				displayName: 'Recipients',
				name: 'to',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				default: '',
				placeholder: '+254711XXXYYY',
				description: 'Phone number(s) to send SMS to. For multiple recipients, separate with commas.',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				default: '',
				description: 'The message to send',
			},
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				default: '',
				placeholder: 'MYCOMPANY',
				description: 'Your registered short code or alphanumeric sender ID',
			},
			{
				displayName: 'Enqueue',
				name: 'enqueue',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['sms'],
						operation: ['send'],
					},
				},
				default: false,
				description: 'Whether to enqueue the message for later sending',
			},

			// Airtime Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['airtime'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						description: 'Send airtime to phone numbers',
						action: 'Send airtime',
					},
				],
				default: 'send',
			},

			// Airtime Send Parameters
			{
				displayName: 'Recipients',
				name: 'recipients',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				required: true,
				displayOptions: {
					show: {
						resource: ['airtime'],
						operation: ['send'],
					},
				},
				default: {},
				options: [
					{
						name: 'recipient',
						displayName: 'Recipient',
						values: [
							{
								displayName: 'Phone Number',
								name: 'phoneNumber',
								type: 'string',
								default: '',
								placeholder: '+254711XXXYYY',
								description: 'The phone number to send airtime to',
							},
							{
								displayName: 'Currency Code',
								name: 'currencyCode',
								type: 'string',
								default: 'KES',
								placeholder: 'KES',
								description: 'The 3-letter ISO currency code',
							},
							{
								displayName: 'Amount',
								name: 'amount',
								type: 'string',
								default: '',
								placeholder: '100',
								description: 'The amount to send',
							},
						],
					},
				],
			},

			// Voice Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['voice'],
					},
				},
				options: [
					{
						name: 'Make Call',
						value: 'call',
						description: 'Make an outbound call',
						action: 'Make a call',
					},
				],
				default: 'call',
			},

			// Voice Call Parameters
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['voice'],
						operation: ['call'],
					},
				},
				default: '',
				placeholder: '+254711082XYZ',
				description: 'Your Africa\'s Talking phone number',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['voice'],
						operation: ['call'],
					},
				},
				default: '',
				placeholder: '+254711XXXYYY',
				description: 'The phone number to call',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('africasTalkingApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'sms') {
					if (operation === 'send') {
						const to = this.getNodeParameter('to', i) as string;
						const message = this.getNodeParameter('message', i) as string;
						const from = this.getNodeParameter('from', i, '') as string;
						const enqueue = this.getNodeParameter('enqueue', i, false) as boolean;

						const body: Record<string, string> = {
							username: credentials.username as string,
							to,
							message,
						};

						if (from) {
							body.from = from;
						}

						if (enqueue) {
							body.enqueue = '1';
						}

						const options: IHttpRequestOptions = {
							method: 'POST' as IHttpRequestMethods,
							url: '/messaging',
							body,
							json: false,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'africasTalkingApi',
							options,
						);
					} else if (operation === 'fetchMessages') {
						const options: IHttpRequestOptions = {
							method: 'GET' as IHttpRequestMethods,
							url: '/messaging',
							qs: {
								username: credentials.username,
							},
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'africasTalkingApi',
							options,
						);
					}
				} else if (resource === 'airtime') {
					if (operation === 'send') {
						interface Recipient {
							phoneNumber: string;
							currencyCode: string;
							amount: string;
						}

						interface RecipientsData {
							recipient: Recipient[];
						}

						const recipientsData = this.getNodeParameter('recipients', i) as RecipientsData;
						const recipients = recipientsData.recipient.map((r: Recipient) => ({
							phoneNumber: r.phoneNumber,
							currencyCode: r.currencyCode,
							amount: r.amount,
						}));

						const body = {
							username: credentials.username as string,
							recipients: JSON.stringify(recipients),
						};

						const options: IHttpRequestOptions = {
							method: 'POST' as IHttpRequestMethods,
							url: '/airtime/send',
							body,
							json: false,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'africasTalkingApi',
							options,
						);
					}
				} else if (resource === 'voice') {
					if (operation === 'call') {
						const from = this.getNodeParameter('from', i) as string;
						const to = this.getNodeParameter('to', i) as string;

						const body = {
							username: credentials.username as string,
							from,
							to,
						};

						const options: IHttpRequestOptions = {
							method: 'POST' as IHttpRequestMethods,
							url: '/call',
							body,
							json: false,
						};

						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'africasTalkingApi',
							options,
						);
					}
				}

				// Parse the response if it's a string
				if (typeof responseData === 'string') {
					try {
						responseData = JSON.parse(responseData);
					} catch {
						// If parsing fails, keep the string response
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, {
					itemIndex: i,
					description: (error as Error).message,
				});
			}
		}

		return [returnData];
	}
}
