<template>
    <main class="singer-login">
        <section class="singer-login-logpart">
            <section class="singer-login-input">
                <div>
                    <label>账号：</label>
                    <SiInput v-model="account" type="text"></SiInput>
                </div>
                <div>
                    <label>密码：</label>
                    <SiInput v-model="password" type="password"></SiInput>
                </div>
            </section>
            <SiButton @click="logIn">登录</SiButton>
        </section>
    </main>
</template>

<script lang="ts" setup>
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { apolloClient } from "../apollo/client";
import gql from "graphql-tag";
import { ref, Ref } from "vue";

const account: Ref<string> = ref("");
const password: Ref<string> = ref("");

const logIn = () => {
    if (!account.value || !password.value) return;
    const { result, error, loading } = provideApolloClient(apolloClient)(() =>
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
    console.log(result.value.login, error.value, loading.value);
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
