<script lang="ts" setup>
import BlinkCursor from '~/components/project/logos/BlinkCursor.vue';
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import LabelledRows from '~/components/project/utilities/LabelledRows.vue';
import type { LabelledRow } from '~/components/project/utilities/LabelledRows.vue';
import MetaList from '~/components/project/utilities/MetaList.vue';
import type { MetaItem } from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import ProjectCard from '~/components/project/marketing/ProjectCard.vue';
import SectionHeading from '~/components/project/headers/SectionHeading.vue';
import ServiceRow from '~/components/project/marketing/ServiceRow.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import StepGrid from '~/components/project/marketing/StepGrid.vue';
import type { Step } from '~/components/project/marketing/StepGrid.vue';
import type { LinkWithLabel } from '~/components/project/types';
import {
    toCta,
    toItem,
    toLink,
    useProjects,
    usePageContent,
    useServices
} from '~/composables/project/cms';
import type { CtaBandView } from '~/composables/project/cms';
import type { HomeTemplate } from '~/lib/lxst-api/content';

type HomeContent = {
    heroTitle: string;
    heroLead: string;
    heroFacts: Array<MetaItem>;
    heroCta: LinkWithLabel;
    heroSecondary: LinkWithLabel | null;
    servicesTitle: string;
    workTitle: string;
    processTitle: string;
    processSteps: Array<Step>;
    philosophyTitle: string;
    philosophyText: string;
    philosophyReasons: Array<LabelledRow>;
    cta: CtaBandView;
};

// Shown until the home page is published in LXST.admin
const fallback: HomeContent = {
    heroTitle: 'properly built websites & web apps',
    heroLead:
        'lxst.digital is a small studio that builds on real code, not page builders or templates. Bespoke sites for barbers, bars, DJs and the people who run them, and web apps for businesses that have outgrown their spreadsheets.',
    heroFacts: [
        { term: 'stack', value: 'laravel · nuxt · vue · react native' },
        { term: 'taking on', value: 'a handful of projects at a time' }
    ],
    heroCta: { label: "tell us what you're building →", href: '/contact' },
    heroSecondary: { label: 'see the work', href: '/work' },
    servicesTitle: 'what we do',
    workTitle: 'recent work',
    processTitle: 'how a project runs',
    processSteps: [
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
    ],
    philosophyTitle: 'we build assets, not just websites.',
    philosophyText:
        'Page builders are quick to start and slow forever after. Building on real code means your site loads fast, looks exactly how it should, and can grow into something bigger without starting again.',
    philosophyReasons: [
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
    ],
    cta: {
        heading: 'got something in mind?',
        cta: { label: 'start a project →', href: '/contact' }
    }
};

const content = await usePageContent<HomeTemplate, HomeContent>(
    '/',
    (cms) => ({
        heroTitle: cms.hero_title,
        heroLead: cms.hero_lead,
        heroFacts: cms.hero_facts,
        heroCta: toLink(cms.hero_cta_label, cms.hero_cta_link) ?? fallback.heroCta,
        heroSecondary: toLink(cms.hero_secondary_label, cms.hero_secondary_link),
        servicesTitle: cms.services_title,
        workTitle: cms.work_title,
        processTitle: cms.process_title,
        processSteps: cms.process_steps.map(toItem),
        philosophyTitle: cms.philosophy_title,
        philosophyText: cms.philosophy_text,
        philosophyReasons: cms.philosophy_reasons.map(toItem),
        cta: toCta(cms.cta, fallback.cta)
    }),
    {
        content: fallback,
        seo: {
            title: 'LXST.digital | Websites & Web Apps, Properly Built',
            description:
                'A small studio building bespoke websites and web apps on real code, not page builders or templates.'
        }
    }
);

const services = await useServices();
const projects = await useProjects();
const featured = computed(() => projects.value[0]);
const others = computed(() => projects.value.slice(1));
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
                {{ content.heroTitle }}<BlinkCursor />
            </h1>
            <p class="max-w-[34em] text-lead leading-normal text-foreground-soft text-pretty">
                {{ content.heroLead }}
            </p>
            <div class="flex flex-col gap-7">
                <MetaList v-if="content.heroFacts.length" :items="content.heroFacts" />
                <div class="flex flex-wrap items-center gap-x-7 gap-y-3">
                    <Button as-child size="lg">
                        <NuxtLink :to="content.heroCta.href">{{ content.heroCta.label }}</NuxtLink>
                    </Button>
                    <NuxtLink
                        v-if="content.heroSecondary"
                        :to="content.heroSecondary.href"
                        class="py-3 underline decoration-border-strong underline-offset-6 transition-colors hover:text-highlight"
                    >
                        {{ content.heroSecondary.label }}
                    </NuxtLink>
                </div>
            </div>
        </Container>

        <SiteSection aria-labelledby="services-title">
            <SectionHeading id="services-title" :title="content.servicesTitle" label="~/services" />
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
                :title="content.workTitle"
                label="~/work — all projects →"
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
            <SectionHeading id="process-title" :title="content.processTitle" label="~/process" />
            <StepGrid :items="content.processSteps" accent="first" />
        </SiteSection>

        <SiteSection aria-labelledby="why-title" class="[--split-min:25rem]" split>
            <div>
                <MonoLabel>~/philosophy</MonoLabel>
                <h2
                    id="why-title"
                    class="mt-4 text-[clamp(2.25rem,4.6vw,4rem)] leading-none font-bold tracking-[-0.035em] text-balance"
                >
                    {{ content.philosophyTitle }}
                </h2>
            </div>
            <div class="flex flex-col gap-7">
                <p class="text-xl text-foreground-soft text-pretty">
                    {{ content.philosophyText }}
                </p>
                <LabelledRows :items="content.philosophyReasons" label-width="wide" />
            </div>
        </SiteSection>

        <CtaBand :cta="content.cta.cta" :heading="content.cta.heading" />
    </div>
</template>
