<template>
    <article class="sg-showartist">
        <h4>艺术家列表</h4>
        <section class="sg-showartist-content">
            <header>
                <si-input v-model="artistName"></si-input>
                <si-button @click="query">搜索</si-button>
            </header>
            <ul>
                <li class="sg-showartist-title">
                    <div class="sg-showartist-title-name">姓名</div>
                    <div class="sg-showartist-title-birth">生日</div>
                    <div class="sg-showartist-title-dead">去世</div>
                    <div class="sg-showartist-title-country">国家或地区</div>
                    <div class="sg-showartist-title-active">活跃时间</div>
                    <div class="sg-showartist-title-func">操作</div>
                </li>
                <li
                    v-for="item in artists"
                    :key="item._id"
                    class="sg-showartist-item"
                >
                    <div class="sg-showartist-item-name">
                        {{ item.name }}
                    </div>
                    <div class="sg-showartist-item-birth">
                        {{ item.birthday?.split("T")[0] }}
                    </div>
                    <div class="sg-showartist-item-dead">
                        {{ item.deadTime ? item.deadTime.split("T")[0] : "-" }}
                    </div>
                    <div class="sg-showartist-item-country">
                        {{ item.country?.name }}
                    </div>
                    <div class="sg-showartist-item-active">
                        <label
                            v-for="(times, index) in item.activeTime"
                            :key="index"
                        >
                            <span
                                >{{ times[0].split("T")[0] }} -
                                {{
                                    times[1] ? times[1].split("T")[0] : "现在"
                                }}</span
                            >;
                        </label>
                    </div>
                    <div class="sg-showartist-item-func">
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
import { onMounted, reactive, ref } from "vue";
import { apolloClient } from "../../../apollo/client";
import gql from "graphql-tag";
import type { Ref } from "vue";
import type { Artist } from "../../../util/type";

const queryVariables = reactive({
    name: "",
    page: 1,
    pageSize: 10,
});
const artistName: Ref<string> = ref("");
const artists: Ref<Artist[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const totalCount: Ref<number> = ref(0);
const { onResult, result } = provideApolloClient(apolloClient)(() =>
    useQuery(
        gql`
            query queryArtist($page: Int!, $pageSize: Int!, $name: String) {
                getArtist(page: $page, size: $pageSize, name: $name) {
                    totalCount
                    data {
                        _id
                        name
                        birthday
                        country {
                            _id
                            name
                        }
                        activeTime
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
        artists.value = val.getArtist.data;
        totalCount.value = val.getArtist.totalCount;
    }
});
onResult((val) => {
    if (!val.loading) {
        console.log(val);
        artists.value = val.data.getArtist.data;
        totalCount.value = val.data.getArtist.totalCount;
    }
});
const query = () => {
    queryVariables.name = artistName.value;
    queryVariables.page = 1;
    queryVariables.pageSize = 10;
};

const edit = (item: unknown) => {
    console.log(item);
};
</script>

<style scoped lang="scss">
.sg-showartist {
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
        &-name,
        &-birth,
        &-dead,
        &-country {
            width: 120px;
            text-align: center;
        }
        &-active {
            width: 200px;
            text-align: center;
        }
    }
    &-item {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5px solid #a3afc6;
        &-name,
        &-birth,
        &-dead,
        &-country {
            width: 120px;
            text-align: center;
        }
        &-active {
            width: 200px;
            text-align: center;
        }
        &-func {
            width: 100px;
            text-align: center;
        }
    }
}
</style>
