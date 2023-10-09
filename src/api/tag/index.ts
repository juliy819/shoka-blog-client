import type { Tag, TagApi } from '@/api/tag/types';
import request from '@/utils/request';
import type { AxiosPromise } from 'axios';
import type { Result } from '@/model';
import type { ArticleConditionList, ArticleQuery } from '@/api/article/types';
import useStore from '@/stores';

const tagApi: TagApi = {
  getTagList: () => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getTagListByLocal();
    } else {
      return getTagListByNet();
    }
  },

  getTagArticleList: (articleQuery) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getTagArticleListByLocal(articleQuery);
    } else {
      return getTagArticleListByNet(articleQuery);
    }
  },

  countTagArticles: (articleQuery) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return countTagArticlesByLocal(articleQuery);
    } else {
      return countTagArticlesByNet(articleQuery);
    }
  }
};

/**
 * 获取网络文章标签
 * @returns 文章标签
 */
const getTagListByNet = (): AxiosPromise<Result<Tag[]>> =>
  request({
    url: '/tag/list',
    method: 'get'
  });

/**
 * 获取本地文章标签
 * @returns 文章标签
 */
const getTagListByLocal = (): AxiosPromise<Result<Tag[]>> =>
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
        data: localStore.tagList
      }
    });
  });


/**
 * 获取网络标签文章
 * @param articleQuery 查询条件
 */
const getTagArticleListByNet = (articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>> =>
  request({
    url: '/tag/article',
    method: 'get',
    params: articleQuery
  });

/**
 * 获取本地标签文章
 * @param articleQuery 查询条件
 */
const getTagArticleListByLocal = (articleQuery: ArticleQuery): AxiosPromise<Result<ArticleConditionList>> =>
  new Promise((resolve, reject) => {
    const { localStore } = useStore();
    const articleConditionList = localStore.getArticlesByTagId(articleQuery.tagId);
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
 * 获取网络标签文章数量
 * @param articleQuery 查询条件
 */
const countTagArticlesByNet = (articleQuery: ArticleQuery): AxiosPromise<Result<number>> =>
  request({
    url: '/tag/article/count',
    method: 'get',
    params: articleQuery
  });

/**
 * 获取本地标签文章数量
 * @param articleQuery 查询条件
 */
const countTagArticlesByLocal = (articleQuery: ArticleQuery): AxiosPromise<Result<number>> =>
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
        data: localStore.getArticlesByTagId(articleQuery.tagId).articleConditionList.length
      }
    });
  });


export default tagApi;