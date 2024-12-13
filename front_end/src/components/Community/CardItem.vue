<template>
    <div class="food-item">
            <div class="user-info">
                <div class="auth-user">
                    <!-- <div class="avatar">
                        <van-image
                            round
                            width="26px"
                            height="26px"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                        />
                    </div> -->
                    <div class="username">{{ props.data.username }}</div>
                </div>
                <div class="time">{{ props.data.time }}</div>
            </div>
            <div v-show="foodData?.canteen" class="main-data-area">            
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
                    <div class="detail-title">{{ props.data.title }}</div>
                    <div class="tag-data">
                        <van-tag :type="useTagType(index)" 
                            v-for="(tag, index) in createTags(props.data.tags)">{{ tag }}
                        </van-tag>
                    </div>
                    <div class="ranking-data">
                        <div class="label">评分</div>
                        <div class="minding">
                            <van-rate
                                v-model="props.data.ranking" 
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
                                v-model="props.data.queue" 
                                readonly color="#ffd21e"
                                void-icon="star"
                                void-color="#eee"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!foodData?.canteen" class="main-data-area">
                <van-skeleton>
                    <template #template>
                        <div :style="{ display: 'flex', width: '100%', marginTop:'20px' }">
                            <van-skeleton-image />
                            <div :style="{ position: 'absolute', 'width': 'calc(80% - 100px)', marginLeft: '12px', left: '130px', top: '50px' }">
                                <van-skeleton-paragraph v-for="_ in new Array(5)" />
                            </div>
                        </div>
                    </template>
                </van-skeleton>
            </div>
        </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted, ref } from 'vue'
import axios from 'axios';
import api from '@/config/api/api';
import createTags from '@/utils/createTags';
import useTagType from '@/hooks/useTagType';
import createHeader from '@/utils/createHeader';

interface IProps {
    data: UserMoment
}

const props = defineProps<IProps>()
const foodData = ref<Food>()


onMounted(() => {
    nextTick(() => {
        axios.get(`${api.getFoodById}?id=${props.data.food_id}`,{'headers': createHeader()}).then(res => {
            if (res.data){
                foodData.value = res.data.data
            }
        })
    })
})
</script>

<style lang='less' scoped>
@CardHeight: 210px;
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
            font-size: 13px;
            color: #5b5b5c;
        }
        .detail-title{
            position: relative;
            margin: 4px 0;
            font-size: 16px;
            color: #373738;
            font-weight: bold;
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