<template>
    <van-search v-model="value" placeholder="输入食堂/菜品名称/标签来搜索" />
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const value = ref('')
</script>