<template>
    <article class="sg-editcountry">
        <h4>编辑国家/地区</h4>
        <section class="sg-editcountry-editpart">
            <div class="sg-editcountry-edit">
                <label>国家/地区名：</label>
                <SiInput
                    v-model="countryName"
                    placeholder="请输入国家或地区名"
                ></SiInput>
            </div>
            <div class="sg-editcountry-submit">
                <SiButton @click="submit">提交</SiButton>
            </div>
        </section>
    </article>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/client";
import gql from "graphql-tag";

const countryName: Ref<string> = ref("");
const { mutate: addCountry } = provideApolloClient(apolloClient)(() =>
    useMutation(
        gql`
            mutation createCountry($name: String!) {
                addCountry(name: $name) {
                    _id
                    name
                }
            }
        `,
        () => ({
            variables: {
                name: countryName.value,
            },
        })
    )
);
const submit = () => {
    if (!countryName.value) return;
    addCountry().then((res) => {
        console.log(res);
    });
};
</script>

<style scoped lang="scss">
.sg-editcountry {
    padding: 20px 20px 20px 40px;
    h4 {
        font-size: 20px;
    }
    &-edit,
    &-submit {
        display: flex;
        align-items: center;
    }
    &-submit {
        margin-top: 32px;
        justify-content: center;
    }
}
</style>
