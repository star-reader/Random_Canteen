<template>
    <div class="background">
        <div class="profile">
            <img :src="user.avatar" class="head-portrait" alt="User Profile Picture">
            <div class="name">{{  user.username }}</div> <!-- 添加用户名 -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import useUserInfo from '@/hooks/useUserInfo';
import { ref } from 'vue';


const user = ref(useUserInfo())

</script>

<style lang="less" scoped>
.background {
    width: 100%; 
    height: 25vh; 
    background-image: url('../../assets/my/backgound.jpg'); 
    background-size: cover; 
    background-position: center; 
    display: flex; 
    justify-content: flex-start;
    align-items: center; 
    padding: 10px;
}

.profile {
    display: flex;
    align-items: center; 
}

.head-portrait {
    width: 80px;
    height: 80px;
    border-radius: 50%; 
    object-fit: cover; 
    border: 2px solid rgb(255, 255, 255);
    margin-right: 15px; 
}

.name {
    font-size: 1.65em; 
    color: #fff;
    font-weight: bold;
}
</style>
