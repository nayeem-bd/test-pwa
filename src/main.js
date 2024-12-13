import '@/styles/main.css';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import router from './routers';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.provide('router', router);
app.mount('#app');
