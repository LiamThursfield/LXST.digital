<script lang="ts" setup>
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import StepGrid from '~/components/project/marketing/StepGrid.vue';
import type { Step } from '~/components/project/marketing/StepGrid.vue';
import TagList from '~/components/project/utilities/TagList.vue';

useSeoMeta({
    title: 'About | LXST.digital',
    description: 'A small studio closing the gap between good design and properly built software.'
});

const principles: Array<Step> = [
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
];

const toolbox = ['laravel', 'nuxt', 'vue', 'react native', 'tailwind', 'aws', 'cloudflare'];
</script>

<template>
    <div>
        <PageHero label="~/about" size="statement">
            a small studio closing the gap between good design and
            <span class="text-highlight">properly built</span> software.
        </PageHero>

        <SiteSection aria-label="Our approach" split>
            <p class="text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.45] text-pretty">
                Great software comes from understanding what people actually need, then backing it
                with solid, scalable code. Templates and drag-and-drop builders can't give you that,
                so we build on real frameworks and engineer every part properly.
            </p>
            <p class="text-muted-foreground text-pretty">
                We use AI where it genuinely helps, like any good tool, but nothing ships that a
                developer hasn't designed, reviewed and understood. That gives us, and you, the
                freedom to build exactly what was imagined, running fast enough that people stick
                around. It also means we only work with a handful of clients at a time. We're not a
                factory turning out websites; we'd rather be a partner you keep coming back to.
            </p>
        </SiteSection>

        <SiteSection aria-labelledby="who-title">
            <div class="flex flex-wrap items-start gap-x-20 gap-y-10">
                <!-- TODO: replace with a photo of Liam, ideally at work rather than a headshot -->
                <MediaFrame
                    class="aspect-4/5 max-w-[28.75rem] flex-[1_1_20rem]"
                    label="[photo: liam, ideally at work, not a headshot]"
                />
                <div class="flex flex-[1_1_22.5rem] flex-col gap-5">
                    <MonoLabel>who you'll be talking to</MonoLabel>
                    <h2
                        id="who-title"
                        class="text-[clamp(2.25rem,4.4vw,3.75rem)] leading-none font-bold tracking-[-0.035em]"
                    >
                        liam
                    </h2>
                    <MonoLabel tone="highlight">laravel &amp; react native developer</MonoLabel>
                    <p class="max-w-[34em] text-foreground-soft">
                        You'll deal with the person writing the code from the first call to launch.
                        No account managers, no hand-offs.
                    </p>
                </div>
            </div>
        </SiteSection>

        <SiteSection aria-labelledby="principles-title">
            <h2 id="principles-title" class="mb-10 text-heading font-bold">how we work</h2>
            <StepGrid :items="principles" />
        </SiteSection>

        <SiteSection aria-labelledby="tools-title" class="[--split-min:18.75rem]" split>
            <h2 id="tools-title" class="text-subheading font-bold">the toolbox</h2>
            <TagList :items="toolbox" />
        </SiteSection>

        <CtaBand :cta="{ label: 'start a project →', href: '/contact' }" heading="say hello." />
    </div>
</template>
