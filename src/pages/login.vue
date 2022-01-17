<template>
    <main class="singer-login">
        <section class="singer-login-logpart">
            <section class="singer-login-input">
                <div>
                    <label>账号：</label>
                    <SiInput type="text"></SiInput>
                </div>
                <div>
                    <label>密码：</label>
                    <SiInput type="password"></SiInput>
                </div>
            </section>
            <SiButton>登录</SiButton>
        </section>
    </main>
</template>

<script lang="ts" setup></script>

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
