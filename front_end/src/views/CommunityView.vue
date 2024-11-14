<template>
    <div class="page-wrapper">
        <van-nav-bar
            title="交流中心"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <SearchContainer />
        <FoodCard />
        <ButtonContainer />
    </div>
</template>

<script lang='ts' setup>
import SearchContainer from '@/components/Community/SearchContainer.vue'
import FoodCard from '@/components/Community/FoodCard.vue'
import ButtonContainer from '@/components/Community/ButtonContainer.vue';

const onClickLeft = () => history.back()
</script>

<style lang='less' scoped>

</style>