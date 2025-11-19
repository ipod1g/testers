import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        ws: true,
        changeOrigin: true,
        target: `http://${process.env.DEPLOYMENT === 'local-cluster' ? 'api' : 'localhost'}:8080/`,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            if (!(req.headers.cookie && req.headers.cookie.includes('visitorId'))) {
              // eslint-disable-next-line no-param-reassign
            }
          });
        },
      },
    },
    headers: {
      'Document-Policy': 'js-profiling',
    },
  },
  preview: {
    port: 3000,
  },
  plugins: [
    react(
      process.env.NODE_ENV === 'production'
        ? undefined
        : {
            babel: {
              plugins: [
                [
                  'babel-plugin-styled-components',
                  {
                    displayName: true,
                    fileName: false,
                  },
                ],
              ],
            },
          },
    ),
    tailwindcss(),
    viteTsconfigPaths(),
    // visualizer({
    //   open: true,
    //   gzipSize: true,
    // })
  ],
});
