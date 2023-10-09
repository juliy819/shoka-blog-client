import type { Article, ArticleApi, ArticleInfo } from '@/api/article/types';
import request from '@/utils/request';
import useStore from '@/stores';
import type { PageQuery, PageResult, Result } from '@/model';
import type { AxiosPromise } from 'axios';


/**
 * 文章api
 */
const articleApi: ArticleApi = {
  getArticleList: (pageQuery) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getArticleListByLocal(pageQuery);
    } else {
      return getArticleListByNet(pageQuery);
    }
  },

  getArticle: (articleId) => {
    const { appStore } = useStore();
    if (appStore.local) {
      return getArticleByLocal(articleId);
    } else {
      return getArticleByNet(articleId);
    }
  },

  getArticleFeatured: () => request({
    url: '/article/featured',
    method: 'get'
  }),

  likeArticle: (articleId) => request({
    url: `/article/${articleId}/like`,
    method: 'post'
  })

};

/**
 * 获取网络文章列表
 * @param pageQuery 查询条件
 * @returns 文章列表
 */
const getArticleListByNet = (pageQuery: PageQuery): AxiosPromise<Result<PageResult<Article[]>>> =>
  request({
    url: '/article/list',
    method: 'get',
    params: pageQuery
  });

/**
 * 获取本地文章列表
 * @param pageQuery 查询条件
 * @returns 文章列表
 */
const getArticleListByLocal = (pageQuery: PageQuery): AxiosPromise<Result<PageResult<Article[]>>> =>
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
        data: {
          recordList: localStore.articleList
            .slice((pageQuery.current - 1) * pageQuery.size, pageQuery.current * pageQuery.size),
          count: localStore.articleList.length
        }
      }
    });
  });

/**
 * 获取网络文章信息
 * @param articleId 文章id
 */
const getArticleByNet = (articleId: number): AxiosPromise<Result<ArticleInfo>> => request({
  url: `/article/${articleId}`,
  method: 'get'
});

/**
 * 获取本地文章信息
 * @param articleId  文章id
 */
const getArticleByLocal = (articleId: number): AxiosPromise<Result<ArticleInfo>> =>
  new Promise((resolve, reject) => {
    const { localStore } = useStore();
    const articleInfo = localStore.articleInfoList
      .find(article => article.id === articleId);
    if (!articleInfo) {
      reject('文章不存在');
    }
    resolve({
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
      data: {
        code: 200,
        msg: 'success',
        flag: true,
        data: articleInfo as ArticleInfo
      }
    });
  });

export default articleApi;