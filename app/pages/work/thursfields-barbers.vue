<script lang="ts" setup>
import Container from '~/components/project/utilities/Container.vue';
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import LabelledRows from '~/components/project/utilities/LabelledRows.vue';
import type { LabelledRow } from '~/components/project/utilities/LabelledRows.vue';
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import MetaList from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import PageHero from '~/components/project/headers/PageHero.vue';

useSeoMeta({
    title: 'Thursfields Barbers case study | LXST.digital',
    description:
        'A premium brand experience for a modern barbershop, built so the people cutting hair can run their own website.'
});

// TODO: Every bracketed value below is a placeholder from the design and needs real content before launch
const facts = [
    { term: 'client', value: 'Thursfields Barbers, [TOWN]' },
    { term: 'what we did', value: 'design, build, custom CMS' },
    { term: 'launched', value: '[MONTH YEAR]' }
];

const brief =
    "[Write 2–3 sentences in the client's terms: where they were before, what wasn't working, and what they wanted the site to do.]";

const built: Array<LabelledRow> = [
    {
        label: '01',
        title: 'a brand-led design',
        text: "Designed from scratch around the shop's identity, not adapted from a theme."
    },
    {
        label: '02',
        title: 'a custom CMS',
        text: 'The team updates [PRICES / BARBERS / GALLERY] themselves, in a few clicks.'
    },
    {
        label: '03',
        title: 'booking, front and centre',
        text: 'Connected to [BOOKING PROVIDER] so every page leads to an appointment.'
    },
    {
        label: '04',
        title: 'fast and findable',
        text: 'Lightweight pages and local SEO so people searching nearby find them first.'
    }
];

const stack = [
    { term: 'frontend', value: '[e.g. nuxt · tailwind]' },
    { term: 'cms', value: '[e.g. laravel admin]' },
    { term: 'hosting', value: '[e.g. cloudflare]' },
    { term: 'integrations', value: '[BOOKING PROVIDER]' }
];

const quote = {
    text: "[A real quote from the client about working together or what's changed since launch.]",
    author: '[NAME], [ROLE] at Thursfields Barbers'
};
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

        <PageHero compact label="case study · bespoke website">
            thursfields barbers
            <template #lead>
                A premium brand experience for a modern barbershop, built so the people cutting hair
                can run their own website.
            </template>
        </PageHero>

        <Container>
            <dl
                class="grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] border-y border-border"
            >
                <div v-for="fact in facts" :key="fact.term" class="flex flex-col gap-1.5 py-5 pr-6">
                    <dt class="font-mono text-[0.8125rem] text-muted-foreground">
                        {{ fact.term }}
                    </dt>
                    <dd class="text-[1.0625rem]">{{ fact.value }}</dd>
                </div>
                <div class="flex flex-col gap-1.5 py-5 pr-6">
                    <dt class="font-mono text-[0.8125rem] text-muted-foreground">live site</dt>
                    <dd class="text-[1.0625rem]">
                        <a
                            class="underline decoration-highlight underline-offset-5 hover:text-highlight"
                            href="https://thursfieldsbarbers.com/?utm_source=lxst.digital"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            thursfieldsbarbers.com ↗
                        </a>
                    </dd>
                </div>
            </dl>

            <MediaFrame
                alt="Thursfields Barbers homepage"
                class="mt-[clamp(2.5rem,5vw,4rem)] aspect-2/1"
                src="/images/projects/thursfields-barbers-thumbnail.png"
            />
        </Container>

        <Container
            aria-labelledby="brief-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="brief-title" class="text-subheading font-bold">the brief</h2>
            <p class="max-w-[40em] text-xl text-foreground-soft text-pretty">{{ brief }}</p>
        </Container>

        <Container
            aria-labelledby="built-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="built-title" class="text-subheading font-bold">what we built</h2>
            <LabelledRows :items="built" />
        </Container>

        <Container class="grid-split gap-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]">
            <MediaFrame class="aspect-4/5" label="[screenshot: mobile, booking flow]" />
            <MediaFrame class="aspect-4/5" label="[screenshot: the CMS editing screen]" />
        </Container>

        <Container
            aria-labelledby="stack-title"
            as="section"
            class="grid-split gap-x-20 gap-y-6 pt-[clamp(3.5rem,7vw,6rem)] [--split-min:18.75rem]"
        >
            <h2 id="stack-title" class="text-subheading font-bold">under the hood</h2>
            <MetaList :items="stack" size="md" />
        </Container>

        <Container aria-label="Client feedback" as="section" class="py-[clamp(3.5rem,7vw,6rem)]">
            <figure class="flex max-w-[61.25rem] flex-col gap-5 border-t-2 border-primary pt-8">
                <blockquote
                    class="text-[clamp(1.625rem,3vw,2.5rem)] leading-[1.2] font-medium tracking-[-0.02em] text-pretty"
                >
                    {{ quote.text }}
                </blockquote>
                <MonoLabel as="figcaption">{{ quote.author }}</MonoLabel>
            </figure>
        </Container>

        <section aria-label="Next project" class="border-t border-border">
            <Container>
                <NuxtLink
                    class="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 py-12 transition-colors hover:text-highlight"
                    to="/work"
                >
                    <MonoLabel>next project</MonoLabel>
                    <span
                        class="text-[clamp(2rem,4.6vw,4rem)] leading-none font-bold tracking-[-0.04em]"
                    >
                        moss &amp; field →
                    </span>
                </NuxtLink>
            </Container>
        </section>

        <CtaBand
            :cta="{ label: 'start a project →', href: '/contact' }"
            heading="want something like this?"
        />
    </article>
</template>
