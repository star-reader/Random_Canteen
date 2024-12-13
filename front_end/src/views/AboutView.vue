<template>
  <van-card
    desc="所属区域：泰山区"
    title="芷园"
    thumb="https://tse4-mm.cn.bing.net/th/id/OIP-C.dzg03xD06S69q4enWgsFAQHaFj?rs=1&pid=ImgDetMain"
  >
    <template #tags>
      <van-rate
        v-model="value"
        readonly
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
      />
    </template>
  </van-card>

  <van-tabs v-model:active="active">
    <van-tab title="菜单">
      <div class="floor-tabs">
        <div class="floor-nav">
          <div
            v-for="(floor, index) in floors"
            :key="index"
            class="floor-item"
            :class="{ active: activeFloor === index }"
            @click="changeFloor(index)"
          >
            {{ floor.title }}
          </div>
        </div>
        <div class="floor-content">
          <div
            v-for="(window, windowIndex) in floors[activeFloor].windows"
            :key="windowIndex"
            class="window-container"
          >
            <van-cell
              :title="window.name"
              @click="toggleWindow(windowIndex)"
            >
              <template #icon>
                <img :src="window.image" class="window-image" />
              </template>
              <template #right-icon>
                <van-icon 
                  :name="activeWindows.includes(`${activeFloor}-${windowIndex}`) ? 'arrow-up' : 'arrow-down'"
                  class="window-arrow"
                />
              </template>
            </van-cell>
            <transition :name="showAnimation ? 'slide' : ''">
              <div 
                v-show="activeWindows.includes(`${activeFloor}-${windowIndex}`)"
                class="dishes-container"
              >
                <van-cell
                  v-for="(dish, dishIndex) in window.dishes"
                  :key="dishIndex"
                  :title="dish.name"
                  :label="dish.desc"
                >
                  <template #icon>
                    <img :src="dish.image" class="dish-image" />
                  </template>
                  <template #right-icon>
                    <div class="price-container">
                      <span class="price">{{ dish.price }}</span>
                    </div>
                  </template>
                </van-cell>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </van-tab>
    
    <van-tab title="评价">
      <div class="reviews-container">
        <div 
          v-for="(review, index) in reviews" 
          :key="index"
          class="review-item"
        >
          <div class="review-header">
            <div class="user-info">
              <img :src="review.avatar" class="avatar" />
              <div class="user-details">
                <div class="username">{{ review.username }}</div>
                <div class="time">{{ review.time }}</div>
              </div>
            </div>
            <van-rate 
              v-model="review.rating"
              readonly
              :size="16"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="review-content">
            {{ review.content }}
          </div>
        </div>
      </div>

      <!-- 发布评论按钮 -->
      <div class="comment-button" @click="showCommentForm = true">
        <van-button type="primary" block round icon="edit">
          发布评论
        </van-button>
      </div>

      <!-- 评论表单弹出层 -->
      <van-action-sheet
        v-model:show="showCommentForm"
        title="发表评论"
        :close-on-click-overlay="false"
      >
        <div class="comment-form">
          <div class="rating-section">
            <span class="rating-label">评分：</span>
            <van-rate 
              v-model="newRating"
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <van-field
            v-model="newComment"
            rows="3"
            autosize
            type="textarea"
            placeholder="请输入您的评论..."
            maxlength="200"
            show-word-limit
          />
          <div class="form-buttons">
            <van-button 
              plain 
              round 
              block 
              @click="showCommentForm = false"
              style="margin-right: 10px"
            >
              取消
            </van-button>
            <van-button 
              type="primary" 
              round 
              block 
              @click="submitComment"
            >
              发布
            </van-button>
          </div>
        </div>
      </van-action-sheet>
    </van-tab>

    <van-tab title="饭堂历史">
      饭堂历史
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
const value = ref(3);
const activeFloor = ref(0);
const activeWindows = ref([]);
const showAnimation = ref(true);

const floors = [
  { 
    title: '一楼', 
    windows: [
      { 
        name: '肠粉窗口',
        image: '/window-images/cf.jpg',
        dishes: [
          { 
            name: '猪肉肠', 
            price: '6元', 
            desc: '加蛋外加一元',
            image: '/dish-images/pigcf.jpg'
          },
          { 
            name: '牛肉肠', 
            price: '7元', 
            desc: '加蛋外加一元',
            image: '/dish-images/pigcf.jpg'
          },
          { 
            name: '斋肠', 
            price: '5元', 
            desc: '加蛋外加一元',
            image: '/dish-images/pigcf.jpg'
          },
        ]
      },
      {
        name: '石锅饭窗口',
        image: '/window-images/sgf.jpg',
        dishes: [
          { name: '皮蛋瘦肉粥', price: '8元', desc: '配咸鸭蛋' },
          { name: '白粥', price: '4元', desc: '搭配小菜' },
          { name: '海鲜粥', price: '12元', desc: '配油条' },
        ]
      }
    ]
  },
  { 
    title: '二楼', 
    windows: [
      {
        name: '自选窗口',
        dishes: [
          { name: '四菜一汤', price: '20元', desc: '荤素搭配' },
          { name: '三菜一汤', price: '16元', desc: '可选米饭/馒头' },
        ]
      },
      {
        name: '盖浇饭窗口',
        dishes: [
          { name: '黑椒牛柳饭', price: '18元', desc: '配时蔬' },
          { name: '咖喱鸡排饭', price: '16元', desc: '配玉米' },
        ]
      }
    ]
  },
  { 
    title: '三楼', 
    windows: [
      {
        name: '特色煲仔窗口',
        dishes: [
          { name: '排骨煲', price: '22元', desc: '配时蔬' },
          { name: '鸡煲', price: '20元', desc: '配菜心' },
        ]
      },
      {
        name: '商务套餐窗口',
        dishes: [
          { name: '五菜一汤', price: '25元', desc: '含水果' },
          { name: '四菜一汤', price: '20元', desc: '含饮品' },
        ]
      }
    ]
  }
];

const toggleWindow = (windowIndex) => {
  const windowId = `${activeFloor.value}-${windowIndex}`;
  
  if (activeWindows.value.includes(windowId)) {
    activeWindows.value = activeWindows.value.filter(id => id !== windowId);
  } else {
    activeWindows.value = [windowId];
  }
};

const changeFloor = (index) => {
  showAnimation.value = false;
  activeFloor.value = index;
  activeWindows.value = [];
  setTimeout(() => {
    showAnimation.value = true;
  }, 0);
};

// 添加评价数据
const reviews = [
  {
    avatar: '/avatars/usagi.jpg',  // 头像图片路径
    username: '张同学',
    time: '2024-03-20 12:30',
    content: '饭菜很新鲜，特别是石锅饭，米饭很香！服务态度也不错。',
    rating: 5
  },
  {
    avatar: '/avatars/usagi.jpg',
    username: '李同学',
    time: '2024-03-19 18:45',
    content: '环境整洁，价格实惠。就是高峰期要排队，建议错峰就餐。',
    rating: 4
  },
  {
    avatar: '/avatars/usagi.jpg',
    username: '王同学',
    time: '2024-03-18 13:15',
    content: '肠粉很好吃，每次来都必点！希望能多加些新品。',
    rating: 5
  }
];

// 添加评论相关的状态
const showCommentForm = ref(false);
const newComment = ref('');
const newRating = ref(5);

// 添加发布评论的方法
const submitComment = () => {
  if (!newComment.value.trim()) {
    // 使用 vant 的 Toast 提示
    Toast('请输入评论内容');
    return;
  }

  // 创建新评论
  const comment = {
    avatar: '/avatars/default.jpg',  // 默认头像
    username: '匿名用户',
    time: new Date().toLocaleString(),
    content: newComment.value,
    rating: newRating.value
  };

  // 添加到评论列表
  reviews.unshift(comment);
  
  // 重置表单
  newComment.value = '';
  newRating.value = 5;
  showCommentForm.value = false;
};
</script>

<style scoped>
.floor-tabs {
  display: flex;
  border: 1px solid #ebedf0;
  border-radius: 8px;
  overflow: hidden;
  margin: 8px;
  height: calc(100vh - 160px);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 10px;
}

.floor-nav {
  width: 80px;
  background-color: #f7f8fa;
  border-right: 1px solid #ebedf0;
  overflow-y: auto;
  padding: 0;
}

.floor-item {
  padding: 16px 8px;
  font-size: 16px;
  color: #646566;
  text-align: center;
  position: relative;
  border-left: none;
}

.floor-item.active {
  color: #1989fa;
  background-color: #fff;
  border-left: none;
}

.floor-item.active::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: #1989fa;
  border-radius: 0;
  transform: none;
}

.floor-content {
  flex: 1;
  background-color: #fff;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  box-sizing: border-box;
  padding-right: 0;
}

.price-container {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.price {
  color: #ee0a24;
  font-size: 18px;
  font-weight: bold;
  min-width: 60px;
  text-align: right;
  display: inline-block;
}

:deep(.van-cell) {
  padding: 12px 10px;
  align-items: center;
  min-height: 120px;
}

:deep(.van-cell__title) {
  font-size: 20px;
  font-weight: 500;
}

:deep(.van-cell__label) {
  color: #969799;
  font-size: 14px;
  line-height: 1.5;
}

.window-container {
  margin-bottom: 8px;
}

.dishes-container {
  background-color: #f7f8fa;
  padding: 4px 8px;
  transform-origin: top;
  will-change: transform, opacity, max-height;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

:deep(.dishes-container .van-cell) {
  padding: 10px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  transform: translateZ(0);
}

/* 移除不需要的样式 */
.window-header,
.window-header .van-icon,
.window-header span {
  display: none;
}

/* 修改过渡动画样式 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  max-height: 2000px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.window-arrow {
  color: #969799;
  font-size: 18px;
  transition: transform 0.3s;
}

.window-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-right: 10px;
  object-fit: cover;
}

.dish-image {
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-right: 10px;
  object-fit: cover;
}

/* 修改窗口标题大小 */
:deep(.van-cell__title span) {
  font-size: 18px;
  font-weight: 500;
}

/* 修改菜品标题大小 */
:deep(.dishes-container .van-cell__title span) {
  font-size: 16px;
}

/* 修改菜品描述小 */
:deep(.dishes-container .van-cell__label span) {
  font-size: 14px;
}

/* 修改滚动条样式，使其悬浮在内容上方 */
.floor-content::-webkit-scrollbar,
.dishes-container::-webkit-scrollbar {
  width: 4px;
  background: transparent;
  position: absolute;
  right: 0;
}

.floor-content::-webkit-scrollbar-thumb,
.dishes-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

/* 添加滚动条容器样式 */
.floor-content,
.dishes-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}

.reviews-container {
  padding: 16px;
  background-color: #f7f8fa;
  min-height: calc(100vh - 200px);
}

.review-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  margin-bottom: 4px;
}

.time {
  font-size: 12px;
  color: #969799;
}

.review-content {
  font-size: 14px;
  color: #323233;
  line-height: 1.5;
}

.comment-button {
  position: fixed;
  bottom: 56px;
  left: 16px;
  right: 16px;
  z-index: 99;
}

.comment-form {
  padding: 16px;
}

.rating-section {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.rating-label {
  margin-right: 8px;
  font-size: 14px;
  color: #323233;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
}

/* 确保评论列表不会被按钮遮挡 */
.reviews-container {
  padding-bottom: 80px;
}
</style>
