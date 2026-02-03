<script lang="ts" setup>
import ProjectCard from '@/components/project/marketing/ProjectCard.vue';
import TechStackRow from '@/components/project/marketing/TechStackRow.vue';
import RadialGlowSection from '~/components/project/marketing/RadialGlowSection.vue';

useSeoMeta({
    title: 'LXST.digital | Digital Product Agency',
    description:
        'Bespoke websites and web applications for forward-thinking brands. Powered by Nuxt, Vue, and Laravel.'
});

const projects = [
    {
        title: 'Thursfields Barbers',
        type: 'Bespoke Website',
        description:
            'A premium brand experience for a modern barbershop. Fully integrated with a custom CMS for easy content management.',
        image: '/images/projects/thursfields-barbers-thumbnail.png',
        link: 'https://thursfieldsbarbers.com/'
    },
    {
        title: 'DJ Tag Generator',
        type: 'Web Application',
        description:
            'An automated tool for artists & DJs to manage and generate audio tags using AI-powered voice synthesis.',
        image: '/images/projects/dj-tag-generator-thumbnail.png',
        link: 'https://dj-tag-generator.lxst-digital.co.uk/'
    },
    {
        title: 'Moss & Field',
        type: 'Bespoke Website',
        description:
            'A dynamic digital presence for a DJ duo. Designed to promote upcoming events, a press-kit, and seamless booking management.',
        image: '',
        link: 'https://mossandfield.co.uk/'
    }
];

const services = [
    {
        title: 'Bespoke Websites',
        description:
            'We create custom-coded websites integrated with powerful CMS and CRM tools. Perfect for hospitality (Pubs/Clubs), service industries (Barbers/Electricians), and creatives (DJs/Artists).',
        icon: 'streamline-plump:browser-website-1-remix'
    },
    {
        title: 'Web Applications',
        description:
            'From internal dashboards to customer-facing SaaS products. We engineer robust web applications that automate workflows and solve complex business problems.',
        icon: 'streamline-plump:application-add-solid'
    },
    {
        title: 'Tech Consultancy',
        description:
            'Expert maintenance for existing Nuxt, Vue, and Laravel projects. We handle upgrades, performance optimization, and feature development for your legacy code.',
        icon: 'streamline-plump:chat-bubble-oval-notification-remix'
    }
];
</script>

<template>
    <div class="flex flex-col">
        <!-- HERO -->
        <ProjectHeroesHeroWithCTA
            :primary-cta="{
                label: 'Start Project',
                href: '/contact'
            }"
            :secondary-cta="{
                label: 'Our Work',
                href: '/work'
            }"
            heading="Crafting Digital Experiences That Define The Future"
            subheading="DIGITAL PRODUCT AGENCY"
        />

        <!-- SERVICES -->
        <section class="py-24 px-4">
            <div class="container mx-auto max-w-content-container">
                <ProjectHeadersSectionHeader subtitle="DIGITAL SERVICES" title="What We Offer" />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ProjectMarketingServiceCard
                        v-for="service in services"
                        :key="service.title"
                        v-bind="service"
                    />
                </div>
            </div>
        </section>

        <ProjectUtilitiesDivider />

        <TechStackRow class="py-24" />

        <ProjectUtilitiesDivider />

        <!-- METHODOLOGY -->
        <RadialGlowSection
            title="Built for Performance"
            subtitle="OUR PHILOSOPHY"
            content="We don't just build websites; we build digital assets. Our Code-First approach ensures your platform is fast, scalable, and ready for the future. By avoiding heavy, generic page builders, we deliver superior speed and complete customisation."
        />

        <!-- SELECTED WORK -->
        <section class="py-24 px-4">
            <div class="container mx-auto max-w-content-container">
                <ProjectHeadersSectionHeader subtitle="DIGITAL SOLUTIONS" title="Recent Projects" />
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ProjectCard
                        v-for="project in projects"
                        :key="project.title"
                        :project="project"
                    />
                </div>
                <div class="mt-12 text-center">
                    <Button as-child class="ease-in duration-300" size="wide" variant="outline">
                        <NuxtLink to="/work">View All</NuxtLink>
                    </Button>
                </div>
            </div>
        </section>

        <ProjectUtilitiesDivider />

        <!-- CTA -->
        <section
            class="py-32 px-4 bg-primary text-primary-foreground text-center relative overflow-hidden"
        >
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="container mx-auto max-w-2xl relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Ready to scale your digital presence?
                </h2>
                <p class="text-xl mb-10 opacity-90">
                    Let's discuss how we can help you achieve your goals.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button as-child class="h-14 px-8 text-lg" size="lg" variant="secondary">
                        <NuxtLink to="/contact">Start Your Project</NuxtLink>
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>
