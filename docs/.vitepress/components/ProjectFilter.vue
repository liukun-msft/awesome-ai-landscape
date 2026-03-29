<script setup lang="ts">
import { ref, computed } from "vue";
import allData from "../data.json";
import ProjectCard from "./ProjectCard.vue";

const props = defineProps<{
  category: string;
}>();

const search = ref("");
const selectedDifficulty = ref("all");
const sortBy = ref("stars");

const projects = computed(() => {
  let filtered = allData.projects.filter((p: any) => p.category === props.category);

  if (search.value) {
    const q = search.value.toLowerCase();
    filtered = filtered.filter(
      (p: any) =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.toLowerCase().includes(q))
    );
  }

  if (selectedDifficulty.value !== "all") {
    filtered = filtered.filter((p: any) => p.difficulty === selectedDifficulty.value);
  }

  if (sortBy.value === "stars") {
    filtered.sort((a: any, b: any) => b.stars - a.stars);
  } else if (sortBy.value === "name") {
    filtered.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  return filtered;
});
</script>

<template>
  <div class="project-filter">
    <div class="controls">
      <input
        v-model="search"
        type="text"
        placeholder="Search projects..."
        class="search-input"
      />
      <select v-model="selectedDifficulty" class="select">
        <option value="all">All levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <select v-model="sortBy" class="select">
        <option value="stars">Sort by stars</option>
        <option value="name">Sort by name</option>
      </select>
    </div>
    <div class="project-grid">
      <ProjectCard v-for="p in projects" :key="p.slug" :project="p" />
    </div>
    <p v-if="projects.length === 0" class="no-results">No projects match your filters.</p>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9em;
}

.select {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.9em;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.no-results {
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 32px;
}
</style>
