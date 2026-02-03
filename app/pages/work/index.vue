<script lang="ts" setup>
import PageHeader from '~/components/project/headers/PageHeader.vue';
import ProjectCard from '@/components/project/marketing/ProjectCard.vue';
import { useData } from '~/composables/project/data';
import RadialGlowSection from '~/components/project/marketing/RadialGlowSection.vue';

useSeoMeta({
    title: 'Our Work | LXST.digital',
    description:
        'A showcase of our recent projects, from bespoke websites to complex web applications.'
});

const { projects } = useData();
</script>

<template>
    <div>
        <PageHeader
            title="Our Work"
            subtitle="DIGITAL SOLUTIONS"
            description="A showcase of our recent projects, from bespoke websites to complex web applications."
        />

        <ProjectUtilitiesPageSection>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
            </div>

            <div class="mt-24 text-center">
                <Button as-child size="wide" class="ease-out duration-300">
                    <NuxtLink to="/contact">Let's Work Together</NuxtLink>
                </Button>
            </div>
        </ProjectUtilitiesPageSection>

        <RadialGlowSection
            title="Built for Performance"
            subtitle="OUR PHILOSOPHY"
            content="We don't just build websites; we build digital assets. Our Code-First approach ensures your platform is fast, scalable, and ready for the future. By avoiding heavy, generic page builders, we deliver superior speed and complete customisation."
        />
    </div>
</template>
