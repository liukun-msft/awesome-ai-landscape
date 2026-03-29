# Awesome AI Landscape

> An interactive map of the AI ecosystem — models, frameworks, agents, MCP, and more.

## What is this?

A curated, interactive guide to the AI developer ecosystem. Unlike traditional awesome lists, this project features:

- **Interactive Ecosystem Map** — Visualize relationships between AI tools with a D3.js force-directed graph
- **Curated Reviews** — Every project has a concise, opinionated review
- **Learning Paths** — Step-by-step guides for common goals (build a chatbot, build an agent, etc.)
- **Search & Filter** — Find the right tool by category, difficulty, tags

## Categories

| Category | Description |
|----------|-------------|
| Large Language Models | Foundation models and providers |
| App Frameworks | LangChain, LlamaIndex, CrewAI, etc. |
| AI Agents | Coding agents, general agents, platforms |
| MCP Ecosystem | Model Context Protocol tools |
| Skills & Plugins | Reusable agent capabilities |
| Infrastructure | Serving, eval, observability |

## Contributing

1. Fork this repo
2. Add a YAML file to `data/projects/` following the schema:

```yaml
name: Project Name
slug: project-slug
repo: owner/repo
category: framework
tags: [tag1, tag2]
difficulty: beginner
status: active
review: |
  Your concise review here (2-3 sentences).
use_cases:
  - use-case-1
```

3. Open a PR

## Development

```bash
npm install
npm run dev        # Start dev server
npm run build      # Production build
npm run generate   # Regenerate pages from YAML
```

## Tech Stack

- [VitePress](https://vitepress.dev/) — Static site generator
- [D3.js](https://d3js.org/) — Interactive ecosystem map
- [Vue 3](https://vuejs.org/) — UI components
- GitHub Actions — CI/CD and daily star count updates
- GitHub Pages — Hosting

## License

MIT
