declare module "vue" {
    export interface GlobalComponents {
        RouterView: typeof import("vue-router")["RouterView"];
        SiButton: typeof import("silence-ui")["SiButton"];
    }
}

export {};
