import type { FavouriteApi } from '@/api/favourite/types';
import request from '@/utils/request';

const favouriteApi: FavouriteApi = {
  getFavouriteList: () => request({
    url: '/favourite/list',
    method: 'get'
  })
};

export default favouriteApi;