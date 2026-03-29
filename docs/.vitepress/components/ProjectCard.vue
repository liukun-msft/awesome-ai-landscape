<script setup lang="ts">
import { withBase } from "vitepress";

interface Project {
  name: string;
  slug: string;
  repo: string;
  category: string;
  tags: string[];
  difficulty: string;
  status: string;
  review: string;
  stars: number;
}

defineProps<{
  project: Project;
}>();

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}

function difficultyColor(d: string): string {
  if (d === "beginner") return "var(--vp-c-green-1)";
  if (d === "intermediate") return "var(--vp-c-yellow-1)";
  return "var(--vp-c-red-1)";
}
</script>

<template>
  <a :href="withBase(`/projects/${project.slug}`)" class="project-card">
    <div class="card-header">
      <h3>{{ project.name }}</h3>
      <span class="stars" v-if="project.stars > 0">&#11088; {{ formatStars(project.stars) }}</span>
    </div>
    <p class="review">{{ project.review.split('\n')[0] }}</p>
    <div class="card-footer">
      <span
        class="difficulty"
        :style="{ color: difficultyColor(project.difficulty) }"
      >
        {{ project.difficulty }}
      </span>
      <div class="tags">
        <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1em;
}

.stars {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.review {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin: 0 0 12px;
  line-height: 1.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.difficulty {
  font-size: 0.8em;
  font-weight: 600;
  text-transform: capitalize;
}

.tags {
  display: flex;
  gap: 4px;
}

.tag {
  font-size: 0.75em;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}
</style>
