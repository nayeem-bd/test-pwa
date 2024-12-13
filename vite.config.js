/* eslint-disable no-undef */

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true
        },

        manifest: {
          name: 'merchant-panel',
          short_name: 'merchant-panel',
          description: 'merchant-panel',
          theme_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
        },

        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true
        },

        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module'
        }
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: 8080
    },
    preview: {
      port: 8080
    }
  };
});
