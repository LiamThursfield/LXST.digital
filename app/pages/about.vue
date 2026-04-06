<script lang="ts" setup>
import PageHeader from '~/components/project/headers/PageHeader.vue';

useSeoMeta({
    title: 'About | LXST.digital',
    description: 'We are a boutique digital product agency blending design and engineering.'
});
</script>

<template>
    <div>
        <PageHeader
            title="What We're About"
            subtitle="THE AGENCY"
            description="A showcase of our recent projects, from bespoke websites to complex web applications."
        />

        <ProjectUtilitiesPageSection>
            <div
                class="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight text-muted-foreground"
            >
                <p class="text-xl text-foreground font-medium leading-relaxed mb-8">
                    LXST.digital is a boutique digital product agency focused on bridging the gap
                    between design and superior engineering.
                </p>

                <p>
                    We believe that great software is born from a deep understanding of the user's
                    needs, backed by solid, scalable code. In an era of generic templates and
                    drag-and-drop builders, we stand apart by committing to "Code-First"
                    development.
                </p>
                <p>
                    This approach gives us—and you—unlimited freedom to create experiences that are
                    exactly as envisioned, performing at speeds that keep users engaged.
                </p>

                <h3 class="text-foreground mt-12 mb-4">Quality Over Quantity</h3>
                <p>
                    We partner with a select number of clients to ensure every project receives the
                    attention it deserves. We are not a factory churning out websites; we are
                    partners in your digital growth.
                </p>
            </div>
        </ProjectUtilitiesPageSection>

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
                        <NuxtLink to="/contact">Let's Chat</NuxtLink>
                    </Button>
                </div>
            </div>
        </section>
    </div>
</template>
