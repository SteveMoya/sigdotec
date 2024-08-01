import { defineConfig, passthroughImageService } from 'astro/config';
import { settings, manifest } from './src/data/settings';
import { VitePWA } from "vite-plugin-pwa"
import mdx from '@astrojs/mdx';

import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import metaTags from "astro-meta-tags";
import devtoolbarTailwind from "astro-devtoolbar-tailwind";
import lighthouse from "astro-lighthouse";
import db from "@astrojs/db";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService()
  },
  security: {
    checkOrigin: true
  },
 compressHTML: true,
  prefetch: true,
  site: settings.site,
  vite: {
    plugins: [
          VitePWA({
              injectRegister: 'script-defer',
              registerType: "autoUpdate",
              devOptions: {
                  enabled: true
              },
              manifest,
              workbox: {
                  globDirectory: ".vercel/output/static",
                  globPatterns: ["**/*.{html,js,css,woff,woff2,ttf,ico}"],
                  runtimeCaching: [
                      {
                          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
                          handler: "CacheFirst",
                          options: {
                              cacheName: "images",
                              expiration: {
                                  maxEntries: 100,
                                  maxAgeSeconds: 30 * 24 * 60 * 60,
                              },
                          },
                      },
                      {
                          urlPattern: /\.(?:woff|woff2|ttf|eot|ico)$/,
                          handler: "CacheFirst",
                          options: {
                              cacheName: "fonts",
                              expiration: {
                                  maxEntries: 10,
                                  maxAgeSeconds: 30 * 24 * 60 * 60,
                              },
                          },
                      },
                  ],
                  navigateFallback: null,
              },
          })
    ],
  },
  integrations: [
  mdx(), react(), tailwind({
    applyBaseStyles: false
  }), icon(),
  metaTags(), devtoolbarTailwind(), lighthouse(), db(), sitemap({
  })],
  output: 'server',
  adapter: vercel()
});