<script lang="ts" setup>
import CtaBand from '~/components/project/marketing/CtaBand.vue';
import FaqList from '~/components/project/marketing/FaqList.vue';
import type { Faq } from '~/components/project/marketing/FaqList.vue';
import PageHero from '~/components/project/headers/PageHero.vue';
import ServiceDetail from '~/components/project/marketing/ServiceDetail.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import { useData } from '~/composables/project/data';

useSeoMeta({
    title: 'Services | LXST.digital',
    description:
        'Bespoke websites, custom web applications, mobile apps, and technical consultancy for Nuxt, Vue and Laravel projects.'
});

const { services } = useData();

const faqs: Array<Faq> = [
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
];
</script>

<template>
    <div>
        <PageHero label="~/services">
            what we do
            <template #lead>
                Four things, done properly. Most projects start as one and turn into another, which
                is why everything is built on the same solid foundations.
            </template>
        </PageHero>

        <ServiceDetail
            v-for="(service, index) in services"
            :key="service.slug"
            :number="String(index + 1).padStart(2, '0')"
            :service="service"
        />

        <SiteSection aria-labelledby="faq-title" split>
            <h2 id="faq-title" class="text-heading font-bold">not sure which you need?</h2>
            <FaqList :items="faqs" />
        </SiteSection>

        <CtaBand
            :cta="{ label: 'discuss your project →', href: '/contact' }"
            heading="let's talk it through."
        />
    </div>
</template>
