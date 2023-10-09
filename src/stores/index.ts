import useAppStore from './modules/app';
import useBlogStore from '@/stores/modules/blog';
import useUserStore from '@/stores/modules/user';
import useLocalStore from '@/stores/modules/local';
import type { Pinia } from 'pinia';

const useStore = (pinia?: Pinia | null | undefined) => ({
  appStore: useAppStore(pinia),
  blogStore: useBlogStore(pinia),
  userStore: useUserStore(pinia),
  localStore: useLocalStore(pinia)
});

export default useStore;