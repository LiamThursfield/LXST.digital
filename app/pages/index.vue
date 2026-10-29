<script lang="ts" setup>
import BlinkCursor from '~/components/project/logos/BlinkCursor.vue';
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import LabelledRows from '~/components/project/utilities/LabelledRows.vue';
import type { LabelledRow } from '~/components/project/utilities/LabelledRows.vue';
import MetaList from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import ProjectCard from '~/components/project/marketing/ProjectCard.vue';
import SectionHeading from '~/components/project/headers/SectionHeading.vue';
import ServiceRow from '~/components/project/marketing/ServiceRow.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import StepGrid from '~/components/project/marketing/StepGrid.vue';
import type { Step } from '~/components/project/marketing/StepGrid.vue';
import { useData } from '~/composables/project/data';

useSeoMeta({
    title: 'LXST.digital | Websites & Web Apps, Properly Built',
    description:
        'A small studio building bespoke websites and web apps on real code, not page builders or templates.'
});

const { services, projects } = useData();
const [featured, ...others] = projects;

const facts = [
    { term: 'stack', value: 'laravel · nuxt · vue · react native' },
    { term: 'taking on', value: 'a handful of projects at a time' }
];

const steps: Array<Step> = [
    {
        label: 'step 1',
        title: 'a proper chat',
        text: "A call about your business, not a sales pitch. What's working, what isn't, what you actually need."
    },
    {
        label: 'step 2',
        title: 'scope & a fixed quote',
        text: "A written plan of what we'll build, how long it takes and what it costs. No surprises later."
    },
    {
        label: 'step 3',
        title: 'build in the open',
        text: 'You get a live preview link from the first week, so you see it take shape rather than waiting for a big reveal.'
    },
    {
        label: 'step 4',
        title: 'launch & look after',
        text: 'We put it live, show you the CMS, and stay around for updates, fixes and whatever comes next.'
    }
];

const reasons: Array<LabelledRow> = [
    {
        label: 'fast',
        text: 'No plugin bloat or builder overhead, just the code your page needs.'
    },
    {
        label: 'exactly yours',
        text: "Designed around your brand, not squeezed into someone else's theme."
    },
    {
        label: 'built to grow',
        text: 'Laravel and Nuxt foundations that can turn a website into a booking system, a dashboard or an app.'
    },
    {
        label: 'ai, used well',
        text: 'We use AI tools where they genuinely help. A developer still designs, reviews and understands every line that ships.'
    }
];
</script>

<template>
    <div>
        <!-- Hero -->
        <Container
            as="section"
            class="grid-split items-end gap-x-16 gap-y-12 pt-[clamp(3.5rem,9vw,8rem)] pb-[clamp(3.5rem,7vw,6rem)] [--split-min:20rem]"
        >
            <h1
                class="col-span-full max-w-[14ch] text-[clamp(3rem,8.4vw,7.75rem)] leading-[0.95] font-bold tracking-[-0.045em] text-balance"
            >
                properly built websites &amp; web apps<BlinkCursor />
            </h1>
            <p class="max-w-[34em] text-lead leading-normal text-foreground-soft text-pretty">
                lxst.digital is a small studio that builds on real code, not page builders or
                templates. Bespoke sites for barbers, bars, DJs and the people who run them, and web
                apps for businesses that have outgrown their spreadsheets.
            </p>
            <div class="flex flex-col gap-7">
                <MetaList :items="facts" />
                <div class="flex flex-wrap items-center gap-x-7 gap-y-3">
                    <Button as-child size="lg">
                        <NuxtLink to="/contact">tell us what you're building →</NuxtLink>
                    </Button>
                    <NuxtLink
                        class="py-3 underline decoration-border-strong underline-offset-6 transition-colors hover:text-highlight"
                        to="/work"
                    >
                        see the work
                    </NuxtLink>
                </div>
            </div>
        </Container>

        <SiteSection aria-labelledby="services-title">
            <SectionHeading id="services-title" label="~/services" title="what we do" />
            <div class="flex flex-col">
                <ServiceRow
                    v-for="(service, index) in services"
                    :key="service.slug"
                    :number="String(index + 1).padStart(2, '0')"
                    :service="service"
                    :to="`/services#${service.slug}`"
                />
            </div>
        </SiteSection>

        <SiteSection aria-labelledby="work-title">
            <SectionHeading
                id="work-title"
                label="~/work — all projects →"
                title="recent work"
                to="/work"
            />
            <ProjectCard v-if="featured" :project="featured" class="mb-18" variant="feature" />
            <div class="grid-split gap-x-12 gap-y-14 [--split-min:23.75rem]">
                <ProjectCard
                    v-for="(project, index) in others"
                    :key="project.slug"
                    :class="{ 'md:pt-[clamp(0px,8vw,7.5rem)]': index % 2 === 1 }"
                    :project="project"
                />
            </div>
        </SiteSection>

        <SiteSection aria-labelledby="process-title">
            <SectionHeading id="process-title" label="~/process" title="how a project runs" />
            <StepGrid :items="steps" accent="first" />
        </SiteSection>

        <SiteSection aria-labelledby="why-title" class="[--split-min:25rem]" split>
            <div>
                <MonoLabel>~/philosophy</MonoLabel>
                <h2
                    id="why-title"
                    class="mt-4 text-[clamp(2.25rem,4.6vw,4rem)] leading-none font-bold tracking-[-0.035em] text-balance"
                >
                    we build assets, not just websites.
                </h2>
            </div>
            <div class="flex flex-col gap-7">
                <p class="text-xl text-foreground-soft text-pretty">
                    Page builders are quick to start and slow forever after. Building on real code
                    means your site loads fast, looks exactly how it should, and can grow into
                    something bigger without starting again.
                </p>
                <LabelledRows :items="reasons" label-width="wide" />
            </div>
        </SiteSection>

        <CtaBand
            :cta="{ label: 'start a project →', href: '/contact' }"
            heading="got something in mind?"
        />
    </div>
</template>
