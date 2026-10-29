<script lang="ts" setup>
import ChoiceChips from '~/components/project/utilities/ChoiceChips.vue';
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import ProjectRow from '~/components/project/marketing/ProjectRow.vue';
import { useData } from '~/composables/project/data';

useSeoMeta({
    title: 'Work | LXST.digital',
    description:
        'Recent projects, from bespoke websites for barbers and DJs to web applications for artists.'
});

const { projects } = useData();

const filters = [
    { value: 'all', label: 'everything' },
    { value: 'site', label: 'websites' },
    { value: 'app', label: 'web apps' }
];
const filter = ref('all');

const shown = computed(() =>
    projects.filter((project) => filter.value === 'all' || project.kind === filter.value)
);

const pad = (n: number) => String(n).padStart(2, '0');
</script>

<template>
    <div>
        <PageHero label="~/work">
            the work
            <template #lead>
                A few recent projects, from a barbershop's new home online to a tool DJs use to make
                their tags.
            </template>
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

        <CtaBand
            :cta="{ label: 'start a project →', href: '/contact' }"
            heading="yours could be next."
        />
    </div>
</template>
