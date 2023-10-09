/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 页面标题
   */
  readonly VITE_APP_TITLE: string;

  /**
   * 开发环境配置
   */
  readonly VITE_APP_ENV: string;

  /**
   * 请求API
   */
  readonly VITE_APP_BASE_API: string;

  /**
   * 博客首页
   */
  readonly VITE_BLOG_URL: string;

  /**
   * github地址
   */
  readonly VITE_GITHUB_URL: string;

  /**
   * gitee地址
   */
  readonly VITE_GITEE_URL: string;

  /**
   * 启动模式 ('FULL' / 'LOCAL')
   */
  readonly VITE_START_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}