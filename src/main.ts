import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import {
    SiButton,
    SiInput,
    SiPagination,
    SiFreeSelector,
    SiRadio,
    SiRadioGroup,
    SiDatePicker,
    SiTag,
    SiOption,
} from "silence-ui";
import { createPinia } from "pinia";

import "silence-ui/style/index.css";

const app = createApp(App);

app.use(SiButton);
app.use(SiInput);
app.use(SiPagination);
app.use(SiFreeSelector);
app.use(SiRadio);
app.use(SiRadioGroup);
app.use(SiDatePicker);
app.use(SiTag);
app.use(SiOption);

app.use(router);
app.use(createPinia());
app.mount("#app");
