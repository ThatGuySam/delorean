# 🏎️ Codename Delorean

**Local-first AI search in your browser** — A desktop-grade web
application for building a private, retrieval-augmented AI assistant.

Delorean helps you ingest personal documents, notes and files, index
them locally in the browser, search them quickly and chat with an AI
model—all without sending your data to the cloud.

Built with PGlite (PostgreSQL in WebAssembly), in-browser vector
search, and a Tailwind + shadcn/ui chat interface.

---

## Roadmap

### Core Infrastructure

- [x] Monorepo setup with Bun + Turborepo
- [x] Local LLM port detection config
- [ ] PGlite integration in browser
- [ ] IndexedDB persistence layer

### Hindsight Retrieval Engine

- [x] Text chunking at sentence boundaries
- [x] Chunking tests (small, large, 64k texts)
- [ ] Embeddings generation (WebAssembly or API)
- [ ] Vector storage and indexing
- [ ] Keyword + vector hybrid search
- [ ] Context pack assembly
- [ ] Graph retrieval step
- [ ] HNSW index support

### Document Pipeline

- [ ] File upload UI
- [ ] Text file import
- [ ] PDF import
- [ ] Post-MVP - Incremental document updates
- [ ] Post-MVP - Files sorting/filters

### Chat Interface

- [ ] Chat page/route
- [ ] Message components (user/assistant)
- [ ] Post-MVP - Markdown rendering with syntax highlighting
- [ ] Post-MVP - Code blocks with copy buttons
- [ ] File upload in chat

### AI Connectivity

- [x] LLM port mappings (Ollama, LM Studio, Jan, vLLM)
- [ ] OpenAI-compatible API client
- [ ] Local LLM auto-detection
- [ ] Model selector UI
- [ ] CORS warning for local models

### UX & Theming

- [ ] Privacy indicator (WiFi, local LLM status)
- [ ] Post-MVP - Dark mode
- [ ] Post-MVP - Accent color picker
- [ ] Post-MVP - Chat transcript export

### Post-MVP Only

- [ ] Google Drive integration
- [ ] Example datasets for demo
- [ ] Apple AI model support

---

## Overview

### Local-First Architecture

Delorean stores your documents and embeddings in a PGlite database
running entirely in the browser. Sensitive data never leaves your
device. The app exposes a retrieval API that performs keyword and
vector searches, generates context packs and passes them to a chosen
language model (LLM) for answering queries.

### Privacy-Preserving AI

Connect Delorean to local LLM servers such as Ollama, LM Studio, Jan,
or vLLM. These servers run on localhost and expose OpenAI-compatible
endpoints. Running a model locally ensures prompts and context never
leave your computer.

### Accessible Chat Interface

The frontend uses shadcn/ui—beautifully styled, accessible React
components built with Tailwind CSS and Radix UI. Radix primitives
provide WAI-ARIA-compliant behavior with keyboard navigation and
screen-reader support. The Shadcn Chatbot Kit adds polished chat
components: auto-scrolling messages, adaptive inputs with file-upload,
prompt suggestions, message actions (copy, rate), markdown with syntax
highlighting, and dark/light theming.

### NNG-Informed UX

Incorporates Nielsen Norman Group research on chat interfaces:

- Chat is easy to find with a clearly labelled navigation link
- User and assistant messages are visually differentiated
- Users can upload documents and save chat transcripts
- Assistant is transparent about being a bot
- Provides "escape hatch" when the bot cannot help

## Features

### Local Data & Retrieval

- **In-browser Postgres**: PGlite stores document metadata, chunks and
  vector embeddings in IndexedDB. No server required.
- **Vector & keyword search**: Extracts embeddings via WebAssembly or
  remote API; performs approximate nearest-neighbor search in-browser.
- **Context pack assembly**: Builds prompts from relevant chunks and
  metadata, then passes context to the selected LLM.
- **Import pipeline**: Accepts text, PDF, Markdown and other formats;
  chunks, embeds and stores them with incremental updates.

### AI Connectivity

- **Local LLM support**: Auto-detects popular local AI services:
  - Ollama on `127.0.0.1:11434`
  - LM Studio on `localhost:1234/v1`
  - Jan on `127.0.0.1:1337`
  - vLLM on `localhost:8000`
- **OpenAI-compatible**: Calls `/v1/chat/completions`, `/v1/embeddings`
  and related endpoints on any compatible API (local or remote).

### Chat UI

- **Rich interactions**: Animations, smart auto-scrolling, adaptive
  inputs, file-upload preview, and message actions (copy, rate).
- **Markdown & code**: Syntax highlighting, LaTeX/KaTeX support, and
  code blocks with copy buttons.
- **Dark/light themes**: Built-in theme switcher with customisable
  colour palette. Responsive and keyboard-accessible.
- **Composable**: ChatSection, ChatMessages, ChatInput and other
  components for custom layouts.

### Privacy Indicator

Simple indicator showing your current privacy level:

- WiFi off
- Local LLM model active
- Trusted model provider

## Architecture

```
┌───────────────────────────────────────────────────────────┐
│                   Delorean Frontend                       │
├───────────────────────────────────────────────────────────┤
│  • React + TypeScript + Vite                              │
│  • Tailwind CSS + shadcn/ui + Radix primitives            │
│  • Shadcn Chatbot Kit for chat interface                  │
│  • Custom hooks for retrieval, vector search, AI calls    │
└───────────────────────────────────────────────────────────┘
              │
              │ retrieves documents & embeddings
              ▼
┌─────────────────────────┐              ┌──────────────────┐
│  PGlite DB (Wasm)       │  API calls   │  Local LLM API   │
│  • Docs, chunks, vectors│─────────────▶│  • Ollama        │
│  • Runs in browser      │              │  • LM Studio     │
│  • IndexedDB storage    │◀─────────────│  • Jan, vLLM     │
└─────────────────────────┘   responses  └──────────────────┘
```

The client manages ingestion and retrieval entirely in the browser.
It computes embeddings (WebAssembly or API) and stores them in PGlite.
When the user submits a query, the system searches the vector index,
assembles context and sends a request to the configured LLM.

## Technology Stack

**Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui,
Jotai, TanStack Router

**Backend**: Hono, tRPC, Better Auth, Cloudflare Workers

**Database**: PGlite (browser), Drizzle ORM, Neon PostgreSQL (server)

**Dev Tools**: Bun, Vitest, ESLint, Prettier

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.3+
- Modern browser (Chromium or Firefox)
- Local LLM server (optional): Ollama, LM Studio, Jan, or vLLM

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/delorean.git
cd delorean

# Install dependencies
bun install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
bun dev
```

### Environment Variables

```bash
# LLM API endpoint (local or remote)
LLM_URL=http://localhost:11434/v1

# Embeddings endpoint (optional, if not using local)
EMBEDDINGS_URL=

# Database name for PGlite
DB_NAME=delorean.db
```

### Usage

1. **Import documents**: Use the Upload button to add files. The system
   chunks, embeds and indexes them automatically.
2. **Start chatting**: Navigate to Chat. Ask questions about your
   documents; the app retrieves relevant passages for the LLM.
3. **Customise**: Use the theme switcher and settings to adjust your
   experience.

## Project Structure

- [`apps/app/`](./apps/app) — React application with chat interface
- [`apps/web/`](./apps/web) — Astro marketing website
- [`apps/api/`](./apps/api) — tRPC API server (Hono + Workers)
- [`apps/email/`](./apps/email) — React Email templates
- [`packages/core/`](./packages/core) — Shared types and utilities
- [`packages/ui/`](./packages/ui) — Shared UI components
- [`packages/hindsight-js/`](./packages/hindsight-js) — Hindsight
  retrieval system in TypeScript
- [`db/`](./db) — Database schemas and migrations

## Related Resources

- [Hindsight (Official Repo)](https://github.com/vectorize-io/hindsight)
  — Time-based retrieval system this project implements
- [MinerU](https://github.com/opendatalab/MinerU) — Docker server for
  parsing PDFs for LLM consumption

## License

MIT License. See [LICENSE](./LICENSE) for details.

## Contributing

Contributions welcome! Please open an issue for bugs or feature
requests. When contributing UI changes, follow NN/g guidelines for
accessible chat experiences and maintain consistency with shadcn/ui's
composable philosophy.
