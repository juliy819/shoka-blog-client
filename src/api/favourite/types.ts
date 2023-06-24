import type { AxiosPromise } from 'axios';
import type { Result } from '@/model';

export interface FavouriteApi {
  /**
   * 获取收藏列表
   * @return 收藏列表
   */
  getFavouriteList(): AxiosPromise<Result<FavouriteClassify[]>>;
}

/**
 * 收藏项
 */
export interface Favourite {

  /**
   * 标题
   */
  title: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 链接
   */
  url: string;
}

/**
 * 收藏项分类
 */
export interface FavouriteClassify {

  /**
   * 分类
   */
  classify: string;

  /**
   * 收藏项列表
   */
  favouriteList: Favourite[];
}