<div align="center">

# Awesome AI Landscape

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![GitHub stars](https://img.shields.io/github/stars/liukun-msft/awesome-ai-landscape?style=social)](https://github.com/liukun-msft/awesome-ai-landscape/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://github.com/liukun-msft/awesome-ai-landscape/actions/workflows/deploy.yml/badge.svg)](https://github.com/liukun-msft/awesome-ai-landscape/actions/workflows/deploy.yml)

**An interactive map of the AI ecosystem — models, frameworks, agents, MCP, and more.**

50+ curated projects | 6 categories | 5 learning paths | Interactive D3.js ecosystem map

[**Explore the Live Site**](https://liukun-msft.github.io/awesome-ai-landscape/) | [**View Ecosystem Map**](https://liukun-msft.github.io/awesome-ai-landscape/landscape/)

</div>

---

## Why This Project?

There are hundreds of AI tools, libraries, and frameworks launching every week. **Awesome AI Landscape** helps developers cut through the noise:

- **Not just a list** — Every project has a concise, opinionated review explaining *when* and *why* to use it
- **Interactive ecosystem map** — See how projects relate to each other with a D3.js force-directed graph
- **Learning paths** — Step-by-step guides: *Build a Chatbot*, *Build an Agent*, *Build a RAG Pipeline*, and more
- **Always fresh** — Star counts update daily via GitHub Actions

> If you've ever asked *"Which LLM framework should I use?"* or *"How do I get started with AI agents?"* — this project is for you.

## Screenshot

<!-- Replace with actual screenshot after deployment -->
> **Live site:** [liukun-msft.github.io/awesome-ai-landscape](https://liukun-msft.github.io/awesome-ai-landscape/)

## What's Inside

### Categories

| Category | Projects | What's Covered |
|----------|----------|----------------|
| **Large Language Models** | GPT-4, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen, Ollama | Proprietary vs open-source, local vs cloud |
| **App Frameworks** | LangChain, LlamaIndex, LangGraph, Dify, Haystack, Vercel AI SDK, AutoGen, Semantic Kernel, LiteLLM | Orchestration, RAG, minimal/lightweight |
| **AI Agents** | Claude Code, Cursor, Aider, OpenHands, AutoGPT, n8n, Flowise, Open WebUI | Coding agents, general purpose, platforms |
| **MCP Ecosystem** | TypeScript SDK, Python SDK, Official Servers | Servers, clients, toolkits |
| **Skills & Plugins** | Browser Use, Firecrawl, E2B, Unstructured, Instructor, Guardrails | Tool use, retrieval, code execution |
| **Infrastructure** | vLLM, TGI, ChromaDB, Weaviate, Qdrant, Pinecone, Langfuse, Ragas | Serving, vector DBs, eval, observability |

### Learning Paths

| Path | Difficulty | Description |
|------|-----------|-------------|
| **Build Your First AI Chatbot** | Beginner | From zero to a working chatbot with memory and streaming |
| **Build an AI Agent** | Intermediate | Create an autonomous agent that uses tools and reasons |
| **Build a RAG Pipeline** | Intermediate | Document ingestion to answer quality evaluation |
| **Deploy Your Own Open Model** | Advanced | Run Llama/Mistral locally or in production |
| **Build a Coding Assistant** | Intermediate | Explore and compare AI coding tools |

## Key Features

- **Interactive D3.js Ecosystem Map** — Zoom, pan, drag, filter by category, click to explore
- **Curated Reviews** — 2-3 sentence opinionated review per project with "best for" recommendations
- **Project Comparison** — Filter and sort by difficulty, category, stars
- **Search** — Full-text search across all projects
- **Daily Star Updates** — GitHub Actions fetches latest star counts automatically
- **Mobile Friendly** — Responsive design powered by VitePress

## Contributing

We welcome contributions! Add your favorite AI project:

1. Fork this repo
2. Create a YAML file in `data/projects/`:

```yaml
name: Project Name
slug: project-slug
repo: owner/repo
website: https://example.com
category: framework   # llm | framework | agent | mcp | skill | infra
tags: [tag1, tag2]
difficulty: beginner   # beginner | intermediate | advanced
status: active
review: |
  Your concise, opinionated review (2-3 sentences).
  Explain when and why someone should use this project.
use_cases:
  - chatbot
related:
  - related-project-slug
```

3. Run `npm run build` to verify
4. Open a PR

## Development

```bash
npm install
npm run dev        # Start dev server with hot reload
npm run build      # Production build
npm run generate   # Regenerate pages from YAML data
```

## Tech Stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [D3.js](https://d3js.org/) — Interactive force-directed ecosystem map
- [Vue 3](https://vuejs.org/) — Custom UI components
- GitHub Actions — CI/CD, daily star count updates, weekly deploy
- GitHub Pages — Free hosting

## Star History

If you find this useful, please give it a star! It helps others discover this project.

[![Star History Chart](https://api.star-history.com/svg?repos=liukun-msft/awesome-ai-landscape&type=Date)](https://star-history.com/#liukun-msft/awesome-ai-landscape&Date)

## License

MIT
