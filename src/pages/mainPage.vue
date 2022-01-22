<template>
    <main>this is main page {{ res?.code }}</main>
</template>

<script lang="ts" setup>
import gql from "graphql-tag";
import { onMounted, Ref, ref } from "vue";
import { apolloClient } from "../apollo/client";
import { asyncQuery } from "../apollo/promiseGql";

const res: Ref<Record<string, unknown> | null> = ref(null);
onMounted(() => {
    asyncQuery(
        apolloClient,
        gql`
            query main {
                getMain {
                    code
                    describe
                }
                getHistorySameDate {
                    code
                    describe
                }
            }
        `
    ).then((result) => {
        res.value = result.result.value.getMain;
    });
});
</script>

<style scoped lang="scss"></style>
