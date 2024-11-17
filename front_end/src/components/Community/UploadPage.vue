<template>
    <div class="page-wrapper upload-container" v-if="isShow">
        <!-- TODO -->
        <van-nav-bar
            title="写评价"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
        />
        <van-cell-group inset>
            <van-field
                v-model="form.canteen"
                is-link
                readonly
                required
                name="canteen"
                label="食堂"
                placeholder="选择食堂"
                @click="showPicker1 = true"
                :rules="[{ required: true, message: '请选择档口' }]"
                />
                <van-popup v-model:show="showPicker1" position="bottom">
                <van-picker
                    :columns="canteens"
                    @confirm="onConfirm"
                    @cancel="showPicker1 = false"
                />
            </van-popup>
            <van-field
                v-model="form.food_id"
                is-link
                readonly
                name="food"
                label="食堂档口"
                placeholder="选择食堂档口"
                :rules="[{ required: true, message: '请选择档口' }]"
                @click="showPicker2 = true"
                />
                <van-popup v-model:show="showPicker2" position="bottom">
                <van-picker
                    :columns="canteens"
                    :loading="isLoadingFood"
                    @confirm="onConfirm2"
                    @cancel="showPicker2 = false"
                />
            </van-popup>
            <van-field
                v-model="form.title"
                name="title"
                label="标题"
                placeholder="标题"
                :rules="[{ required: true, message: '请输入标题' }]"
            />
            <van-field
                v-model="form.content"
                rows="2"
                autosize
                label="评价内容"
                type="textarea"
                maxlength="50"
                placeholder="评价"
                show-word-limit
                :rules="[{ required: true, message: '请输入内容' }]"
            />
            <van-field name="rating" label="评价"
            :rules="[{ required: true, message: '请填写评价' }]">
                <template #input>
                    <van-rate
                        v-model="form.ranking"
                        :size="25"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </template>
            </van-field>
            <van-field name="queue" label="排队程度"
            :rules="[{ required: true, message: '请填写排队程度' }]">
                <template #input>
                    <van-rate
                        v-model="form.queue"
                        :size="25"
                        color="#ffd21e"
                        void-icon="star"
                        void-color="#eee"
                    />
                </template>
            </van-field>
            <!-- <van-field
                v-model="form.tags"
                name="title"
                label="标签"
                placeholder="标签，最多3个,使用逗号隔开"
            /> -->
            <br/>
            <van-button round block 
                type="primary" native-type="submit">
                提交
            </van-button>
        </van-cell-group>
        
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'

const isShow = ref(false)
const showPicker1 = ref(false)
const showPicker2 = ref(false)
const isLoadingFood = ref(true)
const canteens = [
    { text: '芷园', value: '芷园' },
    { text: '荷园', value: '荷园' },
    { text: '西园', value: '西园' },
    { text: '莘园', value: '莘园' },
    { text: '绿榕园', value: '绿榕园' },
    { text: '稻香园', value: '稻香园' },
]
const foods = ref([])
const onClickLeft = () => isShow.value = false
const onConfirm = ({ selectedOptions }: any) => {
    form.value.canteen = selectedOptions[0]?.text
    showPicker1.value = false
}
const onConfirm2 = ({ selectedOptions }: any) => {
    form.value.canteen = selectedOptions[0]?.text
    showPicker2.value = false
}


const form = ref({
    food_id: 0,
    canteen: '',
    title: '',
    content: '',
    picaddress: null,
    ranking: 0,
    queue: 0,
    tags: [],
    time: ''
})

onMounted(() => {
    pubsub.subscribe('click-my-writing',() => {
        return isShow.value = true
    })
})

</script>

<style lang='less' scoped>
.upload-container{
    z-index: 20;
    background-color: white;
}
</style>