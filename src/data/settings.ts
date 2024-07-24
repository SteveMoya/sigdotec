import type { ManifestOptions } from "vite-plugin-pwa"

export const settings = {
  site: 'https://sigdotec.com',
  name: 'Home Sigdotec',
  title: 'Home Sigdotec',
  description: 'Descripcion de Home de SIGDO',
  showLittleSticksPlug: true,
  disableIndexingUrls: [
    "/terminos-y-condiciones",
    "/politicas-de-privacidad",
    "/app/",
    "/admin/",
    "/api/",
    "/auth/",
    "/404.html",
    "/500.html",
    "/favicon.ico",
    "/registrarse"
  ]
}

export const manifest: Partial<ManifestOptions> = {
  name: 'SIGDOTEC WEB',
  short_name: 'SIGDOTEC',
  description: 'SIGDOTEC Web pon la tecnologia a tu servicio.',
  theme_color: '#007FFF',
  background_color: '#F5FAFA',
  display: 'minimal-ui',
  icons: [
    {
      src: '/favicons/SIGDO-ÍCONO-192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/favicons/SIGDO-ÍCONO-512.png',
      sizes: '512x512',
      type: 'image/png'
    },
    {
      src: '/favicons/SIGDO-ÍCONO-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable'
    },
    {
      src: '/favicons/SIGDO-ÍCONO-1080.png',
      sizes: '1080x1080',
      type: 'image/png',
      purpose: 'any maskable'
    }
  ]
}
