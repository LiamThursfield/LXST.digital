<script setup lang="ts">
import MetaList from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import RuledList from '~/components/project/utilities/RuledList.vue';
import SiteSection from '~/components/project/utilities/SiteSection.vue';
import type { Service } from '~/composables/project/data';

defineProps<{
    service: Service;
    number: string;
}>();
</script>

<template>
    <!-- A full service block on the services page -->
    <SiteSection :id="service.slug" :aria-labelledby="`${service.slug}-title`" split>
        <div class="flex flex-col gap-4">
            <MonoLabel tone="highlight">{{ number }}</MonoLabel>
            <h2 :id="`${service.slug}-title`" class="text-title font-bold">{{ service.title }}</h2>
            <p class="text-foreground-soft text-pretty">{{ service.description }}</p>
            <p class="text-base text-muted-foreground">{{ service.audience }}</p>
        </div>

        <div class="flex flex-col gap-6">
            <RuledList :items="service.features" />
            <MetaList v-if="service.meta?.length" :items="service.meta" />
        </div>
    </SiteSection>
</template>
