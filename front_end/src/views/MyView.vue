<template>
    <div class="page-wrapper my-view">
        <ProfileHeader />
        <div class="back">
            <ActionButtonGroup @navigate-to-diary="navigateToDiary" />
            <ServiceMenu />
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
html, body {
    overflow: hidden;
}

.back {
    background-color: rgb(245, 245, 245);
    width: 100%; 
    height: 300px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
