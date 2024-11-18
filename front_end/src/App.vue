<template>
    <NavigationTabBar />

    <router-view v-slot="{ Component }">
        <KeepAlive>
            <component :is="Component" :key="$route.name" />
        </KeepAlive>
    </router-view>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import axios from 'axios';
import NavigationTabBar from './layout/NavBar/NavigationTabBar.vue';
import router from './router';
import { dataDecrypt } from './utils/crypto';
import api from './config/api/api';
import useGetToken from './hooks/useGetToken';

interface LoginCert {
    username: string,
    password: string,
    seed: string
}

onMounted(() => {
    if (location.pathname === '/login' || location.pathname === '/register') return
    useGetToken()

    setInterval(() => {
        useGetToken()
    }, 3600000);
})

</script>

<style lang='less' scoped>

</style>