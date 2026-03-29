<script setup lang="ts">
defineProps<{
  count: number;
}>();

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
}
</script>

<template>
  <span class="star-badge" v-if="count > 0">
    &#11088; {{ formatStars(count) }} stars
  </span>
</template>

<style scoped>
.star-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  background: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-3);
  font-size: 0.85em;
  font-weight: 500;
}
</style>
