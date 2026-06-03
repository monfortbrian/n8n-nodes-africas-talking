# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2026-04-15

### Added
- **SMS resource** Send (single and multiple recipients), Fetch Messages, Create Subscription.
- **Airtime resource** Send airtime to one or more recipients with currency code and amount.
- **Voice resource** Make outbound call from a registered Africa's Talking number.
- Sandbox and production environment toggle in credentials.
- Granular Auth credential: username + API key sent as request header, environment-aware base URL.
- `usableAsTool` flag for AI Agent workflows.
- Full error handling with continue-on-fail support.
- Response JSON parsing: handles both JSON and form-encoded string responses from AT API.