import { delay } from '@/lib/utils';
import { defineStore, getActivePinia } from 'pinia';
import { loginMutation, registerMutation } from "./authApi";
import { toast } from 'vue-sonner';
import { handleApiMutationError } from '@/lib/error';
import { useUserStore } from '@/app/users/userStore.js';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    accessToken: window.localStorage.getItem('act'),
    logInLoading: false,
    registrationLoading: false
  }),
  getters: {
    isAuthenticate: (state) => {
      return !!state.accessToken;
    }
  },
  actions: {
    resetAuth() {
      // Reset all store
      window.localStorage.removeItem('act');
      getActivePinia()._s.forEach((store) => store.$reset());
    },
    async logIn({ password, email }, form) {
      try {
        await delay(500);
        this.logInLoading = true;
        const result = await loginMutation({
          password,
          email
        });
        this.accessToken = `${result.data?.data.token}`;
        const userStore = useUserStore();
        await userStore.getCurrentUser();
        this.setUser(userStore.user);
        window.localStorage.setItem('act', `${result.data?.data.token}`);
      } catch (err) {
        handleApiMutationError(err, form);
        throw err;
      } finally {
        this.logInLoading = false;
      }
    },
    logOut({ noMessage = false }) {
      if (!noMessage) {
        toast.promise(delay(500), {
          loading: 'Singing in...',
          success: () => {
            this.resetAuth();
            return `You have loged out!!`;
          },
          finally: () => {
            this.router.push({ path: '/login' });
          },
          position: 'top-center',
          duration: 1000,
          error: (err) => 'Signed out failed !!'
        });
      } else {
        this.resetAuth();
        this.router.push({ path: '/login' });
      }
    },
    setUser(userValues) {
      this.user = {
        ...this.user,
        ...userValues
      };
    },
    setAccessToken(token = null) {
      this.accessToken = token;
    },
    async initAuth() {
      if (this.isAuthenticate) {
        try {
          const userStore = useUserStore();
          await userStore.getCurrentUser();
          this.setUser(userStore.user);
        } catch (err) {
          //
        }
      }
    },
    async registration(payload, form) {
      try {
        this.registrationLoading = true;
        const result = await registerMutation(payload);
        console.log(result.data);
      } catch (err) {
        handleApiMutationError(err, form);
        throw err;
      } finally {
        this.registrationLoading = false;
      }
    }
  }
});
