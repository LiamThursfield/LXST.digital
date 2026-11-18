<script lang="ts" setup>
import ChoiceChips from '~/components/project/utilities/ChoiceChips.vue';
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import ProjectRow from '~/components/project/marketing/ProjectRow.vue';
import { toCta, usePageContent, useProjects } from '~/composables/project/cms';
import type { CtaBandView } from '~/composables/project/cms';
import type { WorkTemplate } from '~/lib/lxst-api/content';

type WorkContent = { heroTitle: string; heroLead: string; cta: CtaBandView };

// Shown until the work page is published in LXST.admin
const fallback: WorkContent = {
    heroTitle: 'the work',
    heroLead:
        "A few recent projects, from a barbershop's new home online to a tool DJs use to make their tags.",
    cta: { heading: 'yours could be next.', cta: { label: 'start a project →', href: '/contact' } }
};

const content = await usePageContent<WorkTemplate, WorkContent>(
    '/work',
    (cms) => ({
        heroTitle: cms.hero_title,
        heroLead: cms.hero_lead,
        cta: toCta(cms.cta, fallback.cta)
    }),
    {
        content: fallback,
        seo: {
            title: 'Work | LXST.digital',
            description:
                'Recent projects, from bespoke websites for barbers and DJs to web applications for artists.'
        }
    }
);

const projects = await useProjects();

const filters = [
    { value: 'all', label: 'everything' },
    { value: 'site', label: 'websites' },
    { value: 'app', label: 'web apps' }
];
const filter = ref('all');

const shown = computed(() =>
    projects.value.filter((project) => filter.value === 'all' || project.kind === filter.value)
);

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
    <div>
        <PageHero label="~/work">
            {{ content.heroTitle }}
            <template #lead>{{ content.heroLead }}</template>
        </PageHero>

        <Container class="pb-[clamp(3.5rem,7vw,6rem)]">
            <ChoiceChips
                v-model="filter"
                :options="filters"
                aria-label="Filter projects"
                class="mb-10"
                role="group"
            />

            <section aria-label="Projects">
                <ProjectRow
                    v-for="(project, index) in shown"
                    :key="project.slug"
                    :number="`${pad(index + 1)} / ${pad(shown.length)}`"
                    :project="project"
                />
            </section>
        </Container>

        <CtaBand :cta="content.cta.cta" :heading="content.cta.heading" />
    </div>
</template>
