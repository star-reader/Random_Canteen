<template>
    <NavigationTabBar />
    
    <router-view v-slot="{ Component }">
        <keep-alive>
          <component v-if="$route.meta.keepAlive" :key="$route.name" :is="Component" />
        </keep-alive>
        <component v-if="!$route.meta.keepAlive" :key="$route.name" :is="Component" />
    </router-view>
</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import NavigationTabBar from './layout/NavBar/NavigationTabBar.vue';
import useGetToken from './hooks/useGetToken';

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