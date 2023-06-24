import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/views/archive/index.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article/index.vue')
  },
  {
    path: '/category',
    name: 'categoryList',
    component: () => import('@/views/category/index.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('@/views/category/ArticleList.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message/index.vue')
  },
  {
    path: '/tag',
    name: 'tagList',
    component: () => import('@/views/tag/index.vue')
  },
  {
    path: '/tag/:id',
    name: 'tag',
    component: () => import('@/views/tag/ArticleList.vue')
  },
  {
    path: '/talk',
    name: 'talkList',
    component: () => import('@/views/talk/index.vue')
  },
  {
    path: '/talk/:id',
    name: 'talk',
    component: () => import('@/views/talk/Talk.vue')
  },
  {
    path: '/favourite',
    name: 'favourite',
    component: () => import('@/views/favourite/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue')
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
