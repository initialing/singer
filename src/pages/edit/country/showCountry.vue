<template>
    <article class="sg-showcountry">
        <h4>国家/地区列表</h4>
        <section class="sg-showcountry-content">
            <header>
                <si-input v-model="countryName"></si-input>
                <si-button @click="query">搜索</si-button>
            </header>
            <ul>
                <li class="sg-showcountry-title">
                    <div class="sg-showcountry-title-name">国家/地区名</div>
                    <div class="sg-showcountry-title-func">操作</div>
                </li>
                <li
                    v-for="item in countries"
                    :key="item._id"
                    class="sg-showcountry-item"
                >
                    <div class="sg-showcountry-item-name">
                        {{ item.name }}
                    </div>
                    <div class="sg-showcountry-item-func">
                        <si-button @click="edit(item)">编辑</si-button>
                    </div>
                </li>
            </ul>
            <footer>
                <si-pagination
                    v-model="currentPage"
                    :total="totalCount"
                    :page-size="10"
                ></si-pagination>
            </footer>
        </section>
    </article>
</template>

<script lang="ts" setup>
import {
    provideApolloClient,
    useQuery,
    useResult,
} from "@vue/apollo-composable";
import { onMounted, reactive, watch, ref } from "vue";
import { apolloClient } from "../../../apollo/client";
import gql from "graphql-tag";
import type { Ref } from "vue";
import type { Country } from "../../../util/type";
import { countryStore } from "../../../store/country";
import router from "../../../router";

const queryVariables = reactive({
    name: "",
    page: 1,
    pageSize: 10,
});
const countryName: Ref<string> = ref("");
const countries: Ref<Country[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const totalCount: Ref<number> = ref(0);
const countryStoreInstance = countryStore();
const { onResult, result } = provideApolloClient(apolloClient)(() =>
    useQuery(
        gql`
            query queryCountry($page: Int!, $pageSize: Int!, $name: String) {
                getCountry(page: $page, size: $pageSize, name: $name) {
                    totalCount
                    data {
                        _id
                        name
                    }
                }
            }
        `,
        queryVariables
    )
);
onMounted(() => {
    queryVariables.name = "";
    let val = useResult(result, null, (data) => data).value;
    if (val) {
        countries.value = val.getCountry.data;
        totalCount.value = val.getCountry.totalCount;
    }
});
onResult((val) => {
    if (!val.loading) {
        countries.value = val.data.getCountry.data;
        totalCount.value = val.data.getCountry.totalCount;
    }
});
const query = () => {
    queryVariables.name = countryName.value;
    queryVariables.page = 1;
    queryVariables.pageSize = 10;
};

const edit = (item: Country) => {
    console.log(item);
    countryStoreInstance.editType = "edit";
    if (item._id) {
        countryStoreInstance.countryId = item._id;
    }
    if (item.name) {
        countryStoreInstance.countryName = item.name;
    }
    router.push({
        path: "/edit/country/edit",
    });
};
</script>

<style scoped lang="scss">
.sg-showcountry {
    width: 86%;
    margin: auto;
    &-content {
        header {
            display: flex;
            justify-content: space-between;
        }
        ul {
            list-style: none;
            padding: 0px;
        }
        footer {
            float: right;
        }
    }
    ul {
        height: 500px;
    }
    &-title {
        height: 50px;
        font-weight: 500;
        border-bottom: 0.5px solid #a3afc6;
        display: flex;
        justify-content: space-between;
        &-func {
            width: 100px;
            text-align: center;
        }
    }
    &-item {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5px solid #a3afc6;
        &-name {
        }
    }
}
</style>
