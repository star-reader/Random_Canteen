<template>
    <div class="food-card">
        <DiaryItem v-for="i in data" :data="i" />
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import DiaryItem from './DiaryItem.vue';
import api from '@/config/api/api';
import createHeader from '@/utils/createHeader';
import { closeToast, showLoadingToast } from 'vant';

const data = ref<UserHistory[]>()

onMounted(() => {
    showLoadingToast({
        'message': '加载中...',
        'duration': 3000,
        forbidClick: true
    })
    axios.get(api.getHistory,{'headers': createHeader()}).then(res => {
        data.value = res.data.data.reverse()
        closeToast()
    })
})

</script>

<style lang='less' scoped>
.food-card{
    position: relative;
    left: 0;
    width: 100%;
    top: 0;
    // 100px是顶部标题和搜索栏，60是下面“我要发布”的组件
    height: 100%;
    overflow: hidden auto;
}

</style>
