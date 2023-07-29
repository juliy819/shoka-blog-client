import bg1 from '@/assets/images/bg/bg-1.jpg';
import bg2 from '@/assets/images/bg/bg-2.jpg';
import bg3 from '@/assets/images/bg/bg-3.jpg';
import bg4 from '@/assets/images/bg/bg-4.jpg';
import bg5 from '@/assets/images/bg/bg-5.jpg';
import bg6 from '@/assets/images/bg/bg-6.jpg';

/**
 * 获取随机背景图
 * @return 背景图路径
 */
export const getRandomBgImage = (): string => {
  const imageList = [bg1, bg2, bg3, bg4, bg5, bg6];
  const randomInt = Math.floor(Math.random() * imageList.length);
  return imageList[randomInt];
};

/**
 * 打开链接
 * @param url 链接
 */
export const toUrl = (url: string): void => {
  window.open(url);
};