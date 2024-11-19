<template>
    <div class="page-wrapper my-view">
        <ProfileHeader />
        <div class="back">
            <ActionButtonGroup @navigate-to-diary="navigateToDiary" />
            <ServiceMenu />
        </div>
        <div class="attribute">
            版本 v1.2.5 (public beta) &nbsp;&nbsp; 上次更新：2024-11-19 <br/>
            Copyright &copy; 不想排队@华农er今天吃什么 <br/>
            2024-2024 All Rights Reserved
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ProfileHeader from '@/components/My/ProfileHeader.vue'
import ActionButtonGroup from '@/components/My/ActionButtonGroup.vue'
import ServiceMenu from '@/components/My/ServiceMenu.vue'

export default defineComponent({
  components: {
    ProfileHeader,
    ActionButtonGroup,
    ServiceMenu
  },
  setup() {
    const router = useRouter()

    const navigateToDiary = () => {
      router.push({ name: 'Diary' })
    }

    return {
      navigateToDiary
    }
  }
})
</script>

<style lang="less" scoped>

.back {
  background-color: rgb(245, 245, 245);
  width: 100%; 
  height: 300px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.attribute{
  margin-top: 20px;
  font-size: 15px;
  color: #333;
  text-align: center;
  user-select: none;
  line-height: 26px;
}
</style>
