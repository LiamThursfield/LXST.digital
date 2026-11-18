// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    srcDir: 'app',
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        'shadcn-nuxt'
    ],

    vite: {
        plugins: [tailwindcss()]
    },

    nitro: {
        preset: 'cloudflare-pages'
    },

    css: ['./app/assets/css/tailwind.css'],

    $production: {
        // Serve rendered pages from cache and refresh them in the background, so CMS changes show
        // within a minute without every visit calling LXST.admin (its API is rate limited per IP)
        routeRules: { '/**': { swr: 60 } }
    },

    runtimeConfig: {
        public: {
            // LXST.admin's tenant API; override with NUXT_PUBLIC_LXST_API_BASE
            lxstApiBase: 'https://lxst.lxst.digital/api/v1',
            // Send each visit to LXST.admin's page view stats (plugins/page-views.client.ts);
            // override with NUXT_PUBLIC_LXST_RECORD_PAGE_VIEWS
            lxstRecordPageViews: true
        }
    },

    $development: {
        // Dev calls the live API by default, so local browsing would add to the real stats
        runtimeConfig: { public: { lxstRecordPageViews: false } }
    },

    colorMode: {
        // Follow the OS by default; dark is the brand default when it can't be detected
        preference: 'system',
        fallback: 'dark',
        // Toggle `.dark` on <html>, matching the `dark` variant in tailwind.css
        classSuffix: ''
    },

    fonts: {
        families: [
            { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 700] },
            { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] }
        ]
    },

    icon: {
        mode: 'css',
        cssLayer: 'base'
    },

    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: '',
        /**
         * Directory that the component lives in.
         * @default "~/components/ui"
         */
        componentDir: '@/components/ui'
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            },
            title: 'LXST.digital | Digital Product Agency',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    key: 'description',
                    name: 'description',
                    content:
                        'LXST.digital is a premier digital product agency. We craft high-performance websites, web applications, and digital strategies for ambitious brands.'
                },

                { name: 'theme-color', content: '#00FF99' },

                // Open Graph / Facebook
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://lxst.digital/' },
                { property: 'og:title', content: 'LXST.digital | Digital Product Agency' },
                {
                    property: 'og:description',
                    content:
                        'Crafting high-performance websites, web applications, and digital strategies for ambitious brands.'
                },
                { property: 'og:image', content: '/meta/og_image_default.png' },

                // Twitter
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', content: 'https://lxst.digital/' },
                { property: 'twitter:title', content: 'LXST.digital | Digital Product Agency' },
                {
                    property: 'twitter:description',
                    content:
                        'Crafting high-performance websites, web applications, and digital strategies for ambitious brands.'
                },
                { property: 'twitter:image', content: '/meta/og_image_default.png' }
            ],
            // The "x + cursor" mark: SVG where supported, ICO (16 & 32px) as the fallback
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
            ]
        }
    }
});
