import type { CategoryApi } from '@/api/category/types';
import request from '@/utils/request';

const categoryApi: CategoryApi = {
  getCategoryList: () => request({
    url: '/category/list',
    method: 'get'
  }),

  getCategoryArticleList: (articleQuery) => request({
    url: '/category/article',
    method: 'get',
    params: articleQuery
  }),

  countCategoryArticles: (articleQuery) => request({
    url: '/category/article/count',
    method: 'get',
    params: articleQuery
  })
};

export default categoryApi;