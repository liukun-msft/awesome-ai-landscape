import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// --- Types ---

interface Project {
  name: string;
  slug: string;
  repo: string;
  website?: string;
  category: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "active" | "maintained" | "stale" | "archived";
  review: string;
  use_cases: string[];
  related?: string[];
}

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

interface PathStep {
  title: string;
  projects: string[];
  note: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  steps: PathStep[];
}

// --- Paths ---

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const DOCS_DIR = path.join(ROOT, "docs");
const PROJECTS_DATA_DIR = path.join(DATA_DIR, "projects");

// --- Load data ---

function loadProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DATA_DIR).filter((f) => f.endsWith(".yaml"));
  return files.map((f) => {
    const content = fs.readFileSync(path.join(PROJECTS_DATA_DIR, f), "utf-8");
    return yaml.load(content) as Project;
  });
}

function loadCategories(): Category[] {
  const content = fs.readFileSync(path.join(DATA_DIR, "categories.yaml"), "utf-8");
  return (yaml.load(content) as { categories: Category[] }).categories;
}

function loadLearningPaths(): LearningPath[] {
  const content = fs.readFileSync(path.join(DATA_DIR, "learning-paths.yaml"), "utf-8");
  return (yaml.load(content) as { paths: LearningPath[] }).paths;
}

function loadStars(): Record<string, number> {
  const content = fs.readFileSync(path.join(DATA_DIR, "stars.json"), "utf-8");
  return JSON.parse(content);
}

// --- Validate ---

function validate(projects: Project[], categories: Category[]): void {
  const categoryIds = new Set(categories.map((c) => c.id));
  const slugs = new Set<string>();

  for (const p of projects) {
    if (!p.name || !p.slug || !p.repo || !p.category || !p.review) {
      throw new Error(`Project "${p.name || "unknown"}" is missing required fields`);
    }
    if (!categoryIds.has(p.category)) {
      throw new Error(`Project "${p.slug}" has unknown category "${p.category}"`);
    }
    if (slugs.has(p.slug)) {
      throw new Error(`Duplicate project slug: "${p.slug}"`);
    }
    slugs.add(p.slug);
  }
}

// --- Generate pages ---

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function generateProjectPages(projects: Project[], stars: Record<string, number>): void {
  const dir = path.join(DOCS_DIR, "projects");
  ensureDir(dir);

  for (const p of projects) {
    const starCount = stars[p.slug] || 0;
    const related = (p.related || [])
      .map((slug) => `- [${slug}](/projects/${slug})`)
      .join("\n");

    const content = `---
title: "${p.name}"
---

<script setup>
import StarBadge from '../.vitepress/components/StarBadge.vue'
import ProjectCard from '../.vitepress/components/ProjectCard.vue'
</script>

# ${p.name}

<StarBadge :count="${starCount}" />

| | |
|---|---|
| **Repository** | [${p.repo}](https://github.com/${p.repo}) |
| **Category** | [${p.category}](/categories/${p.category}) |
| **Difficulty** | ${p.difficulty} |
| **Status** | ${p.status} |
| **Tags** | ${p.tags.map((t) => `\`${t}\``).join(" ")} |
${p.website ? `| **Website** | [${p.website}](${p.website}) |` : ""}

## Review

${p.review.trim()}

## Use Cases

${p.use_cases.map((uc) => `- ${uc}`).join("\n")}

${related ? `## Related Projects\n\n${related}` : ""}
`;
    fs.writeFileSync(path.join(dir, `${p.slug}.md`), content);
  }
}

function generateCategoryPages(categories: Category[], projects: Project[]): void {
  const dir = path.join(DOCS_DIR, "categories");
  ensureDir(dir);

  for (const cat of categories) {
    const catProjects = projects.filter((p) => p.category === cat.id);
    const projectList = catProjects
      .map((p) => `- [${p.name}](/projects/${p.slug}) — ${p.review.trim().split("\n")[0]}`)
      .join("\n");

    const content = `---
title: "${cat.name}"
---

<script setup>
import ProjectFilter from '../.vitepress/components/ProjectFilter.vue'
</script>

# ${cat.name}

${cat.description}

<ProjectFilter category="${cat.id}" />

## All Projects

${projectList || "*No projects in this category yet.*"}
`;
    fs.writeFileSync(path.join(dir, `${cat.id}.md`), content);
  }
}

function generatePathPages(paths: LearningPath[], projects: Project[]): void {
  const dir = path.join(DOCS_DIR, "paths");
  ensureDir(dir);

  const projectMap = new Map(projects.map((p) => [p.slug, p]));

  for (const lp of paths) {
    const steps = lp.steps
      .map((step, i) => {
        const projectLinks = step.projects
          .map((slug) => {
            const proj = projectMap.get(slug);
            return proj ? `[${proj.name}](/projects/${slug})` : slug;
          })
          .join(", ");

        return `### Step ${i + 1}: ${step.title}

**Recommended:** ${projectLinks || "See note below"}

${step.note}`;
      })
      .join("\n\n");

    const content = `---
title: "${lp.name}"
---

<script setup>
import LearningPath from '../.vitepress/components/LearningPath.vue'
</script>

# ${lp.name}

**Difficulty:** ${lp.difficulty}

${lp.description}

${steps}
`;
    fs.writeFileSync(path.join(dir, `${lp.id}.md`), content);
  }
}

function generateDataJson(
  projects: Project[],
  categories: Category[],
  stars: Record<string, number>
): void {
  const data = {
    projects: projects.map((p) => ({
      ...p,
      stars: stars[p.slug] || 0,
    })),
    categories,
  };
  const outPath = path.join(DOCS_DIR, ".vitepress", "data.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
}

// --- Main ---

function main(): void {
  console.log("Loading data...");
  const projects = loadProjects();
  const categories = loadCategories();
  const paths = loadLearningPaths();
  const stars = loadStars();

  console.log(`Found ${projects.length} projects, ${categories.length} categories, ${paths.length} paths`);

  console.log("Validating...");
  validate(projects, categories);

  console.log("Generating project pages...");
  generateProjectPages(projects, stars);

  console.log("Generating category pages...");
  generateCategoryPages(categories, projects);

  console.log("Generating learning path pages...");
  generatePathPages(paths, projects);

  console.log("Generating data.json...");
  generateDataJson(projects, categories, stars);

  console.log("Done!");
}

main();
