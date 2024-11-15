<template>
    <div class="food-card">
        <!-- 每个食物的详细信息 -->
        <div class="food-item">
            <div class="user-info">
                <div class="auth-user">
                    <div class="avatar">
                        <van-image
                            round
                            width="26px"
                            height="26px"
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                        />
                    </div>
                    <div class="username">usagi</div>
                </div>
                <div class="time">2024-11-13 22:09:21</div>
            </div>
            <div class="main-data-area">
                <div class="img-area">
                    <van-image
                        width="80px"
                        height="80px"
                        :radius="8"
                        fit="contain"
                        :src="testPic"
                    />
                </div>
                <div class="data-area">
                    <div class="name-title">二楼自选</div>
                    <div class="name-subtitle">芷园</div>
                    <div class="tag-data">
                        <van-tag type="primary">自选</van-tag>
                        <van-tag type="success">饭</van-tag>
                        <van-tag type="danger">必打卡美食</van-tag>
                    </div>
                    <div class="ranking-data">
                        <div class="label">评分</div>
                        <div class="minding">
                            <van-rate v-model="ranking" 
                            readonly color="#ffd21e"
                            void-icon="star"
                            void-color="#eee" />
                        </div>
                    </div>
                    <div class="ranking-data">
                        <div class="label">拥挤程度</div>
                        <div class="minding">
                            <van-rate v-model="queue" 
                            readonly color="#ffd21e"
                            void-icon="star"
                            void-color="#eee" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import testPic from '@/assets/food/food.png'

const ranking = ref(2)
const queue = ref(3)
</script>

<style lang='less' scoped>
@CardHeight: 180px;
.food-card{
    position: relative;
    left: 0;
    width: 100%;
    top: 0;
    // 100px是顶部标题和搜索栏，60是下面“我要发布”的组件
    height: calc(100% - 100px - 60px);
    overflow: hidden auto;
}
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
