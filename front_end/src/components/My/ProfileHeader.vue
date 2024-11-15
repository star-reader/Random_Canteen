<template>
    <div class="background">
        <div class="profile">
            <img src="../../assets/my/profileheader.jpg" class="head-portrait" alt="User Profile Picture">
            <div class="name">用户名</div> <!-- 添加用户名 -->
        </div>
    </div>
</template>

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
    font-size: 1.2em; 
    color: #fff; 
}
</style>
