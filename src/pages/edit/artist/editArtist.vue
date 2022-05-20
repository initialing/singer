<template>
    <article class="sg-editartist">
        <h4>编辑艺术家</h4>
        <section class="sg-editartist-editpart">
            <div class="sg-editartist-edit">
                <label>姓名：</label>
                <si-input v-model="name" placeholder="请输入姓名"></si-input>
            </div>
            <div class="sg-editartist-edit">
                <label>国家/地区：</label>
                <si-free-selector
                    v-model="countryId"
                    :selections="countrySelection"
                    @selector-input="countryChange"
                >
                    <template #tags="tagProp"
                        ><si-tag
                            :value="tagProp.item.value"
                            :label="tagProp.item.label"
                        ></si-tag
                    ></template>
                    <template #options="optionProp"
                        ><si-option
                            :value="optionProp.item._id"
                            :label="optionProp.item.name"
                        ></si-option
                    ></template>
                </si-free-selector>
            </div>
            <div class="sg-editartist-edit">
                <label>性别：</label>
                <si-radio-group v-model="sex">
                    <si-radio :label="1">男</si-radio>
                    <si-radio :label="2">女</si-radio>
                    <si-radio :label="3">无</si-radio>
                </si-radio-group>
            </div>
            <div class="sg-editartist-edit">
                <label>生日：</label>
                <si-date-picker v-model="birthday"></si-date-picker>
            </div>
            <div class="sg-editartist-edit">
                <label>去世：</label>
                <si-date-picker v-model="deadTime"></si-date-picker>
            </div>
            <div class="sg-editartist-edit">
                <label>类型：</label>
                <si-radio-group v-model="type">
                    <si-radio :label="1">个人</si-radio>
                    <si-radio :label="2">乐队</si-radio>
                </si-radio-group>
            </div>
            <div class="sg-editartist-edit">
                <label>活跃时间：</label>
                <div class="sg-editartist-editactivepool">
                    <div
                        v-for="(arr, index) in activeTime"
                        :key="index"
                        class="sg-editartist-editactive"
                    >
                        <si-date-picker v-model="arr[0]"></si-date-picker>
                        <si-date-picker v-model="arr[1]"></si-date-picker>
                    </div>
                </div>
            </div>
            <div class="sg-editartist-edit">
                <si-button @click="addActiveTime">添加时间段</si-button>
                <si-button @click="removeActiveTime">去除时间段</si-button>
            </div>
            <div v-if="type === 2" class="sg-editartist-edit">
                <label>成员：</label>
                <si-free-selector
                    v-model="member"
                    :selections="memberSelection"
                    @selector-input="countryChange"
                >
                    <template #tags="tagProp"
                        ><si-tag
                            :value="tagProp.item._id"
                            :label="tagProp.item.name"
                        ></si-tag
                    ></template>
                    <template #options="optionProp"
                        ><si-option
                            :value="optionProp.item._id"
                            :label="optionProp.item.name"
                        ></si-option></template
                ></si-free-selector>
            </div>
            <div class="sg-editartist-submit">
                <si-button @click="submit">提交</si-button>
            </div>
        </section>
    </article>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { SelectOption, Selector } from "../../../util/type";
import {
    provideApolloClient,
    useMutation,
    useQuery,
} from "@vue/apollo-composable";
import gql from "graphql-tag";
import { apolloClient } from "../../../apollo/client";

const name: Ref<string> = ref("");
const countryId: Ref<Array<Selector>> = ref([]);
const countrySelection: Ref<Array<SelectOption>> = ref([]);
const sex: Ref<1 | 2 | 3> = ref(3);
const birthday: Ref<Date | null> = ref(null);
const deadTime: Ref<Date | null> = ref(null);
const type: Ref<1 | 2> = ref(1);
const activeTime: Ref<Array<Array<Date | null>>> = ref([[null, null]]);
const member: Ref<Array<Selector>> = ref([]);
const memberSelection: Ref<Array<SelectOption>> = ref([]);

const clVariable = reactive({
    name: "",
});

let clDebounce: number | undefined = undefined;

const { onResult: clOnResult } = provideApolloClient(apolloClient)(() =>
    useQuery(
        gql`
            query queryCountryList($name: String!) {
                getCountryList(name: $name) {
                    _id
                    name
                }
            }
        `,
        clVariable
    )
);

const { mutate: addArtist } = provideApolloClient(apolloClient)(() =>
    useMutation(gql`
        mutation addArtist($artist: ArtistInputModel!) {
            addArtist(artist: $artist) {
                _id
            }
        }
    `)
);
clOnResult((val) => {
    if (!val.loading) {
        countrySelection.value = val.data.getCountryList;
    }
});

const countryChange = (val: string) => {
    clearTimeout(clDebounce);
    clDebounce = setTimeout(() => {
        console.log(val);
        if (!val) {
            countrySelection.value = [];
            return;
        }
        clVariable.name = val;
    }, 800);
};

const addActiveTime = () => {
    activeTime.value.push([null, null]);
};
const removeActiveTime = () => {
    activeTime.value.pop();
};
const submit = () => {
    let data = {
        name: name.value,
        birthday: birthday.value,
        countryId: countryId.value[0].value,
        sex: sex.value,
        deadTime: deadTime.value,
        type: type.value,
        activeTime: activeTime.value,
    };
    console.log("submit", data);
    addArtist({
        artist: data,
    }).then((res) => {
        console.log(res);
    });
};
</script>

<style lang="scss" scoped>
.sg-editartist {
    padding: 20px 20px 20px 40px;
    h4 {
        font-size: 20px;
    }
    &-edit,
    &-submit,
    &-editactive,
    &-editactivepool {
        display: flex;
        align-items: center;
    }
    &-editactivepool {
        flex-direction: column;
    }
    &-edit {
        margin-top: 15px;
    }
    &-submit {
        margin-top: 32px;
        justify-content: center;
    }
}
</style>
