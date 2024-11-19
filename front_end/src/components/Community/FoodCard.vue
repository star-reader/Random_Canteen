<template>
    <div class="food-card">
    <!-- 每个食物的详细信息 -->
        <CardItem v-for="i in filteredData" :key="i.id" :data="i" @click="() => showDetail(i)" />
        <van-pagination class="pagination" v-model="currentPage"
            :total-items="totalPage" :items-per-page="4" @change="() => getMoments(false)"
        />
        <van-empty v-if="!filteredData?.length" description="暂无内容" />
    </div>
    <UploadPage />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'
import { closeToast, showDialog, showFailToast, showLoadingToast } from 'vant';
import axios from 'axios';
import api from '@/config/api/api';
import UploadPage from './UploadPage.vue'
import CardItem from './CardItem.vue';
import createHeader from '@/utils/createHeader';
import randomString from '@/utils/randomString';

let currentPage = ref(1) // 加载的页数
const totalPage = ref(1)
const data = ref<UserMoment[]>([])
const filteredData = ref<UserMoment[]>()

const getMoments = (isFromRefresh: boolean) => {
    showLoadingToast({
        'message': '加载中...',
        'duration': 3000,
        forbidClick: true
    })
    // 如果正常加载,page ++， 如果是下拉刷新，page =1
    axios.get(`${api.getMoments}?page=${currentPage.value}`,{'headers': createHeader()}).then(res => {
        data.value = res.data.data
        filteredData.value = data.value
        closeToast()
        if (isFromRefresh){
            pubsub.publish('refresh-complete', 1)
        }
    }).catch(_ => showFailToast('交流版块加载失败！'))
}

onMounted(async () => {
    
    totalPage.value = (await axios.get(api.getMomentsNumber,{'headers': createHeader()})).data.data
    getMoments(false)
    pubsub.subscribe('insert-new',(_,d) => {
        data.value.unshift(d)
    })
    pubsub.subscribe('request-pull',() => getMoments(true))
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
    height: 100%;
    overflow: hidden auto;
}
</style>