import type { Article, ArticleInfo } from '@/api/article/types';
import type { Category } from '@/api/category/types';
import type { Tag } from '@/api/tag/types';

/**
 * 应用
 */
export interface AppState {

  /**
   * 本地模式
   */
  local: boolean;

  /**
   * 侧边栏
   */
  sideDrawer: boolean;

  /**
   * 是否正在加载
   */
  loading: boolean;

  /**
   * 进度条间隔
   */
  npTimeout: number;

  /**
   * 加载间隔
   */
  loadingTimeout: number;

  /**
   * 导航栏背景色变化的边界高度
   */
  headerChangeHeight: number;

  /**
   * 是否显示右侧容器
   */
  rightContainer: boolean;

  /**
   * 登录窗口
   */
  loginFrame: boolean;

  /**
   * 注册窗口
   */
  registerFrame: boolean;

  /**
   * 修改邮箱窗口
   */
  emailFrame: boolean;

  /**
   * 修改密码窗口
   */
  passwordFrame: boolean;
}

/**
 * 用户
 */
export interface UserState {
  /**
   * 用户id
   */
  id?: number;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 用户名
   */
  username: string;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 个人网站
   */
  webSite: string;

  /**
   * 个人简介
   */
  intro: string;

  /**
   * 登录方式
   */
  loginType?: number;

  /**
   * 第三方登录之前的path
   */
  path: string;

  /**
   * 文章点赞集合
   */
  articleLikeSet: number[];

  /**
   * 评论点赞集合
   */
  commentLikeSet: number[];

  /**
   * 说说点赞集合
   */
  talkLikeSet: number[];
}

/**
 * 本地模式
 */
export interface LocalState {

  /**
   * 文章列表
   */
  articleList: Article[];

  /**
   * 文章信息列表
   */
  articleInfoList: ArticleInfo[];

  /**
   * 分类列表
   */
  categoryList: Category[];

  /**
   * 标签列表
   */
  tagList: Tag[];

  /**
   * 分类文章列表
   */
  categoryArticleList: number[][];

  /**
   * 标签文章列表
   */
  tagArticleList: number[][];

}



