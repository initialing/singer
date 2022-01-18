import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3001,
    },
    plugins: [vue()],
});
