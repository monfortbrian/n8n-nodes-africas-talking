# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.1] - 2026-06-09

### Fixed
- GitHub Actions publish workflow updated: added `--ignore-scripts` to bypass `prepublishOnly` hook, updated action versions to `checkout@v4.2.2` and `setup-node@v4.4.0` for Node.js 24 compatibility, added `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` env var.
- npm provenance now active, all future releases published via GitHub Actions with cryptographic provenance statement.

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