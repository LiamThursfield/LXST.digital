<script lang="ts" setup>
import BlinkCursor from '~/components/project/logos/BlinkCursor.vue';
import ContactForm from '~/components/project/marketing/ContactForm.vue';
import Container from '~/components/project/utilities/Container.vue';
import LabelledRows from '~/components/project/utilities/LabelledRows.vue';
import type { LabelledRow } from '~/components/project/utilities/LabelledRows.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import type { LinkWithLabel } from '~/components/project/types';
import { toItem, toLink, usePageContent } from '~/composables/project/cms';
import { useNavigation } from '~/composables/project/navigation';
import type { ContactTemplate } from '~/lib/lxst-api/content';

type ContactContent = {
    heroTitle: string;
    heroLead: string;
    emailLabel: string;
    social: LinkWithLabel | null;
    nextStepsTitle: string;
    nextSteps: Array<LabelledRow>;
    formSlug: string;
};

// Shown until the contact page is published in LXST.admin
const fallback: ContactContent = {
    heroTitle: "let's chat",
    heroLead:
        "Tell us a bit about what you're building. It doesn't need to be polished, a few sentences is plenty.",
    emailLabel: 'prefer email?',
    social: { label: 'or DM us on instagram ↗', href: 'https://instagram.com/lxst.digital' },
    nextStepsTitle: 'what happens next',
    nextSteps: [
        { label: '01', text: 'We read it and reply by email.' },
        { label: '02', text: 'A no-pressure call to talk it through.' },
        { label: '03', text: 'A written plan with a fixed quote.' }
    ],
    formSlug: 'contact'
};

const content = await usePageContent<ContactTemplate, ContactContent>(
    '/contact',
    (cms) => ({
        heroTitle: cms.hero_title,
        heroLead: cms.hero_lead,
        emailLabel: cms.email_label,
        social: toLink(cms.social_label, cms.social_link),
        nextStepsTitle: cms.next_steps_title,
        nextSteps: cms.next_steps.map(toItem),
        formSlug: cms.form?.slug ?? fallback.formSlug
    }),
    {
        content: fallback,
        seo: {
            title: 'Contact | LXST.digital',
            description: "Tell us about what you're building. A few sentences is plenty."
        }
    }
);

const { email } = useNavigation();
</script>

<template>
    <!-- The whole page sits in the opposite mode to the rest of the site -->
    <div class="invert-theme bg-background text-foreground">
        <Container class="flex flex-wrap items-start gap-x-24 gap-y-14 py-hero">
            <section
                aria-labelledby="contact-title"
                class="flex flex-[1_1_21.25rem] flex-col gap-7"
            >
                <MonoLabel>~/contact</MonoLabel>
                <h1
                    id="contact-title"
                    class="text-[clamp(3.25rem,7.4vw,6.75rem)] leading-[0.92] font-bold tracking-[-0.045em]"
                >
                    {{ content.heroTitle }}<BlinkCursor class="h-[0.1em] w-[0.4em] bg-foreground" />
                </h1>
                <p class="max-w-[26em] text-xl text-foreground-soft text-pretty">
                    {{ content.heroLead }}
                </p>

                <div class="flex flex-col gap-1">
                    <MonoLabel tone="subtle">{{ content.emailLabel }}</MonoLabel>
                    <a
                        :href="`mailto:${email}`"
                        class="self-start py-1 text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.02em] underline decoration-highlight decoration-2 underline-offset-6 hover:no-underline"
                    >
                        {{ email }}
                    </a>
                    <a
                        v-if="content.social"
                        :href="content.social.href"
                        class="self-start py-1.5 text-[1.0625rem] hover:text-highlight"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {{ content.social.label }}
                    </a>
                </div>

                <div class="mt-2 flex flex-col">
                    <MonoLabel class="mb-3" tone="subtle">{{ content.nextStepsTitle }}</MonoLabel>
                    <LabelledRows :items="content.nextSteps" as="ol" />
                </div>
            </section>

            <section aria-label="Project enquiry" class="min-w-0 flex-[1.3_1_26.25rem]">
                <ContactForm :slug="content.formSlug" />
            </section>
        </Container>
    </div>
</template>
