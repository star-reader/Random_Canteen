<template>
    <div class="page-wrapper">
        <van-nav-bar
            title="干饭日记"
            left-arrow
            left-text="返回"
            @click-left="onClickLeft"
           
        />
    <DiaryCard/>
    </div>
</template>

<script lang='ts' setup>
import DiaryCard from './DiaryCard.vue';
const onClickLeft = () => history.back()
</script>

<style lang='less' scoped>

</style>
