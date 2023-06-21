import type { Result } from '@/model';
import type { AxiosPromise } from 'axios';
import type { ArticleConditionList, ArticleQuery } from '@/api/article/types';

export interface CategoryApi {

  /**
   * 获取文章分类
   * @returns 文章分类
   */
  getCategoryList(): AxiosPromise<Result<Category[]>>;

  /**
   * 获取分类文章
   * @param articleQuery 查询条件
   * @returns 文章分类
   */
  getCategoryArticleList(articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>>;

  /**
   * 获取分类文章数量
   * @param articleQuery 查询条件
   * @return 文章数量
   */
  countCategoryArticles(articleQuery: ArticleQuery): AxiosPromise<Result<number>>;
}

/**
 * 分类
 */
export interface Category {

  /**
   * 分类id
   */
  id: number;

  /**
   * 分类名
   */
  categoryName: string;

  /**
   * 文章数量
   */
  articleCount: number;
}

/**
 * 分类VO
 */
export interface CategoryVO {

  /**
   * 分类id
   */
  id: number;

  /**
   * 分类名
   */
  categoryName: string;
}