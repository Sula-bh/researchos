# 🧠 ResearchOS

> **ResearchOS** is an AI-powered research workspace that helps
> researchers organize papers, experiments, and notes while leveraging
> **Cognee** to build persistent long-term AI memory.

------------------------------------------------------------------------

# ✨ Features

-   📄 Upload and manage research papers
-   🤖 AI-generated paper summaries
-   🧠 Research Companion (persistent AI memory powered by Cognee)
-   📝 Personal research notes
-   🧪 Experiment tracking
-   📚 Project-based organization
-   💬 Context-aware conversations across uploaded papers
-   🔍 Semantic retrieval using Cognee
-   🗂 Persistent project memory

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
F --> D
D --> E
E --> D
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
participant Gemini

User->>Frontend: Upload PDF
Frontend->>Flask: POST /api/projects/:project_id/papers
Flask->>Worker: Queue ingestion
Worker->>Cognee: remember(document)
Cognee->>Gemini: Extract knowledge
Gemini-->>Cognee: Structured memory
Cognee-->>Worker: Memory stored
Worker->>Cognee: Generate summary
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
-   Independent AI memory per project.

## Papers

-   PDF upload
-   Metadata extraction
-   AI summaries
-   Download & delete

## Research Companion

-   Persistent conversations
-   Cross-paper reasoning
-   Semantic retrieval
-   Local conversation persistence

## Notes

-   Personal researcher notes
-   Markdown editor

## Experiments

-   Track hypotheses
-   Record outcomes

------------------------------------------------------------------------

# Database Overview

``` mermaid
erDiagram

PROJECT ||--o{ PAPER : contains
PROJECT ||--o{ NOTE : contains
PROJECT ||--o{ EXPERIMENT : contains

PROJECT {
UUID id
string title
text description
}

PAPER {
UUID id
UUID project_id
string title
text abstract
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
text result
}
```

------------------------------------------------------------------------

# Environment Variables

``` env
SECRET_KEY=

SQLALCHEMY_DATABASE_URI=

REDIS_URL=

LLM_PROVIDER=gemini
LLM_MODEL=gemini/gemini-2.5-flash
LLM_API_KEY=

EMBEDDING_PROVIDER=fastembed
EMBEDDING_MODEL=BAAI/bge-small-en-v1.5

DB_PROVIDER=postgres
DB_NAME=cognee_db
```

------------------------------------------------------------------------

# Installation

## Backend

``` bash
git clone <repository>
cd backend
uv sync
```

Create a `.env` file in the backend directory with the required values, then run:

``` bash
uv run flask --app wsgi db upgrade
uv run python worker.py
uv run flask --app wsgi run --debug
```

The backend uses Flask and the application factory in `wsgi.py`. The worker process handles background task execution with Redis.

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

The frontend runs with Vite and uses the local development server started by `npm run dev`.

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
