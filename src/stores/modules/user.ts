import { loginApi } from '@/api/login';
import { getToken, removeToken, setToken } from '@/utils/token';
import type { UserState } from '@/stores/types';
import { defineStore } from 'pinia';
// import defAva from '@/assets/images/defaultAvatar.jpg';
import type { LoginForm } from '@/api/login/types';

const useUserStore = defineStore('useUserStore', {
  state: (): UserState => ({
    token: getToken(),
    id: null,
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    /** 登录 */
    login(loginForm: LoginForm) {
      return new Promise((resolve, reject) => {
        loginApi.login(loginForm)
          .then(({ data }) => {
            setToken(data.data);
            this.token = data.data;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 获取后台用户信息 */
    // getAdminUserInfo() {
    //   return new Promise((resolve, reject) => {
    //     loginApi.getAdminUserInfo()
    //       .then(({ data }) => {
    //         const userInfo = data.data;
    //         this.id = userInfo.id;
    //         this.avatar = (userInfo.avatar === '' || userInfo.avatar === null) ? defAva : userInfo.avatar;
    //         this.roles = userInfo.roleList;
    //         this.permissions = userInfo.permissionList;
    //         resolve(data);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    /** 注销登录 */
    logout() {
      return new Promise((resolve, reject) => {
        loginApi.logout()
          .then(() => {
            this.id = null;
            this.token = '';
            this.avatar = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            resolve(null);
          })
          .catch(error => {
            this.id = null;
            this.token = '';
            this.avatar = '';
            this.roles = [];
            this.permissions = [];
            removeToken();
            reject(error);
          });
      });
    }
  },
  getters: {}
});

export default useUserStore;
