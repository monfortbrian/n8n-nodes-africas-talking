# n8n-nodes-africas-talking

[![npm](https://img.shields.io/npm/v/n8n-nodes-africas-talking)](https://www.npmjs.com/package/n8n-nodes-africas-talking)
[![npm downloads](https://img.shields.io/npm/dt/n8n-nodes-africas-talking)](https://www.npmjs.com/package/n8n-nodes-africas-talking)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

n8n community node for [Africa's Talking](https://africastalking.com). Send SMS, make voice calls, and distribute airtime across Africa. Works in sandbox and production environments.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

---

## Installation

**Via n8n UI:** Settings → Community Nodes → search `n8n-nodes-africas-talking` → Install

**Via npm:**
```bash
npm install n8n-nodes-africas-talking
```

---

## Credentials

| Field       | Description |
|-------------|-------------|
| Username    | Your Africa's Talking username (`sandbox` for testing) |
| API Key     | Found in your AT dashboard under Settings → API Key |
| Environment | `sandbox` (testing) or `production` |

Sign up free at [africastalking.com](https://africastalking.com). Sandbox is fully functional at no cost.

---

## Resources & Operations

| Resource | Operations |
|----------|------------|
| SMS      | Send, Fetch Messages, Create Subscription |
| Airtime  | Send |
| Voice    | Make Call |

---

## Example: Send Outbreak Alert SMS

```
Resource:   SMS
Operation:  Send
To:         +250788123456,+256701234567
Message:    ALERT: Suspected case registered in your district. Case ID: CASE-2026-001. Report to district health officer immediately.
From:       HEALTH-ALERT
```

Supports multiple recipients comma-separated. Sender ID must be pre-registered with Africa's Talking for production.

---

## Compatibility

- **Africa's Talking API:** v1
- **n8n:** 1.0+
- **Node.js:** 22+
- **Countries:** Kenya, Uganda, Tanzania, Nigeria, Ghana, Rwanda, Ethiopia, Cameroon, Zambia, and 30+ others

---

## API Reference

```
POST /version1/messaging           (SMS send)
GET  /version1/messaging           (fetch messages)
POST /version1/airtime/send        (airtime send)
POST /version1/calls               (voice call)
```

Base URL: `https://api.sandbox.africastalking.com` (sandbox) or `https://api.africastalking.com` (production)

---

## Resources

- [Africa's Talking API Docs](https://developers.africastalking.com/docs)
- [Africa's Talking Dashboard](https://account.africastalking.com/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- [n8n-nodes-dhis2](https://www.npmjs.com/package/n8n-nodes-dhis2) DHIS2 integration
- [n8n-nodes-rapidpro](https://www.npmjs.com/package/n8n-nodes-rapidpro) RapidPro messaging

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit: `git commit -m 'feat(africas-talking): your change'`
4. Push and open a Pull Request

---

## Support

- **Issues:** [GitHub Issues](https://github.com/monfortbrian/n8n-nodes-africas-talking/issues)
- **n8n Community:** [community.n8n.io](https://community.n8n.io/)

---

## License

[MIT](LICENSE) © 2026 [Monfort Brian N. | 宁俊](https://github.com/monfortbrian)

---

## Acknowledgments

Built to enable last-mile communication in healthcare and humanitarian workflows. Part of an open-source interoperability stack for outbreak response across low-resource settings.