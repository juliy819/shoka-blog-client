import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About/index.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/views/Archive/index.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/Article/index.vue')
  },
  {
    path: '/category',
    name: 'categoryList',
    component: () => import('@/views/Category/index.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('@/views/Category/ArticleList.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/Message/index.vue')
  },
  {
    path: '/tag',
    name: 'tagList',
    component: () => import('@/views/Tag/index.vue')
  },
  {
    path: '/tag/:id',
    name: 'tag',
    component: () => import('@/views/Tag/ArticleList.vue')
  },
  {
    path: '/talk',
    name: 'talkList',
    component: () => import('@/views/Talk/index.vue')
  },
  {
    path: '/talk/:id',
    name: 'talk',
    component: () => import('@/views/Talk/Talk.vue')
  },
  {
    path: '/favourite',
    name: 'favourite',
    component: () => import('@/views/Favourite/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
