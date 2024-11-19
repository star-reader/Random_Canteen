<template>
    <van-search v-model="value" @search="searchInput" placeholder="输入食堂/标题/标签来搜索" />
</template>

<script lang='ts' setup>
import { ref, watch } from 'vue'
import pusbub from 'pubsub-js'

const value = ref('')

const searchInput = () => {
    pusbub.publish('filter-word', value.value)
}

</script>