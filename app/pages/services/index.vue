<script lang="ts" setup>
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import FaqList from '~/components/project/marketing/FaqList.vue';
import type { Faq } from '~/components/project/marketing/FaqList.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import ServiceDetail from '~/components/project/marketing/ServiceDetail.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import { toCta, usePageContent, useServices } from '~/composables/project/cms';
import type { CtaBandView } from '~/composables/project/cms';
import type { ServicesTemplate } from '~/lib/lxst-api/content';

type ServicesContent = {
    heroTitle: string;
    heroLead: string;
    faqTitle: string;
    faqs: Array<Faq>;
    cta: CtaBandView;
};

// Shown until the services page is published in LXST.admin
const fallback: ServicesContent = {
    heroTitle: 'what we do',
    heroLead:
        'Four things, done properly. Most projects start as one and turn into another, which is why everything is built on the same solid foundations.',
    faqTitle: 'not sure which you need?',
    faqs: [
        {
            question: 'do I need a website or a web app?',
            answer: "If people mostly read about you, it's a website. If they log in, book, pay or manage something, it's a web app. Plenty of projects are both, and we'll help you work it out on the first call."
        },
        {
            question: 'can you take over an existing project?',
            answer: "Yes, if it's built on Nuxt, Vue or Laravel. We usually start with a short audit so you know what you've got before anything changes."
        },
        {
            question: 'will I be able to update it myself?',
            answer: "Yes. Every website comes with a CMS set up around your content, so changing prices, photos or opening hours doesn't mean emailing a developer."
        },
        {
            question: 'do you handle hosting?',
            answer: 'We can set up and manage hosting on AWS or Cloudflare, or deploy to your own provider if you already have one.'
        },
        {
            question: 'do you use AI?',
            answer: "Yes, where it genuinely helps, like speeding up repetitive work and testing. It doesn't replace engineering. Every line that ships is designed, reviewed and understood by a developer, and we'll never hand you something we can't explain or maintain."
        }
    ],
    cta: {
        heading: "let's talk it through.",
        cta: { label: 'discuss your project →', href: '/contact' }
    }
};

const content = await usePageContent<ServicesTemplate, ServicesContent>(
    '/services',
    (cms) => ({
        heroTitle: cms.hero_title,
        heroLead: cms.hero_lead,
        faqTitle: cms.faq_title,
        faqs: cms.faqs,
        cta: toCta(cms.cta, fallback.cta)
    }),
    {
        content: fallback,
        seo: {
            title: 'Services | LXST.digital',
            description:
                'Bespoke websites, custom web applications, mobile apps, and technical consultancy for Nuxt, Vue and Laravel projects.'
        }
    }
);

const services = await useServices();
</script>

<template>
    <div>
        <PageHero label="~/services">
            {{ content.heroTitle }}
            <template #lead>{{ content.heroLead }}</template>
        </PageHero>

        <ServiceDetail
            v-for="(service, index) in services"
            :key="service.slug"
            :number="String(index + 1).padStart(2, '0')"
            :service="service"
        />

        <SiteSection v-if="content.faqs.length" aria-labelledby="faq-title" split>
            <h2 id="faq-title" class="text-heading font-bold">{{ content.faqTitle }}</h2>
            <FaqList :items="content.faqs" />
        </SiteSection>

        <CtaBand :cta="content.cta.cta" :heading="content.cta.heading" />
    </div>
</template>
