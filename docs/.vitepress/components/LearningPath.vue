<script setup lang="ts">
import allData from "../data.json";

interface Step {
  title: string;
  projects: string[];
  note: string;
}

defineProps<{
  steps: Step[];
}>();

const projectMap = new Map(allData.projects.map((p: any) => [p.slug, p]));

function getProjectName(slug: string): string {
  return (projectMap.get(slug) as any)?.name || slug;
}
</script>

<template>
  <div class="learning-path">
    <div v-for="(step, i) in steps" :key="i" class="step">
      <div class="step-indicator">
        <div class="step-number">{{ i + 1 }}</div>
        <div v-if="i < steps.length - 1" class="step-line"></div>
      </div>
      <div class="step-content">
        <h3>{{ step.title }}</h3>
        <div class="step-projects" v-if="step.projects.length > 0">
          <a
            v-for="slug in step.projects"
            :key="slug"
            :href="`/projects/${slug}`"
            class="step-project-link"
          >
            {{ getProjectName(slug) }}
          </a>
        </div>
        <p class="step-note">{{ step.note }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-path {
  margin: 24px 0;
}

.step {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 36px;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9em;
  flex-shrink: 0;
}

.step-line {
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin: 4px 0;
}

.step-content {
  padding-bottom: 24px;
}

.step-content h3 {
  margin: 4px 0 8px;
}

.step-projects {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.step-project-link {
  padding: 4px 12px;
  border-radius: 14px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.85em;
  text-decoration: none;
  font-weight: 500;
}

.step-project-link:hover {
  background: var(--vp-c-brand-1);
  color: white;
}

.step-note {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>
