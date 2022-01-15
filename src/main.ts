import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import { SiButton } from "silence-ui";

import "silence-ui/style/index.css";

const app = createApp(App);

app.use(SiButton);

app.use(router);
app.mount("#app");
