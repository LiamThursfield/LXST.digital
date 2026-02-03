<script lang="ts" setup>
import ContactForm from '@/components/project/marketing/ContactForm.vue';
import PageHeader from '~/components/project/headers/PageHeader.vue';
import RadialGlowSection from '~/components/project/marketing/RadialGlowSection.vue';
import ProjectCard from '~/components/project/marketing/ProjectCard.vue';
import { useData } from '~/composables/project/data';
import TechStackRow from '~/components/project/marketing/TechStackRow.vue';

useSeoMeta({
    title: 'Contact | LXST.digital',
    description: 'Start your project with LXST.digital. Contact us for a consultation.'
});

const { projects } = useData();
</script>

<template>
    <div>
        <PageHeader subtitle="LETS BUILD SOMETHING GREAT" title="Start Your Project" />

        <div class="container mx-auto max-w-4xl">
            <ProjectUtilitiesPageSection>
                <ContactForm />

                <div class="mt-16 text-center space-y-2 text-muted-foreground">
                    <p>Prefer email? Reach us at</p>
                    <a
                        class="text-primary font-bold text-lg hover:underline"
                        href="mailto:hello@lxst.digital"
                    >
                        hello@lxst.digital</a
                    >
                </div>
            </ProjectUtilitiesPageSection>
        </div>

        <ProjectUtilitiesDivider />

        <TechStackRow class="py-24" />

        <ProjectUtilitiesDivider />

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

        <RadialGlowSection
            content="We don't just build websites; we build digital assets. Our Code-First approach ensures your platform is fast, scalable, and ready for the future. By avoiding heavy, generic page builders, we deliver superior speed and complete customisation."
            subtitle="OUR PHILOSOPHY"
            title="Built for Performance"
        />
    </div>
</template>
