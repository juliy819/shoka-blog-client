const imgList = import.meta.glob('@/assets/images/bg/*.(jpg|png)', {
  eager: true,
  as: 'url'
});
const imgKeys = Object.keys(imgList);

/**
 * 获取随机背景图
 * @return 背景图路径
 */
export const getRandomBgImage = (): string => {
  const randomIndex = Math.floor(Math.random() * imgKeys.length);
  return imgList[imgKeys[randomIndex]];
};

/**
 * 打开链接
 * @param url 链接
 */
export const toUrl = (url: string): void => {
  window.open(url);
};