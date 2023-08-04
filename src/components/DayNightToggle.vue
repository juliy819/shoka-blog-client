<!--
 * @description 白天/黑夜切换按钮
 * @author juliy
 * @date 2023/7/6 23:28
-->
<template>
  <div class="components">
    <!-- 按钮主体(圆) -->
    <div class="main-button" ref="mainButton">
      <!-- 月亮层 -->
      <div class="moon" ref="moon">
        <!-- 月亮上的陨石坑 -->
        <div class="moon-hole"></div>
        <div class="moon-hole"></div>
        <div class="moon-hole"></div>
      </div>
    </div>
    <!-- 三个层次的光晕波纹 -->
    <div class="halo"></div>
    <div class="halo"></div>
    <div class="halo"></div>
    <!-- 所有的云 -->
    <div class="cloud">
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <!-- 云的虚影 -->
    <div class="cloud-light">
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
      <div class="cloud-son"></div>
    </div>
    <!-- 所有星星，每一个星星由四个div拼合而成 -->
    <div class="stars">
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star big">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star medium">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
      <div class="star small">
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
        <div class="star-son"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useDark } from '@vueuse/core';
import { useToggle } from '@vueuse/shared';

const isDark = useDark({
  selector: 'html',
  attribute: 'theme',
  valueDark: 'dark',
  valueLight: 'light'
});
const toggle = useToggle(isDark);

const isClicked = ref(false); // 跟踪是否刚刚发生了鼠标点击事件

const $ = (s: string) => {
  let dom = document.querySelectorAll(s);
  return dom.length == 1 ? dom[0] : dom;
};

onMounted(() => {
  const components = $('.components') as HTMLElement;
  const mainButton = $('.main-button') as HTMLElement;
  const halo = $('.halo') as NodeListOf<HTMLElement>;
  const cloud = $('.cloud') as HTMLElement;
  const cloudLight = $('.cloud-light') as HTMLElement;
  const cloudList = $('.cloud-son') as NodeListOf<HTMLElement>;
  const moon = $('.moon') as HTMLElement;
  const stars = $('.stars') as HTMLElement;
  const star = $('.star') as NodeListOf<HTMLElement>;

  // 切换至白天
  const changeToDay = () => {
    // 太阳左移
    mainButton.style.transform = 'translateX(0)';
    // 云朵上升-云朵显示
    halo[0].style.transform = 'translateX(0)';
    halo[1].style.transform = 'translateX(0)';
    halo[2].style.transform = 'translateX(0)';
    cloud.style.transform = 'translateY(10px)';
    cloudLight.style.transform = 'translateY(10px)';
    components.style.backgroundColor = 'rgba(70, 133, 192,1)';
    // 月亮右移-月亮隐藏
    moon.style.opacity = '0';
    moon.style.transform = 'translateX(55px)';
    // 星星上升-星星隐藏
    stars.style.transform = 'translateY(-125px)';
    stars.style.opacity = '0';
  };

  // 切换至夜晚
  const changeToNight = () => {
    // 太阳右移
    mainButton.style.transform = 'translateX(100px)';
    // 云朵下降-云朵隐藏
    halo[0].style.transform = 'translateX(110px)';
    halo[1].style.transform = 'translateX(80px)';
    halo[2].style.transform = 'translateX(50px)';
    cloud.style.transform = 'translateY(80px)';
    cloudLight.style.transform = 'translateY(80px)';
    components.style.backgroundColor = 'rgba(25,30,50,1)';
    //月亮左移不透明-月亮显示
    moon.style.opacity = '1';
    moon.style.transform = 'translateX(-55px)';
    //星星下降-星星显示
    stars.style.transform = 'translateY(-62.5px)';
    stars.style.opacity = '1';
  };

  // 检测是否为黑夜状态
  if (isDark.value) {
    changeToNight();
  }

  // 点击事件
  mainButton.addEventListener('click', function () {
    if (isDark.value) {
      changeToDay();
    } else {
      changeToNight();
    }
    // 检测鼠标是否点击,默认已经点击
    isClicked.value = true;
    // 计时器，当0.5秒后，点击状态变成非点击
    setTimeout(function () {
      isClicked.value = false;
    }, 500);
    // 切换状态
    toggle();
  });

  // 鼠标移入事件
  mainButton.addEventListener('mousemove', function () {
    // 当按钮为点击状态时，退出
    if (isClicked.value) {
      return;
    }
    if (isDark.value) {
      // 按钮和背后的虚影向左平移10像素
      mainButton.style.transform = 'translateX(90px)';
      halo[0].style.transform = 'translateX(100px)';
      halo[1].style.transform = 'translateX(73px)';
      halo[2].style.transform = 'translateX(46px)';
      // 星星向外扩散
      star[0].style.top = '10px';
      star[0].style.left = '36px';
      star[1].style.top = '40px';
      star[1].style.left = '87px';
      star[2].style.top = '26px';
      star[2].style.left = '16px';
      star[3].style.top = '38px';
      star[3].style.left = '63px';
      star[4].style.top = '20.5px';
      star[4].style.left = '72px';
      star[5].style.top = '51.5px';
      star[5].style.left = '35px';
    } else {
      // 按钮和背后的虚影向右平移10像素
      mainButton.style.transform = 'translateX(10px)';
      halo[0].style.transform = 'translateX(10px)';
      halo[1].style.transform = 'translateX(7px)';
      halo[2].style.transform = 'translateX(4px)';
      // 云层外扩
      cloudList[0].style.right = '-24px';
      cloudList[0].style.bottom = '10px';
      cloudList[1].style.right = '-12px';
      cloudList[1].style.bottom = '-27px';
      cloudList[2].style.right = '17px';
      cloudList[2].style.bottom = '-43px';
      cloudList[3].style.right = '46px';
      cloudList[3].style.bottom = '-39px';
      cloudList[4].style.right = '70px';
      cloudList[4].style.bottom = '-65px';
      cloudList[5].style.right = '109px';
      cloudList[5].style.bottom = '-54px';
      cloudList[6].style.right = '-23px';
      cloudList[6].style.bottom = '10px';
      cloudList[7].style.right = '-11px';
      cloudList[7].style.bottom = '-26px';
      cloudList[8].style.right = '18px';
      cloudList[8].style.bottom = '-42px';
      cloudList[9].style.right = '47px';
      cloudList[9].style.bottom = '-38px';
      cloudList[10].style.right = '74px';
      cloudList[10].style.bottom = '-64px';
      cloudList[11].style.right = '110px';
      cloudList[11].style.bottom = '-55px';
    }
  });

  // 鼠标移出事件
  mainButton.addEventListener('mouseout', function () {
    // 当按钮为点击状态时，退出
    if (isClicked.value) {
      return;
    }
    if (isDark.value) {
      // 按钮和背后的虚影向右平移10像素
      mainButton.style.transform = 'translateX(100px)';
      halo[0].style.transform = 'translateX(110px)';
      halo[1].style.transform = 'translateX(80px)';
      halo[2].style.transform = 'translateX(50px)';
      // 星星归位
      star[0].style.top = '11px';
      star[0].style.left = '39px';
      star[1].style.top = '39px';
      star[1].style.left = '91px';
      star[2].style.top = '26px';
      star[2].style.left = '19px';
      star[3].style.top = '37px';
      star[3].style.left = '66px';
      star[4].style.top = '21px';
      star[4].style.left = '75px';
      star[5].style.top = '51px';
      star[5].style.left = '38px';
    } else {
      // 按钮和背后的虚影向左平移10像素
      mainButton.style.transform = 'translateX(0px)';
      halo[0].style.transform = 'translateX(0px)';
      halo[1].style.transform = 'translateX(0px)';
      halo[2].style.transform = 'translateX(0px)';
      // 云层归位
      cloudList[0].style.right = '-20px';
      cloudList[0].style.bottom = '10px';
      cloudList[1].style.right = '-10px';
      cloudList[1].style.bottom = '-25px';
      cloudList[2].style.right = '20px';
      cloudList[2].style.bottom = '-40px';
      cloudList[3].style.right = '50px';
      cloudList[3].style.bottom = '-35px';
      cloudList[4].style.right = '75px';
      cloudList[4].style.bottom = '-60px';
      cloudList[5].style.right = '110px';
      cloudList[5].style.bottom = '-50px';
      cloudList[6].style.right = '-20px';
      cloudList[6].style.bottom = '10px';
      cloudList[7].style.right = '-10px';
      cloudList[7].style.bottom = '-25px';
      cloudList[8].style.right = '20px';
      cloudList[8].style.bottom = '-40px';
      cloudList[9].style.right = '50px';
      cloudList[9].style.bottom = '-35px';
      cloudList[10].style.right = '75px';
      cloudList[10].style.bottom = '-60px';
      cloudList[11].style.right = '110px';
      cloudList[11].style.bottom = '-50px';
    }
  });
});

</script>

<style scoped lang='scss'>
// 最外层元素样式
.components {
  position: relative;
  width: 180px;
  height: 70px;
  background-color: rgba(70, 133, 192, 1);
  border-radius: 100px;
  // 按钮的内阴影,实现立体感
  box-shadow: inset 0 0 5px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: 0.7s;
  // 过渡时间贝塞尔曲线,实现非线性动画
  transition-timing-function: cubic-bezier(0, 0.5, 1, 1);
}

// 主要按钮样式
.main-button {
  position: relative;
  margin: 7.5px 0 0 12.5px;
  width: 55px;
  height: 55px;
  background-color: rgba(255, 195, 35, 1);
  border-radius: 50%;
  overflow: hidden;
  // 从上到下依次是: 底部阴影、内部右下阴影、内部右上阴影
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
  inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
  inset 4px 5px 2px -2px rgba(255, 230, 80, 1);
  cursor: pointer;
  transition: 1s;
  // 回弹动画
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1);
  z-index: 1;
}

.moon {
  position: absolute;
  left: 55px;
  width: 55px;
  height: 55px;
  background-color: rgba(195, 200, 210, 1);
  border-radius: 50%;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5),
  inset -3px -5px 3px -3px rgba(0, 0, 0, 0.5),
  inset 4px 5px 2px -2px rgb(222, 227, 237);
}

// 陨石坑样式
.moon-hole {
  position: absolute;
  background-color: rgba(150, 160, 180, 1);
  box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  transition: 0.5s;
}

// 第一个陨石坑
.moon-hole:nth-child(1) {
  top: 7.5px;
  left: 25px;
  width: 12.5px;
  height: 12.5px;
}

// 第二个陨石坑
.moon-hole:nth-child(2) {
  top: 20px;
  left: 7.5px;
  width: 20px;
  height: 20px;
}

// 第三个陨石坑
.moon-hole:nth-child(3) {
  top: 32.5px;
  left: 32.5px;
  width: 12.5px;
  height: 12.5px;
}

// 三个层次的光晕波纹
.halo {
  position: absolute;
  border-radius: 50%;
  transition: 1s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1);
}

// 第一层光晕
.halo:nth-child(2) {
  top: -20px;
  left: -20px;
  width: 110px;
  height: 110px;
  background-color: rgba(255, 255, 255, 0.2);
}

// 第二层光晕
.halo:nth-child(3) {
  top: -32.5px;
  left: -17.5px;
  width: 135px;
  height: 135px;
  background-color: rgba(255, 255, 255, 0.1);
}

// 第三层光晕
.halo:nth-child(4) {
  top: -45px;
  left: -15px;
  width: 160px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.05);
}

// 云和云层虚影的初始位置
.cloud,
.cloud-light {
  transform: translateY(10px);
  transition: 1s;
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1);
}

// 云和虚影统一样式
.cloud-son {
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 6s, right 1s, bottom 1s;
}

// 云和虚影由6个圆形组成，第1个圆形和第7个圆形大小相同
.cloud-son:nth-child(6n + 1) {
  right: -20px;
  bottom: 10px;
  width: 50px;
  height: 50px;
}

// 云和虚影由6个圆形组成，第2个圆形和第8个圆形大小相同
.cloud-son:nth-child(6n + 2) {
  right: -10px;
  bottom: -25px;
  width: 60px;
  height: 60px;
}

// 云和虚影由6个圆形组成，第3个圆形和第9个圆形大小相同
.cloud-son:nth-child(6n + 3) {
  right: 20px;
  bottom: -40px;
  width: 60px;
  height: 60px;
}

// 云和虚影由6个圆形组成，第4个圆形和第10个圆形大小相同
.cloud-son:nth-child(6n + 4) {
  right: 50px;
  bottom: -35px;
  width: 60px;
  height: 60px;
}

// 云和虚影由6个圆形组成，第5个圆形和第11个圆形大小相同
.cloud-son:nth-child(6n + 5) {
  right: 75px;
  bottom: -60px;
  width: 75px;
  height: 75px;
}

// 云和虚影由6个圆形组成，第6个圆形和第12个圆形大小相同
.cloud-son:nth-child(6n + 6) {
  right: 110px;
  bottom: -50px;
  width: 60px;
  height: 60px;
}

// 云层虚影整体上移
.cloud-light {
  position: absolute;
  right: 0;
  bottom: 25px;
  opacity: 0.5;
}

// 所有星星样式
.stars {
  transform: translateY(-125px);
  z-index: -2;
  transition: 1s;
  // 加入回弹动画
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1);
}

// 大星星的宽高
.big {
  --size: 7.5px;
}

// 中星星的宽高
.medium {
  --size: 5px;
}

// 小星星的宽高
.small {
  --size: 3px;
}

// 星星绝对定位
.star {
  position: absolute;
  width: calc(2 * var(--size));
  height: calc(2 * var(--size));
}

// 所有星星的位置
.star:nth-child(1) {
  top: 11px;
  left: 39px;
  animation-name: star;
  animation-duration: 3.5s;
}

.star:nth-child(2) {
  top: 39px;
  left: 91px;
  animation-name: star;
  animation-duration: 4.1s;
}

.star:nth-child(3) {
  top: 26px;
  left: 19px;
  animation-name: star;
  animation-duration: 4.9s;
}

.star:nth-child(4) {
  top: 37px;
  left: 66px;
  animation-name: star;
  animation-duration: 5.3s;
}

.star:nth-child(5) {
  top: 21px;
  left: 75px;
  animation-name: star;
  animation-duration: 3s;
}

.star:nth-child(6) {
  top: 51px;
  left: 38px;
  animation-name: star;
  animation-duration: 2.2s;
}

@keyframes star {
  0%,
  20% {
    transform: scale(0);
  }
  20%,
  100% {
    transform: scale(1);
  }
}

// 每一个星星由四个div向左浮动,拼合而成
.star-son {
  float: left;
}

.star-son:nth-child(1) {
  --pos: left 0;
}

.star-son:nth-child(2) {
  --pos: right 0;
}

.star-son:nth-child(3) {
  --pos: 0 bottom;
}

.star-son:nth-child(4) {
  --pos: right bottom;
}

// 星星
.star-son {
  width: var(--size);
  height: var(--size);
  background-image: radial-gradient(circle var(--size) at var(--pos), transparent var(--size), #fff);
}

// 将星星闪烁动画应用于所有的star元素
.star {
  transform: scale(1);
  // 加入回弹动画
  transition-timing-function: cubic-bezier(0.56, 1.35, 0.52, 1);
  transition: 1s;
  // 无限次重复动画
  animation-iteration-count: infinite;
  // 动画在每个循环中正反交替播放
  animation-direction: alternate;
  animation-timing-function: linear;
}
</style>
