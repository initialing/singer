<template>
    <main class="singer-login">
        <section class="singer-login-logpart"></section>
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
        height: 440px;
        background-color: white;
        opacity: 0.78;
        border-radius: 10px;
        box-shadow: 5px 5px 18px 2px rgba(77, 77, 77, 0.58);
    }
}
</style>
