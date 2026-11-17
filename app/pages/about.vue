<script lang="ts" setup>
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import StepGrid from '~/components/project/marketing/StepGrid.vue';
import type { Step } from '~/components/project/marketing/StepGrid.vue';
import TagList from '~/components/project/utilities/TagList.vue';
import { lines, toCta, toItem, usePageContent } from '~/composables/project/cms';
import type { CtaBandView } from '~/composables/project/cms';
import type { AboutTemplate } from '~/lib/lxst-api/content';
import type { CmsImage } from '~/lib/lxst-api/types';

type AboutContent = {
    heroTitle: string;
    heroHighlight: string | null;
    approachLead: string;
    approachText: string;
    personName: string;
    personRole: string;
    personBio: string;
    personPhoto: CmsImage | null;
    principlesTitle: string;
    principles: Array<Step>;
    toolboxTitle: string;
    toolbox: Array<string>;
    cta: CtaBandView;
};

// Shown until the about page is published in LXST.admin
const fallback: AboutContent = {
    heroTitle: 'a small studio closing the gap between good design and properly built software.',
    heroHighlight: 'properly built',
    approachLead:
        "Great software comes from understanding what people actually need, then backing it with solid, scalable code. Templates and drag-and-drop builders can't give you that, so we build on real frameworks and engineer every part properly.",
    approachText:
        "We use AI where it genuinely helps, like any good tool, but nothing ships that a developer hasn't designed, reviewed and understood. That gives us, and you, the freedom to build exactly what was imagined, running fast enough that people stick around. It also means we only work with a handful of clients at a time. We're not a factory turning out websites; we'd rather be a partner you keep coming back to.",
    personName: 'liam',
    personRole: 'laravel & react native developer',
    personBio:
        "You'll deal with the person writing the code from the first call to launch. No account managers, no hand-offs.",
    personPhoto: null,
    principlesTitle: 'how we work',
    principles: [
        {
            label: '01',
            title: 'conversation first',
            text: 'The best products start with a real conversation, not a form and a quote.'
        },
        {
            label: '02',
            title: 'code-first',
            text: 'Real code, not builders, for speed, scale and complete freedom over how it looks.'
        },
        {
            label: '03',
            title: 'quality over quantity',
            text: 'A select number of clients, so every project gets the attention it deserves.'
        },
        {
            label: '04',
            title: 'plain english',
            text: "You'll always know what's being built and why, without the jargon."
        }
    ],
    toolboxTitle: 'the toolbox',
    toolbox: ['laravel', 'nuxt', 'vue', 'react native', 'tailwind', 'aws', 'cloudflare'],
    cta: { heading: 'say hello.', cta: { label: 'start a project →', href: '/contact' } }
};

const content = await usePageContent<AboutTemplate, AboutContent>(
    '/about',
    (cms) => ({
        heroTitle: cms.hero_title,
        heroHighlight: cms.hero_highlight,
        approachLead: cms.approach_lead,
        approachText: cms.approach_text,
        personName: cms.person_name,
        personRole: cms.person_role,
        personBio: cms.person_bio,
        personPhoto: cms.person_photo,
        principlesTitle: cms.principles_title,
        principles: cms.principles.map(toItem),
        toolboxTitle: cms.toolbox_title,
        toolbox: lines(cms.toolbox),
        cta: toCta(cms.cta, fallback.cta)
    }),
    {
        content: fallback,
        seo: {
            title: 'About | LXST.digital',
            description:
                'A small studio closing the gap between good design and properly built software.'
        }
    }
);

// The title split around the words shown in green (the first time they appear)
const heroTitle = computed(() => {
    const { heroTitle: title, heroHighlight: highlight } = content.value;
    const at = highlight ? title.indexOf(highlight) : -1;

    return at === -1
        ? { before: title, highlight: '', after: '' }
        : {
              before: title.slice(0, at),
              highlight: highlight!,
              after: title.slice(at + highlight!.length)
          };
});
</script>

<template>
    <div>
        <PageHero label="~/about" size="statement">
            {{ heroTitle.before
            }}<span v-if="heroTitle.highlight" class="text-highlight">{{
                heroTitle.highlight
            }}</span
            >{{ heroTitle.after }}
        </PageHero>

        <SiteSection aria-label="Our approach" split>
            <p class="text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.45] text-pretty">
                {{ content.approachLead }}
            </p>
            <p class="text-muted-foreground text-pretty">{{ content.approachText }}</p>
        </SiteSection>

        <SiteSection aria-labelledby="who-title">
            <div class="flex flex-wrap items-start gap-x-20 gap-y-10">
                <MediaFrame
                    :alt="content.personPhoto?.alt ?? content.personName"
                    :src="content.personPhoto?.url"
                    class="aspect-4/5 max-w-[28.75rem] flex-[1_1_20rem]"
                    label="[photo: liam, ideally at work, not a headshot]"
                />
                <div class="flex flex-[1_1_22.5rem] flex-col gap-5">
                    <MonoLabel>who you'll be talking to</MonoLabel>
                    <h2
                        id="who-title"
                        class="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none font-bold tracking-[-0.035em]"
                    >
                        {{ content.personName }}
                    </h2>
                    <MonoLabel tone="highlight">{{ content.personRole }}</MonoLabel>
                    <p class="max-w-[34em] text-foreground-soft">{{ content.personBio }}</p>
                </div>
            </div>
        </SiteSection>

        <SiteSection aria-labelledby="principles-title">
            <h2 id="principles-title" class="mb-10 text-heading font-bold">
                {{ content.principlesTitle }}
            </h2>
            <StepGrid :items="content.principles" />
        </SiteSection>

        <SiteSection aria-labelledby="tools-title" class="[--split-min:18.75rem]" split>
            <h2 id="tools-title" class="text-subheading font-bold">{{ content.toolboxTitle }}</h2>
            <TagList :items="content.toolbox" />
        </SiteSection>

        <CtaBand :cta="content.cta.cta" :heading="content.cta.heading" />
    </div>
</template>
