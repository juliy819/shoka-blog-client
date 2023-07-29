<!--
 * @description 首页图片轮播
 * @author juliy
 * @date 2023/4/1 16:02
-->
<template>
  <div class="imgs">
    <ul>
      <li class="item" v-for="(item, index) in imageList" :key="index"
          :style="{ 'background-image': 'url(' + item + ')' }" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import bg1 from '@/assets/images/bg/bg-1.jpg';
import bg2 from '@/assets/images/bg/bg-2.jpg';
import bg3 from '@/assets/images/bg/bg-3.jpg';
import bg4 from '@/assets/images/bg/bg-4.jpg';
import bg5 from '@/assets/images/bg/bg-5.jpg';
import bg6 from '@/assets/images/bg/bg-6.jpg';

const imageList = [bg1, bg2, bg3, bg4, bg5, bg6];
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixin';

.imgs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -9;
  background-color: #363636;
  overflow: hidden;

  .item {
    @include mixin.absolute;
    width: 100%;
    height: 100%;
    background: no-repeat 50% 50% / cover;
    opacity: 0;
    animation: imageAnimation 36s linear infinite 0s;
    backface-visibility: hidden;
    transform-style: preserve-3d;

    &:nth-child(2) {
      animation-delay: 6s;
    }

    &:nth-child(3) {
      animation-delay: 12s;
    }

    &:nth-child(4) {
      animation-delay: 18s;
    }

    &:nth-child(5) {
      animation-delay: 24s;
    }

    &:nth-child(6) {
      animation-delay: 30s;
    }

    // 变暗的遮罩层
    &::before {
      @include mixin.absolute;
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .2);
      transition: all .2s ease-in-out 0s;
    }
  }
}

// 轮播动画
@keyframes imageAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }

  2% {
    opacity: 1;
  }

  8% {
    opacity: 1;
    transform: scale(1.05);
    animation-timing-function: ease-out;
  }

  17% {
    opacity: 1;
    transform: scale(1.1);
  }

  25% {
    opacity: 0;
    transform: scale(1.1);
  }

  100% {
    opacity: 0;
  }
}

</style>