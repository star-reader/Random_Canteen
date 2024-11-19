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
                :rules="[{ required: true, message: '请选择食堂' }]"
                />
                <van-popup v-model:show="showPicker1" position="bottom">
                <van-picker
                    :columns="canteens"
                    @confirm="onConfirm"
                    @cancel="showPicker1 = false"
                />
            </van-popup>
            <van-field
                v-model="form.food_name"
                is-link
                readonly
                required
                name="food"
                label="食堂档口"
                placeholder="选择食堂档口"
                :rules="[{ required: true, message: '请选择档口' }]"
                @click="showPicker2 = true"
                />
                <van-popup v-model:show="showPicker2" position="bottom">
                <van-picker
                    :columns="foods"
                    :loading="isLoadingFood"
                    @confirm="onConfirm2"
                    @cancel="showPicker2 = false"
                />
            </van-popup>
            <van-field
                v-model="form.title"
                name="title"
                label="标题"
                required
                placeholder="标题"
                :rules="[{ required: true, message: '请输入标题' }]"
            />
            <van-field
                v-model="form.content"
                rows="2"
                autosize
                label="评价内容"
                type="textarea"
                maxlength="80"
                placeholder="评价"
                show-word-limit
                required
                :rules="[{ required: true, message: '请输入内容' }]"
            />
            <van-field name="rating" label="评价" required
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
            <van-field name="queue" label="排队程度" required
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
            <van-field
                v-model="form.tags"
                name="title"
                label="标签"
                placeholder="标签，最多3个,使用逗号隔开"
            />
            <br/>
            <van-button round block 
                type="primary"
                native-type="submit"
                @click="handleSubmit">
                提交
            </van-button>
        </van-cell-group>
        
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, toRaw } from 'vue'
import pubsub from 'pubsub-js'
import axios from 'axios';
import api from '@/config/api/api';
import createHeader from '@/utils/createHeader';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import getTime from '@/utils/getTime';
import useUserInfo from '@/hooks/useUserInfo';

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
    { text: '启林南小吃街', value: '启林南小吃街' },
]
const foods = ref<Food[]>()
const onClickLeft = () => isShow.value = false
const onConfirm = ({ selectedOptions }: any) => {
    form.value.canteen = selectedOptions[0]?.text
    showPicker1.value = false
    foods.value = []
    axios.get(`${api.getDataByCanteen}?canteen=${form.value.canteen}`,{'headers': createHeader()}).then(res => {
        const d: any[] = []
        for (let i of res.data.data){
            d.push({text: i.name, value: i.id})
        }
        isLoadingFood.value = false
        foods.value = d
    })
}
const onConfirm2 = ({ selectedOptions }: any) => {
    form.value.food_id = selectedOptions[0]?.value
    form.value.food_name = selectedOptions[0]?.text
    showPicker2.value = false
}

const handleSubmit = () => {
    const data = toRaw(form.value)
    data.time = getTime()
    
    if (!data.canteen || !data.food_id || !data.title || !data.content || !data.queue || !data.ranking){
        return showToast('请填写必填项后再提交')
    }

    axios.post(api.uploadMoments,{upload: data},{'headers': createHeader()}).then(res => {
        showSuccessToast('上传成功')
        pubsub.publish('insert-new', {
            ...data,
            username: useUserInfo()?.username
        })
        // @ts-ignore    Type 'string | number' is not assignable
        Object.keys(form.value).forEach(k => form.value[k as keyof object] = typeof form.value[k as keyof object] === 'string' ? '' : 0)
        isShow.value = false
    }).catch(_ => showFailToast('上传失败'))
}

const form = ref({
    food_name: '',
    food_id: 0,
    canteen: '',
    title: '',
    content: '',
    picaddress: '',
    ranking: 0,
    queue: 0,
    tags: '',
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