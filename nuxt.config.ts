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
            title: 'LXST.digital | Freelance Web Development',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    key: 'description',
                    name: 'description',
                    content:
                        'Professional freelance web development services. Specializing in building high-performance websites and web applications.'
                },
                { name: 'theme-color', content: '#00FF99' }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
        }
    }
})
