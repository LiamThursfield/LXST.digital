<script lang="ts" setup>
interface Props {
    title: string;
    description: string;
    icon?: string;
}

defineProps<Props>();
</script>

<template>
    <div
        class="group p-6 rounded-xl border border-border bg-card active:border-primary/50 hover:border-primary/50 transition-colors duration-300"
    >
        <div
            class="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-active:bg-primary group-active:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
        >
            <!-- Slot for icon, fallback to a simple generic icon if needed, or pass component via slot -->
            <slot name="icon">
                <Icon
                    class="h-5 w-5 bg-current opacity-20 group-active:opacity-75 group-hover:opacity-75 transition-opacity duration-300"
                    :name="icon ?? 'streamline-plump:check-thick-solid'"
                />
            </slot>
        </div>
        <h3
            class="text-xl font-bold mb-2 text-foreground group-active:text-primary group-hover:text-primary transition-colors"
        >
            {{ title }}
        </h3>
        <p class="text-muted-foreground leading-relaxed">
            {{ description }}
        </p>
    </div>
</template>
