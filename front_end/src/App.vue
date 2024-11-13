<template>
    <NavigationTabBar />

    <router-view v-slot="{ Component }">
        <KeepAlive>
            <component :is="Component" :key="$route.name" />
        </KeepAlive>
    </router-view>
</template>

<script lang='ts' setup>
import NavigationTabBar from './layout/NavBar/NavigationTabBar.vue';

</script>

<style lang='less' scoped>

</style>