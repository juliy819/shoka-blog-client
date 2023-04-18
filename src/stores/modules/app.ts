import type { AppState } from '@/stores/types';
import nProgress from 'nprogress';
import { defineStore } from 'pinia';

nProgress.configure({
  easing: 'ease',
  speed: 1000,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
  // parent: '#loading-bar-wrapper'
});

const useAppStore = defineStore('useAppStore', {
  state: (): AppState => ({
    sideDrawerOpen: false,
    loading: false,
    npTimeout: -1,
    loadingTimeout: -1
  }),
  actions: {

    /**
     * 打开侧边栏
     */
    showSideDrawer() {
      this.sideDrawerOpen = true;
    },

    /**
     * 开始加载
     */
    startLoading() {
      if (this.loading) {
        return;
      }
      if (this.npTimeout !== -1) {
        clearTimeout(this.npTimeout);
      }
      if (this.loadingTimeout !== -1) {
        clearTimeout(this.loadingTimeout);
      }
      nProgress.start();
      this.loading = true;
    },

    /**
     * 结束加载
     */
    endLoading() {
      this.npTimeout = setTimeout(() => {
        nProgress.done();
      }, 100);
      this.loadingTimeout = setTimeout(() => {
        this.loading = false;
      }, 300);
    }

  }
});

export default useAppStore;