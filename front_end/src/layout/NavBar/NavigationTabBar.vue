<template>
    <div class="app-nav-bar">
        <van-tabbar v-model="active" route>
        <van-tabbar-item name="food" to="/index" icon="home-o">干饭</van-tabbar-item>
        <van-tabbar-item name="explore" to="/map" icon="location-o">探索</van-tabbar-item>
        <van-tabbar-item name="moment" to="/community" icon="chat-o">交流</van-tabbar-item>
        <van-tabbar-item name="my" to="my" icon="friends-o">主页</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
const active = ref('food')
</script>

<style lang='less' scoped>
.app-nav-bar{
    z-index: 9999;
}
</style>