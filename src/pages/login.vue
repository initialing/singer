<template>
    <main class="singer-login">
        <section class="singer-login-logpart">
            <section class="singer-login-input">
                <div>
                    <label>账号：</label>
                    <si-input v-model="account" type="text"></si-input>
                </div>
                <div>
                    <label>密码：</label>
                    <si-input v-model="password" type="password"></si-input>
                </div>
            </section>
            <si-button @click="logIn">登录</si-button>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { apolloClient } from "../apollo/client";
import gql from "graphql-tag";
import { ref, Ref, watch } from "vue";
import { Router, useRouter } from "vue-router";

const account: Ref<string> = ref("");
const password: Ref<string> = ref("");
const logResult: Ref<Record<string, unknown> | null> = ref(null);
const logLoading: Ref<boolean> = ref(true);
const router: Router = useRouter();
const logIn = () => {
    if (!account.value || !password.value) return;
    logLoading.value = false;
    const { result, loading } = provideApolloClient(apolloClient)(() =>
        useQuery(
            gql`
                query signIn($account: String!, $password: String!) {
                    login(account: $account, password: $password) {
                        account
                        password
                        _id
                    }
                }
            `,
            {
                account: account.value,
                password: password.value,
            },
            {
                fetchPolicy: "no-cache",
            }
        )
    );
    watch(loading, (value) => {
        logLoading.value = value;
        logResult.value = result.value.login;
        router.push({
            path: "/",
        });
    });
};
</script>

<style lang="scss" scoped>
.singer-login {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: {
        image: url("../assets/img/background.png");
        position: 50% 50%;
        size: cover;
        repeat: no-repeat;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    &-logpart {
        width: 30vw;
        height: 220px;
        margin-bottom: 130px;
        background-color: white;
        opacity: 0.78;
        border-radius: 10px;
        box-shadow: 5px 5px 18px 2px rgba(77, 77, 77, 0.58);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-input {
        margin-top: 40px;
        & > div {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 32px;
            .si-input {
                width: 230px;
            }
        }
    }
}
</style>
