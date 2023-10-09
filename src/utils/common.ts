const bgList = import.meta.glob('@/assets/images/bg/*.(jpg|png)', {
  eager: true,
  as: 'url'
});
const bgKeys = Object.keys(bgList);

const imgList = import.meta.glob('@/assets/**/*.(jpg|jpeg|png)', {
  eager: true,
  as: 'url'
});

/**
 * 获取随机背景图
 * @return 背景图路径
 */
export const getRandomBgImage = (): string => {
  const randomIndex = Math.floor(Math.random() * bgKeys.length);
  return bgList[bgKeys[randomIndex]];
};

/**
 * 获取图片路径
 * @param name 图片名称
 */
export const getImgUrl = (name: string): string => {
  for (const path in imgList) {
    if (path.includes(name)) {
      return imgList[path];
    }
  }
  return '';
};

/**
 * 打开链接
 * @param url 链接
 */
export const toUrl = (url: string): void => {
  window.open(url);
};