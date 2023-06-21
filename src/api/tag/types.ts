import type { Result } from '@/model';
import type { AxiosPromise } from 'axios';
import type { ArticleConditionList, ArticleQuery } from '@/api/article/types';

export interface TagApi {
  /**
   * 获取文章标签
   * @returns 文章标签
   */
  getTagList(): AxiosPromise<Result<Tag[]>>;

  /**
   * 获取标签文章
   * @param articleQuery 查询条件
   * @returns 文章分类
   */
  getTagArticleList(articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>>;

  /**
   * 获取标签文章数量
   * @param articleQuery 查询条件
   */
  countTagArticles(articleQuery: ArticleQuery): AxiosPromise<Result<number>>;
}

/**
 * 标签
 */
export interface Tag {

  /**
   * 标签id
   */
  id: number;

  /**
   * 标签名
   */
  tagName: string;

  /**
   * 文章数量
   */
  articleCount: number;
}

/**
 * 标签VO
 */
export interface TagVO {

  /**
   * 标签id
   */
  id: number;

  /**
   * 标签名
   */
  tagName: string;
}