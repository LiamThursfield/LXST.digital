<script setup lang="ts">
export type Faq = { question: string; answer: string };

defineProps<{
    items: Array<Faq>;
}>();
</script>

<template>
    <div class="flex flex-col">
        <details
            v-for="item in items"
            :key="item.question"
            class="group border-t border-border py-1 last:border-b"
        >
            <summary
                class="flex cursor-pointer list-none items-center justify-between gap-6 py-4.5 text-xl font-medium [&::-webkit-details-marker]:hidden"
            >
                {{ item.question }}
                <span
                    aria-hidden="true"
                    class="text-[1.625rem] leading-none text-highlight transition-transform duration-200 ease-out group-open:rotate-45"
                >
                    +
                </span>
            </summary>
            <p class="mb-5 max-w-[36em] text-[1.0625rem] text-muted-foreground">
                {{ item.answer }}
            </p>
        </details>
    </div>
</template>
