<template>
    <van-search v-model="value" placeholder="输入食堂/标题/标签来搜索" />
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue'
import pusbub from 'pubsub-js'

const value = ref('')

watch(value, (newVal) => {
    pusbub.publish('filter-word', newVal)
})


</script>