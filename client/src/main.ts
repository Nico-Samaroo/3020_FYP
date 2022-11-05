import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("fa", FontAwesomeIcon)
  .mount("#app");

