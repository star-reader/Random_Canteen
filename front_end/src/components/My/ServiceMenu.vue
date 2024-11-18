<template>
    <div class="services-menu">
        <ul>
            <li @click="logOut">
                <a href="javascript:void(0)">
                    <img src="../../assets/my/退出登陆.png" alt="退出登录图标">
                    <span>退出登录 ></span>
                </a>
            </li>
            <!-- <li>
                <a href="#">
                    <img src="../../assets/my/回到桌面.png" alt="回到桌面图标">
                    <span>回到桌面 ></span>
                </a>
            </li> -->
        </ul>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { showConfirmDialog } from 'vant';


const logOut = () => {
    showConfirmDialog({
        title: '提示',
        message:'确认要退出登录？',
        confirmButtonText:'退出登录',
        confirmButtonColor: 'orangered',
        cancelButtonText:'取消'
    }).then(() => {
        // on confirm
        localStorage.removeItem('cert')
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
        router.push('/login')
    })
}

</script>

<style lang="less" scoped>
.services-menu {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 400px;
    border-radius: 15px;
    ul{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    li{
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eaeaea;
        position: relative;
    }
    img{
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
    span{
        font-size: 18px;
        position: absolute;
        right: 10px; 
        top: 50%; 
        transform: translateY(-50%); 
    }
    a{
        font-size: 15px;
        color: gray;
        font-weight: bold;
    }
}
</style>
