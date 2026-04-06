<script lang="ts" setup>
import ProjectCard from '@/components/project/marketing/ProjectCard.vue';
import TechStackRow from '@/components/project/marketing/TechStackRow.vue';
import RadialGlowSection from '~/components/project/marketing/RadialGlowSection.vue';
import { useData } from '~/composables/project/data';

useSeoMeta({
    title: 'LXST.digital | Digital Product Agency',
    description:
        'Bespoke websites and web applications for forward-thinking brands. Powered by Nuxt, Vue, and Laravel.'
});

const { projects, services } = useData();
</script>

<template>
    <div class="flex flex-col">
        <!-- Header Spacer -->
        <div class="mt-22" />

        <!-- HERO -->
        <ProjectHeroesHeroWithCTA
            :primary-cta="{
                label: 'Let\'s Chat',
                href: '/contact'
            }"
            :secondary-cta="{
                label: 'Our Work',
                href: '/work'
            }"
            heading="Crafting Digital Experiences With A Human Touch"
            subheading="DIGITAL PRODUCT AGENCY"
        />

        <!-- SERVICES -->
        <ProjectUtilitiesPageSection>
            <ProjectHeadersSectionHeader subtitle="DIGITAL SERVICES" title="What We Offer" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProjectMarketingServiceCard
                    v-for="service in services"
                    :key="service.title"
                    v-bind="service"
                />
            </div>
        </ProjectUtilitiesPageSection>

        <ProjectUtilitiesDivider />

        <TechStackRow class="py-24" />

        <ProjectUtilitiesDivider />

        <!-- METHODOLOGY -->
        <RadialGlowSection
            content="We don't just build websites; we build digital assets. Our Code-First approach ensures your platform is fast, scalable, and ready for the future. By avoiding heavy, generic page builders, we deliver superior speed and complete customisation."
            subtitle="OUR PHILOSOPHY"
            title="Built for Performance"
        />

        <!-- SELECTED WORK -->
        <ProjectUtilitiesPageSection>
            <ProjectHeadersSectionHeader subtitle="DIGITAL SOLUTIONS" title="Recent Projects" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
            </div>
            <div class="mt-12 text-center">
                <Button as-child class="ease-in duration-300" size="wide" variant="outline">
                    <NuxtLink to="/work">View All</NuxtLink>
                </Button>
            </div>
        </ProjectUtilitiesPageSection>

        <ProjectUtilitiesDivider />

        <section
            class="py-32 px-4 bg-primary text-primary-foreground text-center relative overflow-hidden"
        >
            <div class="absolute inset-0 bg-black/30"></div>
            <div class="container mx-auto max-w-2xl relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Ready to scale your digital presence?
                </h2>
                <p class="text-xl mb-10 opacity-90">
                    Let's discuss how we can help you achieve your goals.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button as-child class="h-14 px-8 text-lg" size="lg" variant="secondary">
                        <NuxtLink to="/contact">Let's Chat</NuxtLink>
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>
