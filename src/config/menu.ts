export interface MenuItem {
  title: string,
  path: string | undefined,
  icon: string,
  children?: MenuItem[]
}

export const menuList: MenuItem[] = [
  {
    title: '首页',
    path: '/',
    icon: 'home'
  },
  {
    title: '文章',
    path: undefined,
    icon: 'article',
    children: [
      {
        title: '归档',
        path: '/archive',
        icon: 'archive'
      },
      {
        title: '分类',
        path: '/category',
        icon: 'category'
      },
      {
        title: '标签',
        path: '/tag',
        icon: 'tag'
      }
    ]
  },
  {
    title: '说说',
    path: '/talk',
    icon: 'talk'
  },
  {
    title: '收藏夹',
    path: '/favourite',
    icon: 'favourite'
  },
  {
    title: '留言板',
    path: '/message',
    icon: 'message'
  },
  {
    title: '关于',
    path: '/about',
    icon: 'plane'
  }
];

export const sideMenuList = [
  {
    name: '首页',
    icon: 'home',
    path: '/'
  },
  {
    name: '归档',
    icon: 'archive',
    path: '/archive'
  },
  {
    name: '分类',
    icon: 'category',
    path: '/category'
  },
  {
    name: '标签',
    icon: 'tag',
    path: '/tag'
  },
  {
    name: '说说',
    icon: 'talk',
    path: '/talk'
  },
  {
    name: '收藏夹',
    icon: 'favourite',
    path: '/favourite'
  },
  {
    name: '留言板',
    icon: 'message',
    path: '/message'
  },
  {
    name: '关于',
    icon: 'plane',
    path: '/about'
  }
];