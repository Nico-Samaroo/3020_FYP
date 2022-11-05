import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).component("fa", FontAwesomeIcon).mount("#app");

