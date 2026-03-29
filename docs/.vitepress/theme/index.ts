import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./custom.css";
import StarBadge from "../components/StarBadge.vue";
import ProjectCard from "../components/ProjectCard.vue";
import ProjectFilter from "../components/ProjectFilter.vue";
import LearningPath from "../components/LearningPath.vue";
import EcosystemMap from "../components/EcosystemMap.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("StarBadge", StarBadge);
    app.component("ProjectCard", ProjectCard);
    app.component("ProjectFilter", ProjectFilter);
    app.component("LearningPath", LearningPath);
    app.component("EcosystemMap", EcosystemMap);
  },
} satisfies Theme;
