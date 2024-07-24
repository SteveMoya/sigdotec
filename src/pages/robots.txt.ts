import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /terminos-y-condiciones
Disallow: /politicas-de-privacidad
Disallow: /app/
Disallow: /admin/
Disallow: /api/
Disallow: /auth/
Disallow: /404.html
Disallow: /500.html
Disallow: /favicon.ico
Disallow: /registrarse


Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};