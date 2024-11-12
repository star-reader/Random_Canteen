<template>
    <div class="preference-selector">
        <van-floating-panel>
            <van-field name="switch" label="距离优先">
                <template #input>
                    <van-switch v-model="selection.nearest" />
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
                <van-button round block type="primary" native-type="submit">
                确定
                </van-button>
            </div>
            <div style="margin: 16px;font-size: 18px">
                <van-button round block type="warning" color="rgb(253 14 113)" native-type="submit">
                取消
                </van-button>
            </div>
        </van-floating-panel>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

const selection = ref({
    nearest: false,
    queue: false,
    ranking: false,
    noRecent: false
})

</script>

<style lang='less' scoped>

</style>