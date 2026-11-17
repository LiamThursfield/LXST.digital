<script lang="ts" setup>
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import LabelledRows from '~/components/project/utilities/LabelledRows.vue';
import type { LabelledRow } from '~/components/project/utilities/LabelledRows.vue';
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import MetaList from '~/components/project/utilities/MetaList.vue';
import type { MetaItem } from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import type { LinkWithLabel } from '~/components/project/types';
import { toCta, toItem, toLink, usePageContent } from '~/composables/project/cms';
import type { CtaBandView } from '~/composables/project/cms';
import type { CaseStudyTemplate } from '~/lib/lxst-api/content';

// Any page under Work in LXST.admin using the case study template
type CaseStudyContent = {
    label: string;
    title: string;
    lead: string;
    facts: Array<MetaItem>;
    liveSite: LinkWithLabel | null;
    image: { src: string; alt: string } | null;
    brief: string;
    built: Array<LabelledRow>;
    stack: Array<MetaItem>;
    quote: { text: string; author: string } | null;
    nextProject: LinkWithLabel | null;
    cta: CtaBandView;
};

const cta: CtaBandView = {
    heading: 'want something like this?',
    cta: { label: 'start a project →', href: '/contact' }
};

// Thursfields' case study, shown until its page is published in LXST.admin.
// TODO: Every bracketed value below is a placeholder and needs real content before launch
const fallbacks: Record<
    string,
    { content: CaseStudyContent; seo: { title: string; description: string } }
> = {
    'thursfields-barbers': {
        content: {
            label: 'case study · bespoke website',
            title: 'thursfields barbers',
            lead: 'A premium brand experience for a modern barbershop, built so the people cutting hair can run their own website.',
            facts: [
                { term: 'client', value: 'Thursfields Barbers, Stoke-on-Trent' },
                { term: 'what we did', value: 'design, build, custom CMS' },
                { term: 'launched', value: '2025' }
            ],
            liveSite: {
                label: 'thursfieldsbarbers.com ↗',
                href: 'https://thursfieldsbarbers.com/?utm_source=lxst.digital'
            },
            image: {
                src: '/images/projects/thursfields-barbers-thumbnail.png',
                alt: 'Thursfields Barbers homepage'
            },
            brief: "[Write 2–3 sentences in the client's terms: where they were before, what wasn't working, and what they wanted the site to do.]",
            built: [
                {
                    label: '01',
                    title: 'a brand-led design',
                    text: "Designed from scratch around the shop's identity, not adapted from a theme."
                },
                {
                    label: '02',
                    title: 'a custom CMS',
                    text: 'The team updates prices, opening times and the gallery themselves, in a few clicks.'
                },
                {
                    label: '03',
                    title: 'booking, front and centre',
                    text: 'Connected to Booksy so every page leads to an appointment.'
                },
                {
                    label: '04',
                    title: 'fast and findable',
                    text: 'Lightweight pages and local SEO so people searching nearby find them first.'
                }
            ],
            stack: [
                { term: 'frontend', value: '[e.g. nuxt · tailwind]' },
                { term: 'cms', value: '[e.g. laravel admin]' },
                { term: 'hosting', value: 'vercel' },
                { term: 'integrations', value: 'booksy' }
            ],
            quote: {
                text: "[A real quote from the client about working together or what's changed since launch.]",
                author: '[NAME], [ROLE] at Thursfields Barbers'
            },
            // Hidden until there's more than one case study
            nextProject: null,
            cta
        },
        seo: {
            title: 'Thursfields Barbers case study | LXST.digital',
            description:
                'A premium brand experience for a modern barbershop, built so the people cutting hair can run their own website.'
        }
    }
};

const slug = useRoute().params.slug as string;

const content = await usePageContent<CaseStudyTemplate, CaseStudyContent>(
    `/work/${slug}`,
    (cms) => ({
        label: cms.hero_label,
        title: cms.hero_title,
        lead: cms.hero_lead,
        facts: cms.facts,
        liveSite: toLink(cms.live_site_label, cms.live_site),
        image: cms.hero_image
            ? { src: cms.hero_image.url, alt: cms.hero_image.alt ?? cms.hero_title }
            : null,
        brief: cms.brief,
        built: cms.built.map(toItem),
        stack: cms.stack,
        quote:
            cms.quote_text && cms.quote_author
                ? { text: cms.quote_text, author: cms.quote_author }
                : null,
        nextProject: toLink(cms.next_project_label, cms.next_project_link),
        cta: toCta(cms.cta, cta)
    }),
    fallbacks[slug] ?? null
);
</script>

<template>
    <article>
        <Container class="pt-10">
            <NuxtLink
                class="inline-block py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-highlight"
                to="/work"
            >
                ← ~/work
            </NuxtLink>
        </Container>

        <PageHero :label="content.label" compact>
            {{ content.title }}
            <template #lead>{{ content.lead }}</template>
        </PageHero>

        <Container>
            <dl
                class="grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] border-y border-border"
            >
                <div
                    v-for="fact in content.facts"
                    :key="fact.term"
                    class="flex flex-col gap-1.5 py-5 pr-6"
                >
                    <dt class="font-mono text-[0.8125rem] text-muted-foreground">
                        {{ fact.term }}
                    </dt>
                    <dd class="text-[1.0625rem]">{{ fact.value }}</dd>
                </div>
                <div v-if="content.liveSite" class="flex flex-col gap-1.5 py-5 pr-6">
                    <dt class="font-mono text-[0.8125rem] text-muted-foreground">live site</dt>
                    <dd class="text-[1.0625rem]">
                        <a
                            :href="content.liveSite.href"
                            class="underline decoration-highlight underline-offset-5 hover:text-highlight"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {{ content.liveSite.label }}
                        </a>
                    </dd>
                </div>
            </dl>

            <MediaFrame
                v-if="content.image"
                :alt="content.image.alt"
                :src="content.image.src"
                class="mt-[clamp(2.5rem,5vw,4rem)] aspect-2/1"
            />
        </Container>

        <Container
            aria-labelledby="brief-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="brief-title" class="text-subheading font-bold">the brief</h2>
            <p class="max-w-[40em] text-xl text-foreground-soft text-pretty">{{ content.brief }}</p>
        </Container>

        <Container
            v-if="content.built.length"
            aria-labelledby="built-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="built-title" class="text-subheading font-bold">what we built</h2>
            <LabelledRows :items="content.built" />
        </Container>

        <Container
            v-if="content.stack.length"
            aria-labelledby="stack-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="stack-title" class="text-subheading font-bold">under the hood</h2>
            <MetaList :items="content.stack" size="md" />
        </Container>

        <Container
            v-if="content.quote"
            aria-label="Client feedback"
            as="section"
            class="pt-[clamp(3.5rem,7vw,6rem)]"
        >
            <figure class="flex max-w-[61.25rem] flex-col gap-5 border-t-2 border-primary pt-8">
                <blockquote
                    class="text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.02em] text-pretty"
                >
                    {{ content.quote.text }}
                </blockquote>
                <MonoLabel as="figcaption">{{ content.quote.author }}</MonoLabel>
            </figure>
        </Container>

        <div class="pt-[clamp(3.5rem,7vw,6rem)]" />

        <section
            v-if="content.nextProject"
            aria-label="Next project"
            class="border-t border-border"
        >
            <Container>
                <NuxtLink
                    :to="content.nextProject.href"
                    class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-12 transition-colors hover:text-highlight"
                >
                    <MonoLabel>next project</MonoLabel>
                    <span
                        class="text-[clamp(2rem,4.6vw,4rem)] leading-none font-bold tracking-[-0.04em]"
                    >
                        {{ content.nextProject.label }}
                    </span>
                </NuxtLink>
            </Container>
        </section>

        <CtaBand :cta="content.cta.cta" :heading="content.cta.heading" />
    </article>
</template>
