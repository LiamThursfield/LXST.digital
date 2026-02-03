<script lang="ts" setup>
import PageHeader from '~/components/project/headers/PageHeader.vue';

useSeoMeta({
    title: 'Our Services | LXST.digital',
    description:
        'We offer bespoke web development, custom web applications, and technical consultancy.'
});
</script>

<template>
    <div class="flex flex-col">
        <PageHeader
            title="What We Offer"
            subtitle="DIGITAL SERVICES"
            description="We offer bespoke web development, custom web applications, and technical consultancy."
            align="center"
        />

        <ProjectUtilitiesPageSection>
            <!-- Bespoke Websites -->
            <div class="flex flex-col md:flex-row gap-12 items-center">
                <div class="flex-1 space-y-6">
                    <h3 class="text-3xl font-bold">Bespoke Websites & Platforms</h3>
                    <p class="text-lg text-muted-foreground leading-relaxed">
                        Forget generic builders. We create custom-coded websites integrated with
                        powerful CMS and CRM tools, giving you complete control without compromising
                        on design or speed. Ideal for hospitality, service industries, and
                        creatives.
                    </p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Custom CMS integration</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>High-performance SEO</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Premium Animation & Interaction</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="w-full md:w-1/2 aspect-square rounded-2xl bg-muted/50 border border-border"
                />
            </div>

            <!-- Web Applications -->
            <div class="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div class="flex-1 space-y-6">
                    <h3 class="text-3xl font-bold">Custom Web Applications</h3>
                    <p class="text-lg text-muted-foreground leading-relaxed">
                        From internal dashboards to customer-facing SaaS products. We engineer
                        robust web applications that automate workflows and solve complex business
                        problems.
                    </p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Complex Data Management</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>User Auth & Permissions</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>API Integration</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="w-full md:w-1/2 aspect-square rounded-2xl bg-muted/50 border border-border"
                />
            </div>

            <!-- Tech Consultancy -->
            <div class="flex flex-col md:flex-row gap-12 items-center">
                <div class="flex-1 space-y-6">
                    <h3 class="text-3xl font-bold">Technical Consultancy & Support</h3>
                    <p class="text-lg text-muted-foreground leading-relaxed">
                        Already have a project? We provide specialized support for existing Nuxt,
                        Vue, and Laravel codebases. Whether it's a version upgrade, performance
                        audit, or feature implementation.
                    </p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Code Audits & Refactoring</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Performance Optimization</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="h-2 w-2 rounded-full bg-primary" />
                            <span>Cloud Infrastructure (AWS/Cloudflare)</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="w-full md:w-1/2 aspect-square rounded-2xl bg-muted/50 border border-border"
                />
            </div>

            <div class="mt-24 text-center">
                <Button as-child size="wide" class="ease-out duration-300">
                    <NuxtLink to="/contact">Discuss Your Needs</NuxtLink>
                </Button>
            </div>
        </ProjectUtilitiesPageSection>

        <ProjectUtilitiesDivider />

        <ProjectMarketingTechStackRow class="py-24" />

        <section
            class="py-32 px-4 bg-primary text-primary-foreground text-center relative overflow-hidden"
        >
            <div class="absolute inset-0 bg-black/30"></div>
            <div class="container mx-auto max-w-2xl relative z-10">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">
                    Ready to scale your digital presence?
                </h2>
                <p class="text-xl mb-10 opacity-90">
                    Let's discuss how we can help you achieve your goals.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button as-child class="h-14 px-8 text-lg" size="lg" variant="secondary">
                        <NuxtLink to="/contact">Start Your Project</NuxtLink>
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>
