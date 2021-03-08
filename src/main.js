import { createApp } from "vue";
import App from "./App.vue";

const rootsArray = document.querySelectorAll(".calc-root");

rootsArray.forEach(root => {
  createApp(App).mount(root);
})