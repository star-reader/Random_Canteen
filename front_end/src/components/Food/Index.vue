<template>
    <div class="page-wrapper index-page">
        <div class="main-title">
            <div class="text cute-font">今日食堂盛宴 <br> 等你来选!</div>
            <img :src="TextBg" alt="背景条幅">
        </div>
        <div class="option-title">
            <div class="text">换个口味？点我更改喜好→</div>
            <img :src="actionBg" alt="选择按钮背景">
        </div>
        <div class="action-button">
            <div class="text-area">
                选择
            </div>
        </div>
        <!-- <div class="canva-bg">
            <img :src="foodBg" alt="底部食物">
        </div> -->
        <PreferenceSelector />
        <Result />
    </div>
</template>

<script lang='ts' setup>
import PreferenceSelector from './PreferenceSelector.vue'
import Result from './Result.vue'

import TextBg from '@/assets/food/topBar.png'
import actionBg from '@/assets/food/actionBar.png'
import foodBg from '@/assets/food/food.png'

</script>

<style lang='less' scoped>
.index-page{
    background-image: url('../../assets/food/pageBackground.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: top;
    transition: background 1s ease-in-out;
}
.main-title{
    position: relative;
    margin-top: 60px;
    width: 100%;
    height: 60px;
    user-select: none;
    .text{
        position: relative;
        width: 100%;
        line-height: 55px;
        font-size: 9.2vw;
        font-weight: bold;
        background-image: linear-gradient(to right, #f4f816, #f5cc18); 
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        z-index: 20;
    }
    img{
        // 精准定位
        position: relative;
        top: -138px;
        left: -10px;
        width: 106%;
        height: 165px;
        z-index: 5;
    }
}
.option-title{
    position: relative;
    margin-top: 150px;
    font-size: 5vw;
    width: 100%;
    height: 90px;
    text-align: center;
    transition-duration: 0.25s;
    user-select: none;
    .text{
        position: relative;
        width: 100%;
        height: 40px;
        line-height: $height;
        //background: linear-gradient(to right, #1994f8, #6666ff, #9999ff);
        background: linear-gradient(to right, #051a5c, #1e1d20, #0c0c0c);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        z-index: 20;
    }
    img{
        // 精准定位
        position: relative;
        top: -55px;
        width: 80%;
        height: 65px;
        z-index: 5;
        filter: opacity(0.83) hue-rotate(137deg);
    }
    &:hover{
        img{
            filter: opacity(1) hue-rotate(142deg);
        }
    }
}
.action-button{
    position: relative;
    margin-top: 0px;
    width: 60vw;
    height: $width;
    left: calc(50% - 30vw);
    border-radius: 50%;
    overflow: hidden;
    background-image: url('../../assets/food/indexBg.png');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .text-area{
        position: relative;
        font-size: 18vw;
        font-weight: bold;
        font-style: italic;
        color: rgb(255, 91, 15);
        text-shadow: 1px 1px orange, -1px -1px orange, 1px -1px orange, -1px 1px orange;
    }
}
.canva-bg{
    position: absolute;
    left: 0;
    bottom: 50px;
    width: 100%;
    z-index: 2;
    img{
        position: relative;
        width: 100%;
        height: 100%;
        filter: opacity(0.5);
    }
}
</style>