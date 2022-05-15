import { defineStore } from "pinia";
export const countryStore = defineStore("country", {
    state: () => ({
        editType: "create",
        countryId: "",
        countryName: "",
    }),
});
