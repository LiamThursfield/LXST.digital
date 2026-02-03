<script lang="ts" setup>
const stack = [
    { name: 'Laravel', icon: 'skill-icons:laravel-dark' },
    { name: 'Vue.js', icon: 'skill-icons:vuejs-dark' },
    { name: 'Nuxt', icon: 'skill-icons:nuxtjs-dark' },
    { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark' },
    { name: 'Vercel', icon: 'skill-icons:vercel-dark' },
    { name: 'Cloudflare', icon: 'skill-icons:cloudflare-dark' },
    { name: 'AWS', icon: 'skill-icons:aws-dark' }
];
</script>

<template>
    <div class="w-full overflow-hidden">
        <div class="container mx-auto px-4 relative">
            <div
                class="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
            >
                <div
                    class="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-6 pr-4"
                >
                    <div
                        v-for="tech in stack"
                        :key="tech.name"
                        class="flex items-center justify-center"
                    >
                        <Icon
                            size="48"
                            class="grayscale transition-all duration-300 active:grayscale-0 hover:grayscale-0"
                            :name="tech.icon"
                        />
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    class="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-6"
                >
                    <div
                        v-for="tech in stack"
                        :key="tech.name + '-duplicate'"
                        class="flex items-center justify-center"
                    >
                        <Icon
                            size="48"
                            class="grayscale transition-all duration-300 active:grayscale-0 hover:grayscale-0"
                            :name="tech.icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-marquee {
    animation: marquee 18s linear infinite;
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}
</style>
