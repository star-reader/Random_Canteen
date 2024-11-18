<template>
    <div class="background">
        <div class="profile">
            <img :src="user.avatar ? user.avatar : 'https://api.usagi-jin.top/ImageAPI/avatar/usagi.jpg'" class="head-portrait" alt="User Profile Picture" @click="changeAvatar">
            <div class="name">{{  user.username }}</div> <!-- 添加用户名 -->
            <input type="file" hidden aria-hidden="true" name="avatarUpload"
             accept="image/*" @change="uploadFile" ref="uploadInput">
        </div>
    </div>
</template>

<script lang="ts" setup>
import api from '@/config/api/api';
import useUserInfo from '@/hooks/useUserInfo';
import createHeader from '@/utils/createHeader';
import randomString from '@/utils/randomString';
import axios from 'axios';
import { showFailToast, showSuccessToast } from 'vant';
import { ref } from 'vue'

const uploadInput = ref<HTMLElement | null>(null)

const user = ref(useUserInfo())

const changeAvatar = () => {
    uploadInput.value?.click()
}

const uploadFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file: File | undefined = target.files?.[0];
    if (file) {
        if (file.size > 3351601){
        return showFailToast('头像文件过大')
        }
        if (file.type.indexOf('image/') == -1){
            return showFailToast('请选择图片格式的文件')
        }
        axios.post(`${api.avatarFile}?storeKey=${randomString(16)}`,file, {'headers': createHeader()}).then(async res => {
            await axios.post(api.uploadAvatar,{'url': res.data.file, 'key-pair-id': res.data['key-pair-id']}, {'headers': createHeader()})
            user.value.avatar = res.data.file
            return showSuccessToast('上传成功')
        }).catch(_ => showFailToast('上传失败'))
    }
}

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
