<script setup lang="ts">
import Container from '~/components/project/utilities/Container.vue';
import type { LinkWithLabel } from '~/components/project/types';
import { useNavigation } from '~/composables/project/navigation';

const props = defineProps<{
    heading: string;
    cta: LinkWithLabel;
    email?: string;
}>();

const { email: defaultEmail } = useNavigation();
const email = computed(() => props.email ?? defaultEmail);

const headingId = useId();
</script>

<template>
    <!-- Closing call to action, in the opposite colours to the page -->
    <section :aria-labelledby="headingId" class="bg-inverse text-inverse-foreground">
        <Container class="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 py-band">
            <h2 :id="headingId" class="max-w-[12ch] text-headline font-bold">{{ heading }}</h2>

            <div class="flex flex-col items-start gap-4">
                <Button as-child size="lg" variant="inverse">
                    <NuxtLink :to="cta.href">{{ cta.label }}</NuxtLink>
                </Button>
                <a
                    :href="`mailto:${email}`"
                    class="py-2 font-mono text-[0.9375rem] underline underline-offset-4 hover:no-underline"
                >
                    or email {{ email }}
                </a>
            </div>
        </Container>
    </section>
</template>
