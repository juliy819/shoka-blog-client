import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { prismjsPlugin } from 'vite-plugin-prismjs';
import viteCompression from 'vite-plugin-compression';


export default defineConfig({
  plugins: [
    vue(),
    //自动导包
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia'],
      // eslint报错解决
      eslintrc: {
        //设为true则每次启动后都会生成文件
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      dts: 'src/types/auto-imports.d.ts'
    }),
    //自动引入组件
    Components({
      dirs: ['src/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver()],
      dts: 'src/types/components.d.ts'
    }),
    // 引入所有svg图片
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    // 语法高亮语言包
    prismjsPlugin({
      languages: [
        'java',
        'python',
        'html',
        'css',
        'sass',
        'less',
        'go',
        'cpp',
        'c',
        'js',
        'ts',
        'sql',
        'bash',
        'git',
        'nginx',
        'php'
      ],
      theme: 'tomorrow',
      css: true
    }),
    // 打包压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      //设置路径别名
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    //端口
    port: 8081,
    //主机名
    host: '0.0.0.0',
    //若端口被占用，则自动尝试下一个可用的端口
    strictPort: false,
    //服务启动后自动在浏览器打开
    open: true,
    //代理
    //http://localhost:8082/api/bar -> http://localhost:8080/bar
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
