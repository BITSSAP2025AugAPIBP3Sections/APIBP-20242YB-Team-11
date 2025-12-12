# OfferZone

OfferZone is an example Node.js REST API that demonstrates managing Products, Offers, and Users. This repository is prepared for open-source collaboration and distributed under the MIT License.

Project goals:
- Provide a clear, modular Express-based API example
- Demonstrate authentication, role-based authorization, and basic CRUD
- Expose an OpenAPI spec (`swagger.yaml`) and a GraphQL endpoint

Status: Active — contributions welcome. See `CONTRIBUTING.md`.

---

Table of contents
- Overview
- Quick start
- Scripts & environment
- API surface (short)
- GraphQL
- Development
- Contributing
- Security
- Maintainers & support
- License

## Overview

OfferZone contains an Express server (`offerzone/index.js`) and the following key modules:

- `routes/` — HTTP routes for users, products, and offers
- `controllers/` — controller logic for routes
- `models/` — Mongoose models for persistence
- `middleware/` — authentication and authorization
- `graphql/` — GraphQL schema and resolvers
- `swagger.yaml` — OpenAPI v3 specification for the REST API

This project uses MongoDB via Mongoose. Environment variables are used to configure the database and secrets.

## Quick start

Prerequisites
- Node.js 14 or newer
- npm (or yarn)
- MongoDB (local or cloud)

Install and run locally

```bash
git clone https://github.com/BITSSAP2025AugAPIBP3Sections/APIBP-20242YB-Team-11.git
cd APIBP-20242YB-Team-11/offerzone
npm install

# Development server (auto-restart):
npm run dev

# Production start:
npm start
```

The server listens on `process.env.PORT` (default 8080). Swagger UI is available at `http://localhost:8080/api-docs`.

## Scripts & environment

package scripts (in `offerzone/package.json`)
- `npm start` — start production server
- `npm run dev` — start with `nodemon` for development

Important environment variables (set in a `.env` file or CI):
- `PORT` — port for the HTTP server (default 8080)
- `MONGODB_URI` — MongoDB connection string (required for runtime)
- `JWT_SECRET` — secret used to sign JWTs for auth

Note: Please add your contact email for security and maintainers in `SECURITY.md` and `MAINTAINERS.md` (placeholders exist). I cannot add private addresses on your behalf.

## API surface (short)

Base REST prefixes (as implemented in `index.js`):
- `GET /` — health / welcome
- `POST /offerzone/auth` — user signup
- `POST /offerzone/auth/session` — login (returns JWT)
- `GET /offerzone/auth/me` — authenticated current user
- `GET /offerzone/products` — list products
- `POST /offerzone/products` — create product (retailer only)
- `GET /offerzone/products/mine` — retailer's products (retailer only)
- `GET /offerzone/products/:id` — product details
- `GET /offerzone/offers` — list offers
- `GET /offerzone/offers/filter` — filtered offers
- `GET /offerzone/offers/search/:city/:query` — search offers
- `GET /offerzone/offers/:id` — offer details
- `POST /offerzone/offers` — create offer (retailer only)

Authorization
- Endpoints that modify resources require a `Bearer <token>` Authorization header. Tokens are issued by the login route.

## GraphQL

GraphQL is exposed at `/graphql`. The schema and resolvers are in `offerzone/graphql/schema.js`. The GraphQL server is configured to include a `user` in the context when a valid bearer token is present.

## Development

- Follow the branch and PR workflow in `CONTRIBUTING.md`.
- Keep changes small and document API updates in `swagger.yaml`.
- Add tests and CI for new features.

Recommended next steps (optional)
- Add ESLint and Prettier configuration
- Add a GitHub Actions workflow to run tests and lint on PRs
- Add integration tests that run against an ephemeral MongoDB (e.g., via GitHub Actions)

## Contributing

We welcome contributions. See `CONTRIBUTING.md`, issue templates, and the PR template in `.github/`.

## Security

Do not file security issues publicly. Follow `SECURITY.md` to report vulnerabilities privately. Replace the placeholder security contact email in `SECURITY.md` with a real address before publishing.

## Maintainers & support

See `MAINTAINERS.md` and `SUPPORT.md` for maintainers and recommended support channels. Please add personal contact emails in `MAINTAINERS.md` if you want maintainers listed with email contact.

## License

This repository uses the MIT License. See `LICENSE` for the full text.

---

If you'd like, I can add CI workflow files and ESLint/Prettier configs next. Also, tell me the contact email you want in `SECURITY.md` and `MAINTAINERS.md` and I will add them for you.
# OfferZone - An Open Source Project

Welcome to the **OfferZone** open-source repository!  

This project is built as part of the BITSSAP 2025 API & Back-End Programming course, focusing on modern backend engineering practices including API development, database integration, and secure scalable architecture.

---

## 🚀 Features
- RESTful API implementation
# OfferZone

OfferZone is a sample Node.js REST API for managing products, offers, and users. This repository is prepared to be an open source project under the MIT License and is ready for community contributions.

**Quick facts**
- **Language:** JavaScript (Node.js)
- **Framework:** Express.js
- **API Spec:** `swagger.yaml` (OpenAPI)
- **License:** MIT

---

**Status:** Active — contributions welcome. See `CONTRIBUTING.md` for how to help.

## Table of Contents
- Project Overview
- Getting Started
- Development
- API
- Contributing
- Code of Conduct
- Security
- Support
- License

## Project Overview

OfferZone provides endpoints to manage Products, Offers, and Users. It can serve as a learning example or a starting point for a small e-commerce promotions service focusing on discoverability of local offers.

Key project files and folders:

- `index.js` — application entry point
- `package.json` — dependencies & scripts
- `swagger.yaml` — API specification (OpenAPI)
- `controllers/`, `models/`, `routes/` — app modules
- `middleware/` — middleware (e.g., auth)

## Getting Started

Prerequisites:

- Node.js 14+ (LTS recommended)
- npm or yarn

Clone the repo and install dependencies:

```bash
git clone https://github.com/BITSSAP2025AugAPIBP3Sections/APIBP-20242YB-Team-11.git
cd APIBP-20242YB-Team-11/offerzone
npm install
```

Run the app (development):

```bash
npm start
```

By default the server listens on the port configured in `index.js` or `process.env.PORT`.

To run tests (if added):

```bash
npm test
```

## Development

- Create branches using `feat/`, `fix/`, `chore/` prefixes.
- Keep changes small and focused; write tests for new behavior.
- Update `swagger.yaml` for any HTTP API changes.

### Linting & Formatting

Add ESLint/Prettier configs and CI in future contributions. Follow existing code style when modifying code.

## API

The API is described in `swagger.yaml`. Use that to generate clients, run interactive docs, or validate endpoints.

## Contributing

We welcome contributions — small to large. Please read `CONTRIBUTING.md` and follow the PR template when opening changes.

## Code of Conduct

This project adopts the Contributor Covenant. See `CODE_OF_CONDUCT.md` for details.

## Security

If you find a security issue, do not open a public issue. Follow `SECURITY.md` to report privately.

## Support

If you need help using OfferZone, check `SUPPORT.md` for available channels.

## License

This repository is licensed under the MIT License — see the `LICENSE` file.

---

If you'd like, I can add CI, linters, or example deployment instructions next.
