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
            <van-field
                v-model="selection.preferCanteen"
                is-link
                readonly
                name="canteen"
                label="优先选择"
                placeholder="选择食堂"
                @click="showPicker = true"
                :rules="[{ required: true, message: '请选择食堂' }]"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                <van-picker
                    :columns="canteens"
                    @confirm="onConfirm2"
                    @cancel="showPicker = false"
                />
            </van-popup>
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
import { onMounted, ref, toRaw } from 'vue'
import pubsub from 'pubsub-js'

const showPicker = ref(false)

const selection = ref({
    nearest: false,
    noCurrent: false,
    queue: false,
    ranking: false,
    noRecent: false,
    preferCanteen: ''
})

// 自定义的面板高度
const anchors = [
    0,
    405
]
const height = ref(anchors[0])

const onConform = () => {
    height.value = anchors[0]
    localStorage.setItem('preference', JSON.stringify(toRaw(selection.value)))
}

const onConfirm2 = ({ selectedOptions }: any) => {
    selection.value.preferCanteen = selectedOptions[0]?.value
    showPicker.value = false
}

const canteens = [
    { text: '不限', value: '不限' },
    { text: '芷园', value: '芷园' },
    { text: '荷园', value: '荷园' },
    { text: '西园', value: '西园' },
    { text: '莘园', value: '莘园' },
    { text: '绿榕园', value: '绿榕园' },
    { text: '稻香园', value: '稻香园' },
    { text: '启林南小吃街', value: '启林南小吃街' },
]

onMounted(() => {
    // 打开面板
    pubsub.subscribe('open-selector',() => height.value = anchors[1])

    if (localStorage.getItem('preference')){
        selection.value = JSON.parse(localStorage.getItem('preference') as string)
    }
})

</script>

<style lang='less' scoped>

</style>