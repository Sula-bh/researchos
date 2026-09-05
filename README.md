# 🧠 ResearchOS

> **ResearchOS** is an AI-powered research workspace that helps
> researchers organize papers, experiments, and notes while leveraging
> **Cognee** to build persistent long-term AI memory.

------------------------------------------------------------------------

# ✨ Features

-   📄 Upload and manage research papers
-   🤖 AI-generated paper summaries
-   🧠 Research Companion with Cognee-powered retrieval
-   📝 Personal research notes
-   🧪 Experiment tracking
-   📚 Project-based organization
-   💬 Context-aware conversations across uploaded papers
-   🔍 Semantic retrieval using Cognee
-   🔐 Clerk authentication and project ownership
-   ⚙️ Project settings and content management

------------------------------------------------------------------------

# 🏗 Architecture

``` mermaid
flowchart LR

A[React + Vite]
B[Flask API]
C[PostgreSQL]
D[Cognee]
E[Gemini]
F[PDF Upload]

A -->|REST| B
B --> C
B --> F
D --> E
F --> D
D --> B
```

------------------------------------------------------------------------

# AI Pipeline

``` mermaid
sequenceDiagram
participant User
participant Frontend
participant Flask
participant Worker
participant Cognee

User->>Frontend: Upload PDF
Frontend->>Flask: POST /api/projects/:project_id/papers
Flask->>Worker: Queue paper processing
Worker->>Worker: Extract PDF text and metadata
Worker->>Cognee: remember(document)
Cognee-->>Worker: Memory stored
Worker->>Cognee: recall(document context)
Worker->>Flask: Save summary
Flask-->>Frontend: Processing complete
```

------------------------------------------------------------------------

# Research Companion Workflow

``` mermaid
flowchart TD

Q[User Question]
S[Research Companion]
R[Cognee Recall]
L[Long-Term Memory]
A[AI Response]

Q --> S
S --> R
R --> L
L --> A
A --> S
S --> Q
```

------------------------------------------------------------------------

# Project Structure

``` text
research-os/
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── ...
│   ├── migrations/
│   ├── uploads/
│   ├── wsgi.py
│   └── worker.py
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   └── types/
│   └── package.json
└── README.md
```

------------------------------------------------------------------------

# Tech Stack

- Frontend: React 19, Vite 8, TypeScript, Tailwind CSS, and shadcn/ui
- Backend: Flask 3, Flask-SQLAlchemy, Flask-Migrate, and Marshmallow
- Package management: Python dependencies are managed with uv via backend/pyproject.toml
- Database: PostgreSQL
- Queue: Redis and RQ
- AI and memory: Cognee with FastEmbed and PostgreSQL support
- File handling: PyMuPDF and local upload storage under backend/uploads
- HTTP and form handling: Axios, React Router, and React Hook Form

------------------------------------------------------------------------

# Core Features

## Projects

-   Organize research into separate workspaces.
-   Query per-paper Cognee datasets together within a project.

## Papers

-   PDF upload
-   Metadata extraction
-   AI summaries
-   Download & delete

## Research Companion

-   Browser-local conversation history per project
-   Cross-paper reasoning
-   Semantic retrieval
-   Source references in chat responses

## Notes

-   Personal researcher notes
-   Markdown editor

## Experiments

-   Track hypotheses
-   Record methodology, results, conclusions, and status

## Authentication and Project Management

-   Clerk sign-in and registration
-   Authenticated API requests with bearer tokens
-   Project ownership and access checks
-   Project title and description editing
-   Project deletion

The timeline and knowledge graph routes are present in the frontend navigation, but
their current screens are placeholders.

------------------------------------------------------------------------

# Database Overview

``` mermaid
erDiagram

PROJECT ||--o{ PAPER : contains
PROJECT ||--o{ NOTE : contains
PROJECT ||--o{ EXPERIMENT : contains

PROJECT {
UUID id
UUID user_id
string title
text description
}

USER {
UUID id
string clerk_user_id
}

PAPER {
UUID id
UUID project_id
string title
text authors
text abstract
string file_name
string storage_key
enum ai_status
datetime processed_at
text ai_error
text ai_summary
}

NOTE {
UUID id
UUID project_id
string title
text content
}

EXPERIMENT {
UUID id
UUID project_id
string title
text objective
text methodology
text results
text conclusion
enum status
}
```

Chat messages are not stored in PostgreSQL; the frontend keeps local conversation
history in the browser.

------------------------------------------------------------------------

# Environment Variables

``` env
SECRET_KEY=

SQLALCHEMY_DATABASE_URI=

SQLALCHEMY_TRACK_MODIFICATIONS=False

REDIS_URL=

CLERK_SECRET_KEY=
```

Frontend variables (`frontend/.env`):

``` env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_BASE_URL=http://localhost:5000/api
```

Cognee can also use the following provider settings when configured in the
environment:

``` env
LLM_PROVIDER=gemini
LLM_MODEL=gemini/gemini-2.5-flash
LLM_API_KEY=

EMBEDDING_PROVIDER=fastembed
EMBEDDING_MODEL=BAAI/bge-small-en-v1.5

DB_PROVIDER=postgres
DB_NAME=cognee_db
```

PostgreSQL, Redis, and a Clerk application are required for local development.

------------------------------------------------------------------------

# Installation

## Backend

``` bash
git clone <repository>
cd research-os/backend
uv sync
```

Create `backend/.env` with the backend values above, then apply migrations:

``` bash
uv run flask --app wsgi db upgrade
```

Run the API and RQ worker in separate terminals:

``` bash
uv run python worker.py
uv run flask --app wsgi run --debug
```

The backend uses Flask and the application factory in `wsgi.py`. Paper uploads
are processed asynchronously through Redis and RQ. On Windows, `worker.py`
uses RQ's `SimpleWorker`.

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` with the frontend values above. The frontend runs with
Vite and uses the local development server started by `npm run dev`.

------------------------------------------------------------------------

# API Overview

All application routes require a valid Clerk bearer token unless noted otherwise.

| Area | Routes |
| --- | --- |
| Auth | `GET /api/auth/me` |
| Projects | `GET/POST /api/projects`, `GET/PATCH/DELETE /api/projects/:project_id` |
| Papers | `GET/POST /api/projects/:project_id/papers`, `GET/DELETE /api/papers/:paper_id`, `GET /api/papers/:paper_id/download` |
| Notes | CRUD routes under `/api/projects/:project_id/notes` |
| Experiments | CRUD routes under `/api/projects/:project_id/experiments` |
| Chat | `POST /api/projects/:project_id/chat` |

------------------------------------------------------------------------

# Database Migrations

Database schema changes are managed with Flask-Migrate/Alembic. After setting
`SQLALCHEMY_DATABASE_URI`, run:

``` bash
cd backend
uv run flask --app wsgi db upgrade
```

The migration history creates projects, papers, notes, experiments, users and
project ownership, paper AI summaries, and paper AI processing status fields.

------------------------------------------------------------------------

# Why Cognee?

Cognee is the core intelligence layer of ResearchOS.

Instead of treating every prompt independently, ResearchOS continuously
builds a persistent memory graph from uploaded research papers. This
enables:

-   Long-term project memory
-   Semantic search
-   Cross-paper reasoning
-   AI summaries
-   Context-aware conversations

------------------------------------------------------------------------
