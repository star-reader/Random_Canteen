<template>
    <div class="food-item">
            <div class="user-info">
                <div class="auth-user">
                    <div class="avatar">
                        <van-image
                            round
                            width="26px"
                            height="26px"
                            :src="user.avatar"
                        />
                    </div>
                    <div class="username">{{ user.username }}</div>
                </div>
                <div class="time">{{ props.data.time }}</div>
            </div>
            <div class="main-data-area">
                <div class="img-area">
                    <van-image
                        width="80px"
                        height="80px"
                        :radius="8"
                        fit="contain"
                        :src="foodData?.picaddress"
                    />
                </div>
                <div class="data-area">
                    <div class="name-title">{{ foodData?.name }}</div>
                    <div class="name-subtitle">{{ foodData?.canteen }}</div>
                    <div class="tag-data">
                        <van-tag :type="useTagType(index)" 
                            v-for="(tag, index) in createTags(foodData?.tag ? foodData.tag : '')">{{ tag }}
                        </van-tag>
                    </div>
                    <div class="ranking-data">
                        <div class="label">评分</div>
                        <div class="minding">
                            <van-rate
                                v-model="rating" 
                                readonly color="#ffd21e"
                                void-icon="star"
                                void-color="#eee" 
                            />
                        </div>
                    </div>
                    <div class="ranking-data">
                        <div class="label">拥挤程度</div>
                        <div class="minding">
                            <van-rate
                                v-model="queue" 
                                readonly color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, ref } from 'vue'
import axios from 'axios';
import api from '@/config/api/api';
import useTagType from '@/hooks/useTagType';
import createTags from '@/utils/createTags';
import createHeader from '@/utils/createHeader';
import useUserInfo from '@/hooks/useUserInfo';


const rating = ref(0)
const queue = ref(0)

interface IProps {
    data: UserHistory
}

const props = defineProps<IProps>()

const foodData = ref<Food>()
const user = useUserInfo()

onMounted(() => {
    nextTick(() => {
        axios.get(`${api.getFoodById}?id=${props.data.food_id}`,{'headers': createHeader()}).then(res => {
            if (res.data){
                foodData.value = res.data.data
                rating.value = res.data.data.rating
                queue.value = res.data.data.queue
            }
        })
    })
})
</script>

<style lang='less' scoped>
@CardHeight: 180px;
.user-info{
    position: relative;
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    .auth-user{
        display: flex;
        justify-content: left;
        align-items: center;
        .avatar{
            display: flex;
            align-items: center;
        }
        .username{
            margin-left: 8px;
            font-size: 16px;
            color: gray;
            line-height: 22px;
        }
    }
    .time{
        font-size: 14px;
        color: gray;
    }
}
.food-item{
    position: relative;
    margin: 4px 0;
    padding: 12px;
    left: 0;
    background-color: #f7f8fa;
    width: 100%;
    height: @CardHeight;
    .main-data-area{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .img-area{
        position: relative;
        width: 80px;
        border-radius: 6px;
        overflow: hidden;
    }
    .data-area{
        position: relative;
        left: 0px;
        width: calc(100% - 80px - 20px);
        height: calc(@CardHeight - 20px);
        .name-title{
            font-size: 16px;
            font-weight: bold;
            color: black;
        }
        .name-subtitle{
            font-size: 15px;
            color: #373738;
        }
        .tag-data{
            position: relative;
            // 让出第一个的margin
            left: -6px;
        }
        .ranking-data{
            position: relative;
            top: 10px;
            display: flex;
            align-items: center;
            .label{
                font-size: 14px;
                color: #373738;
            }
            .minding{
                position: relative;
                left: 10px;
                font-size: 14px;
            }
        }
    }
}
</style>