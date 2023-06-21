import type { TagApi } from '@/api/tag/types';
import request from '@/utils/request';

const tagApi: TagApi = {
  getTagList: () => request({
    url: '/tag/list',
    method: 'get'
  }),

  getTagArticleList: (articleQuery) => request({
    url: '/tag/article',
    method: 'get',
    params: articleQuery
  }),

  countTagArticles: (articleQuery) => request({
    url: '/tag/article/count',
    method: 'get',
    params: articleQuery
  })
};

export default tagApi;