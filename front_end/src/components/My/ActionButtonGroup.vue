<template>
    <div class="container_f">
        <button class="icon-button history" @click="navigateToDiary">
            <i class="fa-solid fa-clock"></i>
            <span>干饭日记</span>
        </button>
        <button class="icon-button favorites">
            <i class="fa-solid fa-heart"></i>
            <span>我的收藏</span>
        </button>
        <button class="icon-button later">
            <i class="fa-solid fa-thumbs-down"></i>
            <span>黑名单</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    navigateToDiary() {
      this.$emit('navigate-to-diary')
    }
  }
})
</script>

<style lang="less" scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css');

.container_f {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 150px;
    border-radius: 15px;
    background-color: rgb(255,255, 255);
    padding: 20px;
    margin: 20px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background: none;
    border: none;
}

.icon-button:hover {
    transform: scale(1.1);
}

.icon-button i {
    font-size: 3rem;
    color: rgb(35, 235, 185);
}

.icon-button span {
    margin-top: 20px;
    font-weight: bold;
    font-size: 1rem;
    color: rgba(107, 108, 110,0.8);
}
</style>
