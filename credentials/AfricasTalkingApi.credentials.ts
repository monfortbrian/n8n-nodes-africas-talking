import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AfricasTalkingApi implements ICredentialType {
	name = 'africasTalkingApi';

	displayName = "Africa's Talking API";

	icon: Icon = 'file:../icons/africas-talking.svg';

	documentationUrl = 'https://developers.africastalking.com/docs/overview';

	properties: INodeProperties[] = [
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Africa\'s Talking username (usually "sandbox" for testing)',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Africa\'s Talking API Key',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
				{
					name: 'Production',
					value: 'production',
				},
			],
			default: 'sandbox',
			description: 'Select the environment to use',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				apiKey: '={{$credentials.apiKey}}',
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://api.{{$credentials.environment === "sandbox" ? "sandbox." : ""}}africastalking.com/version1',
			url: '/user',
			method: 'GET',
			headers: {
				apiKey: '={{$credentials.apiKey}}',
			},
		},
	};
}
