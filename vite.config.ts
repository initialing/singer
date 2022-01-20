import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3001,
        proxy: {
            "/singer": "http://localhost:3000/singer",
        },
    },
    plugins: [vue()],
});
