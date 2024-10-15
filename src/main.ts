import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVfm } from "vue-final-modal";
import "./style.scss";
import "vue-final-modal/style.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const pinia = createPinia();
const vfm = createVfm();

createApp(App).use(router).use(pinia).use(vfm).mount("#app");
