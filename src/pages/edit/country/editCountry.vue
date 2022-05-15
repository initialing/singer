<template>
    <article class="sg-editcountry">
        <h4>编辑国家/地区</h4>
        <section class="sg-editcountry-editpart">
            <div class="sg-editcountry-edit">
                <label>国家/地区名：</label>
                <si-input
                    v-model="countryName"
                    placeholder="请输入国家或地区名"
                ></si-input>
            </div>
            <div class="sg-editcountry-submit">
                <si-button @click="submit">提交</si-button>
            </div>
        </section>
    </article>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import { provideApolloClient, useMutation } from "@vue/apollo-composable";
import { apolloClient } from "../../../apollo/client";
import gql from "graphql-tag";
import { Router, useRouter } from "vue-router";
import { countryStore } from "../../../store/country";

const router: Router = useRouter();
const countryName: Ref<string> = ref("");
const countryStoreInstance = countryStore();
const id: Ref<string> = ref("");
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

const { mutate: editCountry } = provideApolloClient(apolloClient)(() =>
    useMutation(gql`
        mutation editCountry($id: String!, $name: String!) {
            editCountry(id: $id, name: $name) {
                _id
                name
            }
        }
    `)
);
onMounted(() => {
    if (countryStoreInstance.editType === "edit") {
        id.value = countryStoreInstance.countryId;
        countryName.value = countryStoreInstance.countryName;
    }
    countryStoreInstance.editType = "create";
});
const submit = () => {
    if (!countryName.value) return;
    if (!id.value) {
        addCountry().then((res) => {
            console.log(res);
            router.push({ path: "/edit/country/show" });
        });
    } else {
        editCountry({
            id: id.value,
            name: countryName.value,
        }).then((res) => {
            console.log(res);
            router.push({ path: "/edit/country/show" });
        });
    }
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
