<script lang="ts" setup>
import { Monitor, Moon, Sun } from 'lucide-vue-next';

const colorMode = useColorMode();

const modes = [
    { value: 'system', label: 'system theme', icon: Monitor },
    { value: 'light', label: 'light theme', icon: Sun },
    { value: 'dark', label: 'dark theme', icon: Moon }
] as const;

const current = computed(
    () => modes.find((mode) => mode.value === colorMode.preference) ?? modes[0]
);
const next = computed(() => modes[(modes.indexOf(current.value) + 1) % modes.length]!);

/**
 * Cycle system → light → dark
 */
const cycle = () => {
    colorMode.preference = next.value.value;
};
</script>

<template>
    <!-- The stored preference is only known in the browser, so render a same-sized placeholder on the server -->
    <ClientOnly>
        <button
            :aria-label="`Using ${current.label}, switch to ${next.label}`"
            :title="current.label"
            class="inline-flex items-center justify-center rounded-md size-11 text-muted-foreground hover:text-foreground transition-colors duration-300 ease-out"
            type="button"
            @click="cycle"
        >
            <component :is="current.icon" aria-hidden="true" class="size-5" />
        </button>

        <template #fallback>
            <span class="inline-block size-11" />
        </template>
    </ClientOnly>
</template>
