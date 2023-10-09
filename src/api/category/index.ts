import type { Category, CategoryApi } from '@/api/category/types';
import request from '@/utils/request';
import type { AxiosPromise } from 'axios';
import type { Result } from '@/model';
import type { ArticleConditionList, ArticleQuery } from '@/api/article/types';
import useStore from '@/stores';

const categoryApi: CategoryApi = {
  getCategoryList: () => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getCategoryListByLocal();
    } else {
      return getCategoryListByNet();
    }
  },

  getCategoryArticleList: (articleQuery) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getCategoryArticleListByLocal(articleQuery);
    } else {
      return getCategoryArticleListByNet(articleQuery);
    }
  },

  countCategoryArticles: (articleQuery) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return countCategoryArticlesByLocal(articleQuery);
    } else {
      return countCategoryArticlesByNet(articleQuery);
    }
  }
};


/**
 * 获取网络文章分类
 * @returns 文章分类
 */
const getCategoryListByNet = (): AxiosPromise<Result<Category[]>> =>
  request({
    url: '/category/list',
    method: 'get'
  });

/**
 * 获取本地文章分类
 * @returns 文章分类
 */
const getCategoryListByLocal = (): AxiosPromise<Result<Category[]>> =>
  new Promise(resolve => {
    const { localStore } = useStore();
    resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: {
        code: 200,
        msg: 'success',
        flag: true,
        data: localStore.categoryList
      }
    });
  });


/**
 * 获取网络分类文章
 * @param articleQuery 查询条件
 */
const getCategoryArticleListByNet = (articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>> =>
  request({
    url: '/category/article',
    method: 'get',
    params: articleQuery
  });

/**
 * 获取本地分类文章
 * @param articleQuery 查询条件
 */
const getCategoryArticleListByLocal = (articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>> =>
  new Promise((resolve, reject) => {
    const { localStore } = useStore();
    const articleConditionList = localStore.getArticlesByCategoryId(articleQuery.categoryId);
    if (!articleConditionList) {
      reject();
    }

    articleConditionList.articleConditionList = articleConditionList.articleConditionList
      .slice((articleQuery.current - 1) * articleQuery.size, articleQuery.current * articleQuery.size);

    resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: {
        code: 200,
        msg: 'success',
        flag: true,
        data: articleConditionList
      }
    });
  });

/**
 * 获取网络分类文章数量
 * @param articleQuery 查询条件
 */
const countCategoryArticlesByNet = (articleQuery: ArticleQuery): AxiosPromise<Result<number>> =>
  request({
    url: '/category/article/count',
    method: 'get',
    params: articleQuery
  });

/**
 * 获取本地分类文章数量
 * @param articleQuery 查询条件
 */
const countCategoryArticlesByLocal = (articleQuery: ArticleQuery): AxiosPromise<Result<number>> =>
  new Promise(resolve => {
    const { localStore } = useStore();
    resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: {
        code: 200,
        msg: 'success',
        flag: true,
        data: localStore.getArticlesByCategoryId(articleQuery.categoryId).articleConditionList.length
      }
    });
  });


export default categoryApi;