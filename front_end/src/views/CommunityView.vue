<template>
    <div class="page-wrapper">
        <van-nav-bar title="交流中心" @click-right="onClickRight">
            <template #right>
                <van-icon name="edit" />
            </template>
        </van-nav-bar>
        <SearchContainer />
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
        <FoodCard />
        <!-- </van-pull-refresh> -->
        <!-- <ButtonContainer /> -->
    </div>
</template>

<script lang='ts' setup>
import pubsub from 'pubsub-js'
import SearchContainer from '@/components/Community/SearchContainer.vue'
import FoodCard from '@/components/Community/FoodCard.vue'
import ButtonContainer from '@/components/Community/ButtonContainer.vue';
import { onMounted, ref } from 'vue';

const loading = ref(false)

const onRefresh = () => {
    pubsub.publish('request-pull', 1)
}

const onClickRight = () => {
    pubsub.publish('click-my-writing', 1)
}

onMounted(() => {
    pubsub.subscribe('refresh-complete',() => {
        loading.value = false
    })
})

</script>