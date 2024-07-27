# Symbiont - An Open Source Self-hosted RAG App 🌐

Welcome to Symbiont, the premier RAG (Retrieval Argument Generation)-based application designed for secure, self-hosted deployment on personal or organizational servers. Built with privacy and user control in mind, Symbiont ensures that sensitive data is managed securely without requiring transmission to third-party servers, except when interacting with LLM (Large Language Model) providers such as OpenAI or Anthropic.

🔗 **Explore the Backend**: For more about the backed of the Symbiont app, please visit: [Symbiont Backed Repo](https://github.com/symbiont-me/symbiont-backend)

## Use Cases 🛠️

- **Academic Research**: Secure analysis of sensitive data.
- **Journalism**: Confidential information handling for reporting.
- **Creative Writing**: Private brainstorming and draft creation.

## Features 🌟

### 🛡️ Enhanced Privacy and Security
Your data remains under your control, securely stored on your own infrastructure.

### 🔑 Multi-user Authentication
Enables secure, personalized access for teams and organizations.

### 📄 Comprehensive Content Management
- **PDF Viewer**: Directly interact with PDFs.
- **Video Viewer**: Stream and analyze video content efficiently.
- **Multimedia Uploads**: Support for various formats including YouTube videos, web pages, and plain text.

### 📝 Integrated Writing and Note-Taking Tool
Facilitates seamless note-taking and document drafting alongside AI interactions.

### 🤖 Support for Multiple LLMs
Works with various Large Language Models from industry leaders such as Anthropic, OpenAI, and Google. More integrations planned.

## Branches 🌿

- **`main`**: Stable branch, uses hosted services like Pinecone for vectors and Firebase for database and storage. This is what gets deployed in production
- **`dev`**: Includes the latest features, fully functional with a self-hosted MongoDB for enhanced privacy, still uses Pinecone for vectors. This is deployed in staging.

## Setup

## Development
### Source
#### Installing dependencies
You need NodeJS and pnpm to build and run the app from source.
Install dependencies:
```bash
pnpm install
```
#### Running the app
To run the development server directly, you need to prepare a `env.local` or `.env.development` file.
See `.env.example` for help.
To start the app:
```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### Docker
To use Docker:
- .env.development must be present
```bash
docker-compose --profile dev up
```
See .env.example for required environment variables

## Production
NOTE: Currently there is a bug in the production workflow. We need to modify the auth workflow to allow the frontend to compile pages without needing to authenticate.
### Source
#### Installing dependencies
You need NodeJS and pnpm to build and run the app from source.
Install dependencies:
```bash
pnpm install
```
#### Building and running the app
To run the development server directly, you need to prepare a `env.local` or `.env.development` file.
See `.env.example` for help.
To start the app:
```bash
pnpm run build && pnpm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### Docker
NOTE: There is currently a bug when building the nextjs app in docker
