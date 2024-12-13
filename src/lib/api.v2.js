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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Refresh token implementation
axiosAuthApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const authStore = useAuthStore();

    if (error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        authStore.resetAuth();
        toast.warning('Unauthorized Request or Session Expired', {
          description: 'Your session has expired. Please log in again to continue.',
          position: 'bottom-right'
        });
        window.location.reload();
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosAuthApiInstance.get('/auth/refresh');
        if (refreshResponse.status === 200) {
          const newToken = refreshResponse.data.access_token;

          authStore.setAccessToken(newToken);
          window.localStorage.setItem('act', newToken);

          const Authorization = `Bearer ${newToken}`;
          axiosAuthApiInstance.defaults.headers.common['authorization'] = Authorization;
          originalRequest.headers['authorization'] = Authorization;

          return axiosAuthApiInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const api = axiosAuthApiInstance;
