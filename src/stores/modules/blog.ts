import { defineStore } from 'pinia';
import type { BlogInfo, SiteConfig } from '@/api/blog/types';

const useBlogStore = defineStore('useBlogStore', {
  state: (): BlogInfo => ({
    status: 0,
    articleCount: 0,
    categoryCount: 0,
    tagCount: 0,
    viewCount: 0,
    siteConfig: {} as SiteConfig
  }),
  actions: {
    /**
     * 设置网站基本信息
     * @param blogInfo 博客信息
     */
    setBlogInfo(blogInfo: BlogInfo) {
      this.articleCount = blogInfo.articleCount;
      this.categoryCount = blogInfo.categoryCount;
      this.tagCount = blogInfo.tagCount;
      this.viewCount = blogInfo.viewCount;
      this.siteConfig = blogInfo.siteConfig;
    },

    /**
     * 设置数据状态
     * @param status 数据状态
     */
    setStatus(status: number) {
      this.status = status;
    }
  },
  getters: {},
  persist: {
    enabled: true,
    strategies: [{ storage: sessionStorage }]
  }
});

export default useBlogStore;