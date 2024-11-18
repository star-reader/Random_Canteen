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

interface LoginCert {
    username: string,
    password: string,
    seed: string
}

onMounted(() => {
    if (location.pathname === '/login' || location.pathname === '/register') return
    const _cert = localStorage.getItem('cert')
    if (!_cert) {
        return router.push('/login')
    }else{
        let cert: LoginCert
        try {
            cert = JSON.parse(dataDecrypt(_cert))
        } catch (error) {
            return router.push('/login')
        }
        axios.post(api.login,{
            username: cert.username,
            password: cert.password
        }).then(res => {
            const userData = res.data.data
            const token = res.data.token
            localStorage.setItem('token', token)
            localStorage.setItem('userData', JSON.stringify(userData))
            router.push('/index')
        }).catch(_ => router.push('/login'))
    }
})

</script>

<style lang='less' scoped>

</style>