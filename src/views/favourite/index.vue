<!--
 * @description 收藏夹
 * @author juliy
 * @date 2023/6/22 17:08
-->
<template>
  <div class="page-header">
    <h1 class="page-title">收藏夹</h1>
    <img :src="bgImage" alt="" class="page-cover">
    <waves />
  </div>
  <div class="bg">
    <div class="page-container">
      <load-viewer :status="status" failed-msg="收藏加载失败" no-data-msg="暂时还没有收藏哦~">
        <template #data>
          <div v-for="(classify, index) in classifyList" :key="index">
            <h2 class="favourite-classify">
              {{ classify.classify }}
            </h2>
            <n-grid class="favourite-item-wrapper" cols="1 s:2 m:3 l:4" responsive="screen" x-gap="15" y-gap="15">
              <n-grid-item v-for="(favourite, index) in classify.favouriteList" :key="index"
                           class="favourite-item" @click="toUrl(favourite.url)">
                <!-- 图标处理，分svg、链接和无图标 -->
                <svg v-if="favourite.icon.startsWith('svg')" class="favourite-item-image"
                     :viewBox="parseSVG(favourite.icon, /\/viewBox:(.*?)\//)">
                  <path :d="parseSVG(favourite.icon, /\/d:(.*)/)"
                        :fill="parseSVG(favourite.icon, /\/fill:(.*?)\//)" />
                </svg>
                <svg-icon v-else-if="favourite.icon === ''" icon-class="favourite" size="3.75rem"
                          class="favourite-item-image" />
                <img v-else :src="favourite.icon" alt="" class="favourite-item-image" />
                <div class="favourite-item-info">
                  <div class="favourite-item-title">
                    {{ favourite.title }}
                  </div>
                  <div class="favourite-item-desc">
                    {{ favourite.description }}
                  </div>
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </template>
        <template #loading>
          <div v-for="index in [1, 2]" :key="index">
            <n-skeleton height="1.5rem" width="10rem" round class="mb20" />
            <n-grid class="favourite-item-wrapper" cols="1 s:2 m:3 l:4" responsive="screen" x-gap="15" y-gap="15">
              <n-grid-item class="favourite-item" v-for="index in [1, 2, 3, 4, 5, 6, 7, 8]" :key="index">
                <n-skeleton class="favourite-item-image" />
                <div class="favourite-item-info">
                  <n-skeleton height="1.25rem" width="5rem" round class="mb5" />
                  <n-skeleton height="2.5rem" width="calc(100% - 0.75rem)" round />
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </template>
      </load-viewer>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import favouriteApi from '@/api/favourite';
import { getRandomBgImage, toUrl } from '@/utils/common';
import type { FavouriteClassify } from '@/api/favourite/types';

const bgImage = getRandomBgImage();
const status = ref<number>(0);
const classifyList = ref<FavouriteClassify[]>([]);

/**
 * 图标转化
 * @param icon 图标
 * @param regx 正则
 */
const parseSVG = (icon: string, regx: RegExp): string | null => {
  const match = icon.match(regx);
  return match ? match[1] : null;
};

onMounted(() => {
  favouriteApi.getFavouriteList().then(({ data }) => {
    classifyList.value = data.data;
    if (classifyList.value.length > 0) {
      status.value = 1;
    } else {
      status.value = 2;
    }
  }).catch(() => {status.value = -1;});
});

</script>

<style lang='scss' scoped>
.favourite-classify, .favourite-item-wrapper {
  margin-bottom: 1.25rem;
  color: var(--grey-6);
}

.favourite-item {
  line-height: 1.0625rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 5.625rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  border-radius: 0.75rem;
  background-color: var(--grey-1);
  box-shadow: var(--shadow-2);
  animation: jackInTheBox 1s ease-in-out;

  .favourite-item-image {
    width: 3.75rem;
    height: 3.75rem;
    margin: 0.9375rem 1.25rem 0.9375rem 0.9375rem;
    transition: 0.3s ease-in-out;
    border-radius: 0.75rem;
  }

  .favourite-item-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 5.625rem);

    .favourite-item-title {
      font-size: 1.1875rem;
      font-weight: 700;
      line-height: 2rem;
      overflow: hidden;
      max-width: calc(100% - 0.75rem);
      padding: 0 0.625rem 0 0;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .favourite-item-desc {
      font-size: 0.9rem;
      display: -webkit-box;
      overflow: hidden;
      height: 2.5rem;
      padding: 0.3125rem 0.625rem 1rem 0;
      text-align: left;
      white-space: normal;
      text-overflow: ellipsis;
      opacity: 0.7;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &:hover {
    background: var(--color-blue);
    color: var(--color-white-dark);

    .favourite-item-image {
      margin: 0.5rem;
      width: 0;
      height: 0;
      opacity: 0;
      filter: alpha(opacity=0);
    }

    .favourite-item-info {
      min-width: calc(100% - 1.25rem);
    }
  }
}
</style>
