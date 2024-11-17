<template>
    <div class="login-page">
        <div class="canva-bg">
            <img :src="foodBg" alt="底部食物">
        </div>
    <div class="main-frame">
    <div class="main-text">登录系统后就可以干饭啦</div>
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
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block 
            type="primary" @click="onLogin">
            登录
            </van-button> <br>
            <!-- <van-button round block type="warning" @click="handleReg" >
            没有账号？点击注册
            </van-button> -->
        </div>
        <div class="re-area">
            没有账号？ <a href="/register">立即注册！</a>
        </div>
        <div class="re-area" @click="handleForgetPassword">
            <a href="javascript:void(0)">忘记密码</a>
        </div>
    </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, toRaw } from 'vue';
import router from '@/router';
import axios from 'axios'
import { showFailToast, showToast, showSuccessToast } from 'vant'
import foodBg from '@/assets/food/food.png'
import { showDialog } from 'vant';
import api from '@/config/api/api';
import { dataEncrypt } from '@/utils/crypto';

interface LoginForm {
    username: string,
    password: string
}

const form = ref<LoginForm>({
    username: '',
    password: ''
})

const onLogin = () => {
    const data = toRaw(form.value)
    showToast('登录中...')
    data.password = dataEncrypt(data.password)
    axios.post(api.login,{...data}).then(res => {
        showSuccessToast('登录成功')
        const token = res.data.token
        const userData = res.data.userData
        localStorage.setItem('token',token)
        localStorage.setItem('cert', dataEncrypt(data))
        localStorage.setItem('userData',JSON.stringify(userData))
        router.push('/index')
    }).catch(_ => showFailToast('登录失败'))
}

const handleForgetPassword = () => {
    showDialog({
        title: '忘记密码',
        message: '请提供账号cid，联系系统作者jinch2287@outlook.com请求重置密码',
    })
}

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
        bottom: 10px;
        width: 100%;
        z-index: 1001;
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