
# Promptly AI Prompt Versioning & Testing Platform

> Git-like prompt versioning, A/B testing, and AI scoring for teams. Ship
> better prompts faster.

## 🚩 Problem Statement

Teams building AI products struggle to iterate on prompts safely and
collaboratively. Prompt changes are often ad-hoc, untested, and hard to
rollback  causing inconsistent model behavior and lost time.

## 💡 Solution Overview

Promptly provides Git-like versioning for prompts, A/B testing across
prompt variants, automated AI-based scoring of responses, and rollback to
higher-performing prompts  all in a multi-tenant SaaS platform.

## ✨ Key Features

- **Prompt versioning:** Save, diff, and manage prompt revisions.
- **A/B testing:** Run experiments between prompt versions and collect
	response metrics.
- **AI scoring:** Automatic scoring and ranking of responses using
	Mistral/OpenAI-compatible APIs.
- **Team collaboration:** Multi-tenant workspaces, role-based access,
	and audit trails.
- **Rollback:** Instantly revert to a previously better-performing
	prompt.
- **Metrics & insights:** Aggregate test results, confidence, and trends.

## 🛠 Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL (Neon)
- Auth & Multi-tenant: JWT / tenant-aware middleware (expandable)
- AI: Mistral or any OpenAI-compatible API
- Dev tooling: Vite, ESLint, Prettier

## 🏗 Architecture Overview

Promptly follows a MERN-like separation (React frontend + Node API +
Postgres). Key layers:

- Client (React/Vite/Tailwind): UI for creating versions, launching
	experiments, and viewing metrics.
- API (Express): REST endpoints for prompts, versions, tests, webhooks,
	and scoring.
- Database (Neon Postgres): Stores tenants, teams, prompts, runs and
	aggregated metrics.
- AI Layer: Adapter pattern to call Mistral or OpenAI-compatible APIs
	for response generation and scoring.

Flow (high level):
1. Team creates a prompt and saves a new version.
2. Team launches an A/B test which hits the AI layer with each variant.
3. Responses are scored and stored; metrics are aggregated in DB.
4. UI surfaces results and allows rollback to the best version.

## ⚙️ Installation (Local dev)

Prerequisites: Node 18+, npm, and a Neon Postgres database. Set
environment variables: `DATABASE_URL`, `JWT_SECRET`, and `OPENAI_API_KEY` (or
MISTRAL_API_KEY / MODEL config).

Frontend (client):

```bash
cd client
npm install
npm run dev
```

Backend (server):

```bash
cd server
npm install
# example env file (.env) with DATABASE_URL and API keys
npm run dev   # or `node index.js` / `npm start` depending on scripts
```

Production: build frontend (`npm run build` in `client`) and deploy the
static assets to your CDN or host and run the Node server behind a
process manager (PM2) or container.

## 🔁 How the System Works (Flow)

1. Create workspace/tenant and invite team members.
2. Create a prompt repository and author a new prompt version.
3. Launch an experiment that routes traffic to prompt variants.
4. For each response, invoke the AI adapter, then run scoring
	 heuristics and store results.
5. Aggregate metrics and present a winner recommendation.
6. Rollback by marking the chosen version as active for production.

## 🎯 Use Cases

- Prompt ops for conversational agents.
- Rapid iteration on system prompts for chatbots.
- Quality assurance for generative AI outputs.
- A/B testing prompt phrasing to improve conversion or accuracy.

## 🚀 Future Improvements

- Role-based access control and fine-grained permissions.
- Built-in CI integration for prompt changes (pre-merge checks).
- Scheduled experiments and traffic-weighted rollouts.
- More advanced scorer plugins (human-in-the-loop, custom metrics).
- Audit logs, billing, and usage dashboards.

## 👤 Author

Promptly is Open to contributions and feedback.

## 📄 License

MIT License — see LICENSE for details.

