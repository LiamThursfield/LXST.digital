<script setup lang="ts">
export type ChoiceOption = { value: string; label: string };

const props = withDefaults(
    defineProps<{
        options: Array<ChoiceOption>;
        /**
         * `toggle`: buttons with aria-pressed, for filters.
         * `radio`: real radio inputs, for forms (needs `name`).
         */
        mode?: 'toggle' | 'radio';
        name?: string;
        /** Fill colour of the selected chip */
        activeTone?: 'primary' | 'foreground';
    }>(),
    {
        mode: 'toggle',
        name: undefined,
        activeTone: 'primary'
    }
);

const model = defineModel<string>({ required: true });

const chipClass = (active: boolean) => [
    'inline-flex min-h-11 items-center gap-2.5 rounded-md border px-4 text-base transition-colors duration-200',
    active
        ? props.activeTone === 'primary'
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-foreground bg-foreground text-background'
        : 'border-border-strong hover:border-foreground'
];
</script>

<template>
    <div class="flex flex-wrap gap-2.5">
        <template v-if="mode === 'toggle'">
            <button
                v-for="option in options"
                :key="option.value"
                :aria-pressed="model === option.value"
                :class="chipClass(model === option.value)"
                type="button"
                @click="model = option.value"
            >
                {{ option.label }}
            </button>
        </template>

        <template v-else>
            <label
                v-for="option in options"
                :key="option.value"
                :class="chipClass(model === option.value)"
                class="cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring"
            >
                <input
                    v-model="model"
                    :name="name"
                    :value="option.value"
                    class="m-0 accent-primary"
                    type="radio"
                />
                {{ option.label }}
            </label>
        </template>
    </div>
</template>
