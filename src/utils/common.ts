/**
 * 获取随机背景图
 * @return 背景图路径
 */
export const getRandomBgImage = (): string => {
  // 从bg文件夹中随机获取一张图片
  const imageList = import.meta.glob('/src/assets/images/bg/*.{jpg,png,gif}');
  const keys = Object.keys(imageList);
  const randomInt = Math.floor(Math.random() * keys.length);
  // 处理路径
  return '/src/' + keys[randomInt].slice(5);
};

/**
 * 打开链接
 * @param url 链接
 */
export const toUrl = (url: string): void => {
  window.open(url);
};