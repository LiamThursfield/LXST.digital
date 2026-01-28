// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    srcDir: 'app',
    modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', 'shadcn-nuxt'],

    vite: {
        plugins: [tailwindcss()]
    },

    nitro: {
        preset: 'cloudflare-pages'
    },

    css: ['./app/assets/css/tailwind.css'],

    fonts: {
        // This tells Nuxt to inject <link rel="preload"> for these families
        defaults: {
            preload: true
        }
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
            bodyAttrs: {
                class: 'dark'
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
                // { property: 'og:image', content: '' },

                // Twitter
                { property: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', content: 'https://lxst.digital/' },
                { property: 'twitter:title', content: 'LXST.digital | Digital Product Agency' },
                {
                    property: 'twitter:description',
                    content:
                        'Crafting high-performance websites, web applications, and digital strategies for ambitious brands.'
                }
                // { property: 'twitter:image', content: '' },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        }
    }
})
