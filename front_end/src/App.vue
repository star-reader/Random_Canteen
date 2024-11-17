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
import NavigationTabBar from './layout/NavBar/NavigationTabBar.vue';
import router from './router';
import { dataDecrypt } from './utils/crypto';

interface LoginCert {
    username: string,
    password: string,
    seed: string
}

onMounted(() => {
    const _cert = localStorage.getItem('cert')
    if (!_cert) {
        router.push('/login')
    }else{
        let cert: LoginCert
        try {
            cert = JSON.parse(dataDecrypt(_cert))
        } catch (error) {
            router.push('/login')
        }
        
    }
})

</script>

<style lang='less' scoped>

</style>