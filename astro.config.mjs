import { defineConfig, passthroughImageService } from 'astro/config';
import { settings } from './src/data/settings';
// import { manifest } from './src/data/settings';

// El sitemap tiene que ser eliminado ya que el proyecto es ssr y no ssg
import sitemap from 'astro-sitemap';
import mdx from '@astrojs/mdx';
import robotsTxt from 'astro-robots-txt';

/*
Esto a sido eliminado hasta que la libreria oficial @vite-pwa/astro actualice a VITE 5.0 
import AstroPWA from "@vite-pwa/astro";
*/

import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
// import auth from "auth-astro";
import metaTags from "astro-meta-tags";
import devtoolbarTailwind from "astro-devtoolbar-tailwind";
import lighthouse from "astro-lighthouse";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
    // vite: {
    //     optimizeDeps: {
    //         exclude: ['**/*.node']
    //     }
    // },
    image: {
        service: passthroughImageService()
    },
    security: {
        checkOrigin: true
    },
    prefetch: true,
    compressHTML: true,
    site: settings.site,
    integrations: [
        // AstroPWA({
        //   base: "/",
        //   scope: "/",
        //   includeAssets: ["favicon.svg"],
        //   registerType: "autoUpdate",
        //   manifest,
        //   workbox: {
        //     navigateFallback: "/",
        //     globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
        //   },
        //   devOptions: {
        //     enabled: true,
        //     navigateFallbackAllowlist: [/^\//],
        //   },
        // }),
        sitemap(), mdx(), react(), robotsTxt(), tailwind({
            applyBaseStyles: false,
        }), icon(), 
        // auth(), 
        metaTags(), devtoolbarTailwind(), lighthouse(), db()],
    output: 'server',
    adapter: vercel()
});