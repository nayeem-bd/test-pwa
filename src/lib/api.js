import axios from 'axios';
import { useAuthStore } from '@/app/auth/authStore';
import { toast } from 'vue-sonner';

const axiosAuthApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
  // withXSRFToken: true,
  // xsrfCookieName: 'XSRF-TOKEN',
  // xsrfHeaderName: 'X-XSRF-TOKEN'
});

axiosAuthApiInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore?.accessToken) {
      config.headers['authorization'] = `Bearer ${authStore.accessToken}`;
    }
    // this is only for localhost
    config.headers['courier-hash'] = import.meta.env.VITE_COURIER_HASH;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAuthApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();
    if (error.response.status === 401) {
      authStore.resetAuth();
      toast.warning('Unauthorized Request or Session Expired', {
        description: 'Your session has expired. Please log in again to continue.',
        position: 'bottom-right'
      });
      window.location.reload();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const api = axiosAuthApiInstance;
