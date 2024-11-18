<template>
    <div class="login-page">
        <div class="canva-bg">
            <img :src="foodBg" alt="底部食物">
        </div>
    <div class="main-frame">
    <div class="main-text">注册系统</div>
        <van-cell-group inset>
            <van-field
            v-model="form.username"
            name="Username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field v-model="code" center clearable label="验证码" placeholder="">
                <template #button>
                    <Verification :identifyCode="realCode" @click="refreshCode"></Verification>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary"
            native-type="submit" @click='onSubmit'>
            注册
            </van-button> <br>
            <!-- <van-button round block type="warning" @click="handleLogin" >
            已有账号？立即登录
            </van-button> -->
        </div>
        <div class="re-area">
            已有账号？ <a href="/login">立即登录</a>
        </div>
    </div>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, toRaw } from 'vue';
import Verification from '@/components/common/Verification.vue';
import foodBg from '@/assets/food/food.png'
import router from '@/router';
import { showFailToast, showSuccessToast, showToast } from 'vant';
import axios from 'axios';
import api from '@/config/api/api';
import { dataEncrypt } from '@/utils/crypto';

interface LoginForm {
    username: string,
    password: string
}

const identifyCodes = "1234567890abcdefjhijklinopqrsduvwxyz"
const code = ref('')
let realCode = ref('')

const form = ref<LoginForm>({
    username: '',
    password: ''
})

const onSubmit = () => {
    if (code.value !== realCode.value){
        refreshCode()
        return showToast('验证码错误')
    }
    const data = toRaw(form.value)
    data.password = dataEncrypt(data.password)
    showToast('注册中')
    axios.post(api.register, data).then(res => {
        showSuccessToast('注册成功！')
        router.push('/login')
    }).catch(_ => showFailToast('注册失败！用户已存在'))
}

const refreshCode = () => {
    realCode.value = "";
    makeCode(identifyCodes, 4);
}
    //获取验证码的值
const makeCode = (o: string, l: number) => {
    for (let i = 0; i < l; i++) {
        //通过循环获取字符串内随机几位
        realCode.value += identifyCodes[randomNum(0, identifyCodes.length)]
    }
}
    //随机数字：用于当角标拿字符串的值
const randomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min)
}

onMounted(() => {
    refreshCode()
})


</script>

<style lang='less' scoped>
.login-page{
    position: absolute;
    left: 0;
    height: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: white;
    .canva-bg{
        position: absolute;
        left: 0;
        bottom: 60px;
        width: 100%;
        z-index: 1002;
        img{
            position: relative;
            width: 100%;
            height: 100%;
            filter: opacity(0.5);
        }
    }
}
.main-frame{
    position: relative;
    width: 90%;
    left: 5%;
    margin-top: 200px;
    background-color: white;
    z-index: 1002;
    .main-text{
        position: relative;
        margin-left: 20px;
        font-size: 24px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
        user-select: none;
    }
    .re-area{
        position: relative;
        margin-top: 10px;
        font-size: 14px;
        color: #666666;
        text-align: center;
        a{
            color: #1989fa;
            text-decoration: none;
            font-weight: 700;
        }
    }
}
</style>