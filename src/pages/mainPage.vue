<template>
    <main>this is main page</main>
</template>

<script lang="ts" setup>
import {
    provideApolloClient,
    useQuery,
    useResult,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
import { onMounted, Ref, ref, watch } from "vue";
import { apolloClient } from "../apollo/client";

let res: Ref<Record<string, unknown> | null> = ref(null);
onMounted(() => {
    const { result, loading } = provideApolloClient(apolloClient)(() =>
        useQuery(gql`
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
        `)
    );
    res.value = useResult(result, {}, (data) => data.getMain).value;
    watch(result, (value) => {
        res.value = value.getMain;
    });
});
</script>

<style scoped lang="scss"></style>
