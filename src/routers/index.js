import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

// Layouts
import PrivateLayout from '@/layouts/private-layout/PrivateLayout.vue';
import AuthLayout from '@/layouts/auth-layout/AuthLayout.vue';

import privateRoutes from './privateRoutes';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import LoginPage from '@/pages/login/LoginPage.vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useAuthStore } from '@/app/auth/authStore';
import RegisterPage from '@/pages/register/RegisterPage.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: BaseLayout,
      path: '/',
      async beforeEnter(to) {
        const authStore = useAuthStore();
        await authStore.initAuth();
      },
      children: [
        {
          path: '/',
          component: PrivateLayout,
          children: privateRoutes,
          meta: {
            protected: true
          }
        },
        {
          path: '/login',
          component: AuthLayout,
          children: [
            {
              path: '',
              name: 'Login',
              component: LoginPage
            }
          ]
        },
        {
          path: '/register',
          component: AuthLayout,
          children: [
            {
              path: '',
              name: 'Register',
              component: RegisterPage
            }
          ]
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundPage }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.protected && !authStore.isAuthenticate) {
    return next({
      path: '/login',
      replace: true,
      force: true
    });
  } else {
    next();
  }
});

export default router;
