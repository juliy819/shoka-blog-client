<!--
 * @description 首页
 * @author juliy
 * @date 2023/4/1 16:02
-->
<template>
  <image-carousel />
  <div class="home-header">
    <brand />
    <waves />
    <!-- 向下按钮 -->
    <svg-icon class="arrow-down" icon-class="down" size="32px" @click="scrollDown" />
  </div>
  <div class="bg">
    <div class="main-container">
      <div class="left-container">
        <talk-swiper v-if="!useAppStore().local" />
        <featured-swiper v-if="!useAppStore().local" />
        <article-list />
      </div>
      <sidebar class="right-container" />
    </div>
  </div>

</template>

<script setup lang="ts">
import ImageCarousel from '@/views/home/ImageCarousel.vue';
import brand from '@/views/home/Brand.vue';
import TalkSwiper from '@/views/home/TalkSwipper.vue';
import FeaturedSwiper from '@/views/home/FeaturedSwiper.vue';
import ArticleList from '@/views/home/ArticleList.vue';
import useAppStore from '@/stores/modules/app';

const scrollDown = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.clientHeight
  });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/mixin";

.home-header {
  @include mixin.flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 10rem;
  color: var(--header-text-color);

  .arrow-down {
    position: absolute;
    bottom: 100px;
    cursor: pointer;
    z-index: 8;
    animation: arrowShake 1.5s ease-out infinite;
    -webkit-animation: arrowShake 1.5s ease-out infinite;
  }
}

// 箭头上下跳动
@keyframes arrowShake {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  30% {
    opacity: .5;
    transform: translateY(25px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>