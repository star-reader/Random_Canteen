<template>
    <div class="food-card">
        <!-- 每个食物的详细信息 -->
        <CardItem v-for="i in filteredData" :data="i" @click="() => showDetail(i)" />
    </div>
    <UploadPage />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'
import axios from 'axios';
import { closeToast, showDialog, showFailToast, showLoadingToast } from 'vant';
import api from '@/config/api/api';
import UploadPage from './UploadPage.vue'
import CardItem from './CardItem.vue';
import createHeader from '@/utils/createHeader';


const data = ref<UserMoment[]>([])
const filteredData = ref<UserMoment[]>()

onMounted(() => {
    showLoadingToast({
        'message': '加载中...',
        'duration': 3000,
        forbidClick: true
    })
    axios.get(api.getMoments,{'headers': createHeader()}).then(res => {
        data.value = res.data.data.reverse()
        filteredData.value = data.value
        closeToast()
    }).catch(_ => showFailToast('交流版块加载失败！'))
    pubsub.subscribe('insert-new',(_,d) => data.value.unshift(d))
})

const showDetail = (i: UserMoment) => {
    showDialog({
        title: i.title,
        message: i.content,
    })
}

onMounted(() => {

    pubsub.subscribe('filter-word',(_,word: string) => {
        filteredData.value = word ? 
        data.value.filter(item => item.title.includes(word) || item.canteen.includes(word) || item.tags.includes(word)) 
        : data.value
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
    height: calc(100% - 100px - 60px);
    overflow: hidden auto;
}
</style>