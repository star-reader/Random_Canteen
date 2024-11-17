<template>
    <div class="login-page">
        <div class="canva-bg">
            <img :src="foodBg" alt="底部食物">
        </div>
    <div class="main-frame">
    <div class="main-text">注册系统</div>
        <van-form @submit="onSubmit">
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
            <van-button round block type="primary" native-type="submit">
            注册
            </van-button> <br>
            <!-- <van-button round block type="warning" @click="handleLogin" >
            已有账号？立即登录
            </van-button> -->
        </div>
        <div class="re-area">
            已有账号？ <a href="/login">立即登录</a>
        </div>
        </van-form>
    </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import foodBg from '@/assets/food/food.png'
import router from '@/router';

interface LoginForm {
    username: string,
    password: string
}

const form = ref<LoginForm>({
    username: '',
    password: ''
})

const onSubmit = (values: LoginForm) => {
    console.log('submit', values)
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