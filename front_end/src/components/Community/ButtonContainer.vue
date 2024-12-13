<template>
    <div class="button-area" @click="onClick">
        <van-button round block 
            type="primary" native-type="submit">
            我也要写
        </van-button>
    </div>
</template>

<script lang='ts' setup>
import pubsub from 'pubsub-js'

const onClick = () => {
    pubsub.publish('click-my-writing', 1)
}
</script>

<style lang='less' scoped>
.button-area{
    position: relative;
    width: 86%;
    left: 7%;
}
</style>