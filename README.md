# n8n-nodes-africas-talking


[![npm version](https://img.shields.io/npm/v/n8n-nodes-africas-talking)](https://www.npmjs.com/package/n8n-nodes-africas-talking)
[![npm downloads](https://img.shields.io/npm/dt/n8n-nodes-africas-talking)](https://www.npmjs.com/package/n8n-nodes-africas-talking)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

n8n community node for integrating with Africa’s Talking APIs (SMS, Voice, Airtime).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.


## Installation

### Community Nodes (Recommended)
Go to Settings > Community Nodes
Select Install
Enter n8n-nodes-mtn-momo
Agree and install


### Manual Installation

```bash
npm install n8n-nodes-africas-talking
```

## Operations

### SMS

- **Send**: Send an SMS message to one or more recipients
- **Fetch Messages**: Retrieve your messages
- **Create Subscription**: Create a premium subscription

### Airtime

- **Send**: Send airtime to one or more phone numbers

### Voice

- **Make Call**: Make an outbound call

## Credentials

To use this node, you'll need:

1. **Username**: Your Africa's Talking username (typically "sandbox" for testing)
2. **API Key**: Your Africa's Talking API key
3. **Environment**: Choose between Sandbox (for testing) or Production

### Getting Your API Credentials

1. Sign up for a free account at [africastalking.com](https://africastalking.com/)
2. Navigate to your dashboard
3. Go to Settings > API Key to find your credentials
4. For production, you'll need to verify your account and purchase credits

## Compatibility

Tested with n8n v2.0.0+

## Usage

### Example: Send SMS

1. Add the "Africa's Talking" node to your workflow
2. Configure your credentials
3. Select "SMS" as the resource
4. Select "Send" as the operation
5. Enter the recipient phone number (e.g., +250788XXXYYY)
6. Enter your message
7. (Optional) Add a sender ID if you have one registered
8. Execute the node

### Example: Send Airtime

1. Add the "Africa's Talking" node to your workflow
2. Configure your credentials
3. Select "Airtime" as the resource
4. Select "Send" as the operation
5. Add recipients with phone number, currency code, and amount
6. Execute the node

### Example Workflow

```json
{
  "nodes": [
    {
      "parameters": {
        "resource": "sms",
        "operation": "send",
        "to": "+250788XXXYYY",
        "message": "Hello from Xxx",
        "from": "Company/NGO/..."
      },
      "name": "Africa's Talking",
      "type": "n8n-nodes-africas-talking.africasTalking",
      "position": [250, 300]
    }
  ]
}
```


## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Africa's Talking API documentation](https://developers.africastalking.com/docs)
- [Africa's Talking Dashboard](https://account.africastalking.com/)

## License

[MIT](LICENSE.md)

## Support

- For issues with this node, please [open an issue](https://github.com/monfortbrian/n8n-nodes-africas-talking/issues)
- For Africa's Talking API issues, contact their [support team](https://africastalking.com/contact)
- For n8n issues, visit the [n8n forum](https://community.n8n.io/)

## Version History

### 0.1.0 (Initial Release)

- SMS operations (Send, Fetch Messages, Create Subscription)
- Airtime operations (Send)
- Voice operations (Make Call)
- Sandbox and Production environment support
- Proper error handling and authentication

## Roadmap

Future improvements planned:

- [ ] Add USSD operations
- [ ] Add Payments operations
- [ ] Add Voice callback handling
- [ ] Add SMS delivery reports
- [ ] Add bulk SMS support
- [ ] Add contact management
- [ ] Improve error messages
- [ ] Add more comprehensive tests