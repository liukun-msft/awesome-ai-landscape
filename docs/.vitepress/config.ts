import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Awesome AI Landscape",
  description: "An interactive map of the AI ecosystem — models, frameworks, agents, MCP, and more",
  cleanUrls: true,

  head: [
    ["meta", { property: "og:title", content: "Awesome AI Landscape" }],
    ["meta", { property: "og:description", content: "Navigate the AI ecosystem with curated reviews and interactive maps" }],
  ],

  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Ecosystem Map", link: "/landscape/" },
      {
        text: "Categories",
        items: [
          { text: "Large Language Models", link: "/categories/llm" },
          { text: "App Frameworks", link: "/categories/framework" },
          { text: "AI Agents", link: "/categories/agent" },
          { text: "MCP Ecosystem", link: "/categories/mcp" },
          { text: "Skills & Plugins", link: "/categories/skill" },
          { text: "Infrastructure", link: "/categories/infra" },
        ],
      },
      {
        text: "Learning Paths",
        items: [
          { text: "Build a Chatbot", link: "/paths/build-chatbot" },
          { text: "Build an Agent", link: "/paths/build-agent" },
        ],
      },
    ],

    sidebar: {
      "/categories/": [
        {
          text: "Categories",
          items: [
            { text: "Large Language Models", link: "/categories/llm" },
            { text: "App Frameworks", link: "/categories/framework" },
            { text: "AI Agents", link: "/categories/agent" },
            { text: "MCP Ecosystem", link: "/categories/mcp" },
            { text: "Skills & Plugins", link: "/categories/skill" },
            { text: "Infrastructure", link: "/categories/infra" },
          ],
        },
      ],
      "/paths/": [
        {
          text: "Learning Paths",
          items: [
            { text: "Build a Chatbot", link: "/paths/build-chatbot" },
            { text: "Build an Agent", link: "/paths/build-agent" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/user/awesome-ai-landscape" },
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Curated with care for the AI developer community",
    },
  },
});
