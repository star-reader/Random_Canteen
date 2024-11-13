<template>
    <div class="preference-selector">
        <van-floating-panel v-model:height="height" :anchors="anchors">
            <van-field name="switch" label="距离优先">
                <template #input>
                    <van-switch v-model="selection.nearest" />
                </template>
            </van-field>
            <van-field name="switch" label="不吃本区">
                <template #input>
                    <van-switch v-model="selection.noCurrent" />
                </template>
            </van-field>
            <van-field name="switch" label="避开拥堵">
                <template #input>
                    <van-switch v-model="selection.queue" />
                </template>
            </van-field>
            <van-field name="switch" label="等级优先">
                <template #input>
                    <van-switch v-model="selection.ranking" />
                </template>
            </van-field>
            <van-field name="switch" label="尝尝新品">
                <template #input>
                    <van-switch v-model="selection.noRecent" />
                </template>
            </van-field>
            <div style="margin: 16px;font-size: 18px">
                <van-button round block type="primary" native-type="submit" @click="onConform">
                确定
                </van-button>
            </div>
            <!-- <div style="margin: 16px;font-size: 18px">
                <van-button round block type="warning" color="rgb(253 14 113)" native-type="submit">
                取消
                </van-button>
            </div> -->
        </van-floating-panel>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'

const selection = ref({
    nearest: false,
    noCurrent: false,
    queue: false,
    ranking: false,
    noRecent: false
})

// 自定义的面板高度
const anchors = [
    0,
    405
]
const height = ref(anchors[0])

const onConform = () => {
    height.value = anchors[0]
}

onMounted(() => {
    // 打开面板
    pubsub.subscribe('open-selector',() => height.value = anchors[1])
})

</script>

<style lang='less' scoped>

</style>