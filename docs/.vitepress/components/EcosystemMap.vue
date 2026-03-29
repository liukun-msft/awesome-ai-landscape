<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { withBase } from "vitepress";
import allData from "../data.json";

const svgRef = ref<SVGSVGElement | null>(null);
const tooltip = ref<{ show: boolean; x: number; y: number; project: any | null }>({
  show: false,
  x: 0,
  y: 0,
  project: null,
});
const selectedCategory = ref("all");
const isMounted = ref(false);

const categoryColors: Record<string, string> = {
  llm: "#f59e0b",
  framework: "#3b82f6",
  agent: "#10b981",
  mcp: "#8b5cf6",
  skill: "#ec4899",
  infra: "#6366f1",
};

const filteredProjects = computed(() => {
  if (selectedCategory.value === "all") return allData.projects;
  return allData.projects.filter((p: any) => p.category === selectedCategory.value);
});

let simulation: any = null;

async function buildGraph() {
  if (!svgRef.value || !isMounted.value) return;

  const d3 = await import("d3");

  const svg = d3.select(svgRef.value);
  svg.selectAll("*").remove();

  const width = svgRef.value.clientWidth || 800;
  const height = 600;

  const slugSet = new Set(filteredProjects.value.map((p: any) => p.slug));

  const nodes = filteredProjects.value.map((p: any) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    stars: p.stars,
    difficulty: p.difficulty,
    review: p.review,
    related: p.related,
  }));

  const links: any[] = [];
  for (const p of filteredProjects.value as any[]) {
    if (p.related) {
      for (const r of p.related) {
        if (slugSet.has(r) && p.slug < r) {
          links.push({ source: p.slug, target: r });
        }
      }
    }
  }

  const g = svg.append("g");

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 4])
    .on("zoom", (event: any) => g.attr("transform", event.transform));
  svg.call(zoom);

  const link = g
    .append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke", "#e2e8f0")
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6);

  const nodeRadius = (stars: number) => Math.max(8, Math.min(30, Math.log10(stars + 1) * 6));

  const node = g
    .append("g")
    .selectAll("circle")
    .data(nodes, (d: any) => d.slug)
    .join("circle")
    .attr("r", (d: any) => nodeRadius(d.stars))
    .attr("fill", (d: any) => categoryColors[d.category] || "#999")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .attr("cursor", "pointer")
    .call(
      d3.drag<SVGCircleElement, any>()
        .on("start", (event: any, d: any) => {
          if (!event.active) simulation?.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event: any, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event: any, d: any) => {
          if (!event.active) simulation?.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  node.on("mouseenter", (event: MouseEvent, d: any) => {
    tooltip.value = {
      show: true,
      x: event.pageX + 10,
      y: event.pageY - 10,
      project: d,
    };
  });

  node.on("mouseleave", () => {
    tooltip.value.show = false;
  });

  node.on("click", (_event: any, d: any) => {
    window.location.href = withBase(`/projects/${d.slug}`);
  });

  const label = g
    .append("g")
    .selectAll("text")
    .data(nodes, (d: any) => d.slug)
    .join("text")
    .text((d: any) => d.name)
    .attr("font-size", "11px")
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .attr("dy", (d: any) => nodeRadius(d.stars) + 14)
    .attr("pointer-events", "none");

  simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d: any) => d.slug)
        .distance(100)
    )
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius((d: any) => nodeRadius(d.stars) + 10))
    .on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });
}

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

onMounted(() => {
  isMounted.value = true;
  buildGraph();
  window.addEventListener("resize", buildGraph);
});

onUnmounted(() => {
  simulation?.stop();
  window.removeEventListener("resize", buildGraph);
});

watch(selectedCategory, () => {
  buildGraph();
});
</script>

<template>
  <div class="ecosystem-map-container">
    <div class="map-controls">
      <button
        :class="['cat-btn', { active: selectedCategory === 'all' }]"
        @click="selectedCategory = 'all'"
      >
        All
      </button>
      <button
        v-for="cat in (allData as any).categories"
        :key="cat.id"
        :class="['cat-btn', { active: selectedCategory === cat.id }]"
        @click="selectedCategory = cat.id"
      >
        {{ cat.name }}
      </button>
    </div>

    <div class="map-wrapper">
      <svg ref="svgRef" class="ecosystem-svg"></svg>
    </div>

    <div
      v-if="tooltip.show && tooltip.project"
      class="tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <strong>{{ tooltip.project.name }}</strong>
      <span class="tooltip-stars">&#11088; {{ formatStars(tooltip.project.stars) }}</span>
      <p>{{ tooltip.project.review.split('\n')[0] }}</p>
      <small>Click to view details</small>
    </div>

    <div class="legend">
      <div v-for="cat in (allData as any).categories" :key="cat.id" class="legend-item">
        <span class="legend-dot" :style="{ background: categoryColors[cat.id] }"></span>
        {{ cat.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.ecosystem-map-container {
  position: relative;
}

.map-controls {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.cat-btn {
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85em;
  transition: all 0.2s;
}

.cat-btn:hover {
  border-color: var(--vp-c-brand-1);
}

.cat-btn.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.map-wrapper {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.ecosystem-svg {
  width: 100%;
  height: 600px;
  display: block;
}

.tooltip {
  position: fixed;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px;
  max-width: 280px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  z-index: 100;
}

.tooltip strong {
  display: block;
  margin-bottom: 4px;
}

.tooltip-stars {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.tooltip p {
  font-size: 0.85em;
  margin: 8px 0 4px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.tooltip small {
  color: var(--vp-c-text-3);
  font-size: 0.8em;
}

.legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
  padding: 8px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
