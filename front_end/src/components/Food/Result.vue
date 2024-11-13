<template>
    <div class="page-wrapper result-panel">
        <div class="top-pic-frame">
            <img :src="topFoodPic" alt="顶部食物图片">
        </div>
        <div class="main-frame">
            <div class="content-area">
                <div class="main-name">芷园</div>
                <div class="sub-name">二楼自选</div>
            </div>
            <div class="pic-area">
                <img :src="testPic" alt="食物配图">
            </div>
            <div class="static-area">
                <div class="data-area">
                    <div class="label">标签</div>
                    <div class="minding">
                        <van-tag type="primary">自选</van-tag>
                        <van-tag type="success">饭</van-tag>
                        <van-tag type="danger">必打卡美食</van-tag>
                    </div>
                </div>
                <div class="data-area">
                    <div class="label">评分</div>
                    <div class="minding">
                        <van-rate v-model="ranking" 
                        readonly color="#ffd21e"
                        void-icon="star"
                        void-color="#eee" />
                    </div>
                </div>
                <div class="data-area">
                    <div class="label">拥挤程度</div>
                    <div class="minding">
                        <van-rate v-model="queue" 
                        readonly color="#ffd21e"
                        void-icon="star"
                        void-color="#eee" />
                    </div>
                </div>
            </div>
            <div class="action-area">
                <van-button @click="handleConform" round block 
                    type="primary" native-type="submit">
                    就你了
                </van-button>
                <div class="divider"></div>
                <van-button round block type="warning" native-type="submit">
                换一个
                </van-button>
            </div>
        </div>
    </div>
    <van-dialog v-model:show="showUsagi" title="享受美食吧" 
        showConfirmButton closeOnClickOverlay
        confirmButtonText="开饭！">
        <img class="usagi-popup" :src="usagiPic" alt="乌萨奇:前途一片美味啊" />
    </van-dialog>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import topFoodPic from '@/assets/result/topFood.png'
import testPic from '@/assets/test/food.png'
import usagiPic from '@/assets/result/usagi.jpg'

const showUsagi = ref(false)
const ranking = ref(1)
const queue = ref(3)

const handleConform = () => {
    showUsagi.value = true
}

</script>

<style lang='less' scoped>
@globalRadius: 12px;
.result-panel{
    background-image: linear-gradient(to right, #e8ecd3, rgb(252, 248, 230));
    z-index: 22;
    overflow: auto;
    .top-pic-frame{
        position: relative;
        width: 180px;
        left: calc(50% - 90px);
        top: 20px;
        z-index: 28;
        img{
            width: 100%;
        }
    }
    .main-frame{
        position: relative;
        top: -10px;
        z-index: 26;
        margin-top: 0px;
        width: 76%;
        left: calc(50% - 38%);
        padding: 15px;
        border-radius: @globalRadius;
        background-color: #fce7d2;
        box-shadow: 0px 0px 10px 0px #0000001a;
        text-align: center;
        .content-area{
            position: relative;
            margin-top: 12px;
            width: 86%;
            left: calc(50% - 43%);
            height: 110px;
            border-radius: @globalRadius;
            background-color: #fcf5e2;
            padding: 15px;
            .main-name{
                position: relative;
                font-size: 38px;
                font-weight: bold;
                color: orangered;
                line-height: calc($font-size + 22px);
            }
            .sub-name{
                position: relative;
                font-size: 22px;
                font-weight: bold;
                color: #352e1b;
                line-height: 30px;
            }
        }
        .pic-area{
            position: relative;
            margin-top: 20px;
            width: 86%;
            left: calc(50% - 43%);
            border-radius: 2px;
            overflow: hidden;
            img{
                position: relative;
                width: 100%;
            }
        }
        .static-area{
            position: relative;
            margin-top: 10px;
            width: 86%;
            left: calc(50% - 43%);
            border-radius: @globalRadius;
            padding: 15px;
            .data-area{
                position: relative;
                margin: 3px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 35px;
                color: #352e1b;
            }
        }
        .action-area{
            position: relative;
            margin-top: 10px;
            width: 86%;
            left: calc(50% - 43%);
        }
    }
}
</style>

<style lang='less' scoped>
@media screen and (max-width: 768px) {
    .result-panel{
        .top-pic-frame{
            width: 150px;
            left: calc(50% - 75px);
            top: 20px;
        }
        .main-frame{
            width: 80%;
        }
    }
}
</style>