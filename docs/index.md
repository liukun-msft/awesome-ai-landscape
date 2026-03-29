---
layout: home

hero:
  name: "Awesome AI Landscape"
  tagline: "Curated reviews, interactive ecosystem map, and learning paths for 50+ AI projects"
  actions:
    - theme: brand
      text: Explore the Ecosystem Map
      link: /landscape/
    - theme: alt
      text: Start a Learning Path
      link: /paths/build-chatbot

features:
  - icon: "\uD83E\uDDE0"
    title: Large Language Models
    details: "GPT-4, Claude, Gemini, Llama, Mistral, DeepSeek, Qwen — compare proprietary vs open-source, local vs cloud"
    link: /categories/llm
  - icon: "\uD83D\uDD27"
    title: App Frameworks
    details: "LangChain, LlamaIndex, LangGraph, Dify, Haystack, Vercel AI SDK — pick the right tool for your use case"
    link: /categories/framework
  - icon: "\uD83E\uDD16"
    title: AI Agents
    details: "Claude Code, Cursor, Aider, OpenHands, AutoGPT, n8n — coding agents, automation, and platforms"
    link: /categories/agent
  - icon: "\uD83D\uDD0C"
    title: MCP Ecosystem
    details: "Model Context Protocol — connect AI agents to any external tool with a universal standard"
    link: /categories/mcp
  - icon: "\uD83E\uDDE9"
    title: Skills & Plugins
    details: "Browser Use, Firecrawl, E2B, Instructor — give your agents superpowers with reusable capabilities"
    link: /categories/skill
  - icon: "\uD83C\uDFD7\uFE0F"
    title: Infrastructure
    details: "vLLM, ChromaDB, Weaviate, Langfuse, Ragas — model serving, vector databases, eval, and observability"
    link: /categories/infra
---

<div class="home-content">

## Why Awesome AI Landscape?

The AI ecosystem is exploding — new tools, frameworks, and models launch every week. This project helps you **cut through the noise**:

| Feature | What You Get |
|---------|-------------|
| **Opinionated Reviews** | Every project has a concise "when and why to use it" review, not just a description |
| **Interactive Ecosystem Map** | Visualize how 50+ projects connect with a D3.js force-directed graph |
| **5 Learning Paths** | Step-by-step guides from "Build a Chatbot" to "Deploy Your Own Model" |
| **Always Updated** | Star counts refresh daily via GitHub Actions |

## Learning Paths

Not sure where to start? Follow a guided path:

- **[Build Your First AI Chatbot](/paths/build-chatbot)** — Beginner friendly, from API setup to deployment
- **[Build an AI Agent](/paths/build-agent)** — Create agents that use tools and reason about tasks
- **[Build a RAG Pipeline](/paths/build-rag)** — From document ingestion to answer quality evaluation
- **[Deploy Your Own Open Model](/paths/deploy-open-model)** — Run Llama, Mistral, or DeepSeek locally or in production
- **[Build a Coding Assistant](/paths/build-coding-assistant)** — Explore and compare AI-powered coding tools

</div>

<style>
.home-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 48px 24px;
}

.home-content h2 {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 36px;
  margin-top: 36px;
}

.home-content table {
  width: 100%;
  margin: 16px 0;
}

.home-content ul {
  line-height: 2;
}
</style>
