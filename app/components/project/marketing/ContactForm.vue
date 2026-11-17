<script lang="ts" setup>
import { Input, fieldClasses } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ChoiceChips from '~/components/project/utilities/ChoiceChips.vue';
import type { ChoiceOption } from '~/components/project/utilities/ChoiceChips.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import { useCrmForm } from '~/composables/project/lxst-api';
import { useNavigation } from '~/composables/project/navigation';
import type { FormField } from '~/lib/lxst-api/types';

// The fields, labels and choices all come from the `contact` CRM form in LXST.admin
const { form, submit } = useCrmForm('contact');
const { email } = useNavigation();

// The CRM form has no placeholder setting, so the few we want live here, by field key
const placeholders: Record<string, string> = {
    message: "What you do, what you need, anything that's bugging you about what you have now."
};

// Native input attributes for the CRM's field types
const inputAttributes: Record<string, { type?: string; autocomplete?: string }> = {
    crm_first_name: { autocomplete: 'name' },
    crm_last_name: { autocomplete: 'family-name' },
    crm_title: { autocomplete: 'honorific-prefix' },
    crm_email: { type: 'email', autocomplete: 'email' },
    crm_telephone: { type: 'tel', autocomplete: 'tel' },
    email: { type: 'email' },
    number: { type: 'number' }
};

const options = (field: FormField) => (field.settings.options ?? []) as Array<ChoiceOption>;
const defaultValue = (field: FormField) => String(field.settings.default ?? '');

// Single-line fields sit side by side when there's room; everything else takes the full width
const isShort = (field: FormField) => !['select', 'textarea', 'hidden'].includes(field.type);
// A required choice always has one chip picked; an optional one goes in a compact dropdown
const isChips = (field: FormField) => field.type === 'select' && field.required;

const answers = ref<Record<string, string>>({});
// People never see the honeypot, so anything typed in it marks the submission as spam
const honeypot = ref('');
const errors = ref<Record<string, Array<string>>>({});

const resetAnswers = () => {
    answers.value = Object.fromEntries(
        (form.value?.fields ?? []).map((field) => [field.key, defaultValue(field)])
    );
};

// Fill in defaults for any field we don't have an answer for yet, keeping what's been typed
watch(
    () => form.value?.fields,
    (fields) => {
        for (const field of fields ?? []) {
            answers.value[field.key] ??= defaultValue(field);
        }
    },
    { immediate: true }
);

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const isError = ref(false);

const submitForm = async () => {
    isSubmitting.value = true;
    isError.value = false;
    errors.value = {};

    try {
        const honeypotField = form.value?.spam_protection?.honeypot_field;
        await submit(
            honeypotField ? { ...answers.value, [honeypotField]: honeypot.value } : answers.value
        );
        isSubmitted.value = true;
    } catch (error) {
        const response = error as { status?: number; data?: { errors?: typeof errors.value } };
        // 422: the CRM's validation messages, per field
        if (response.status === 422) {
            errors.value = response.data?.errors ?? {};
        } else {
            console.error('Form submission error:', error);
            isError.value = true;
        }
    } finally {
        isSubmitting.value = false;
    }
};

const sendAnother = () => {
    resetAnswers();
    isSubmitted.value = false;
};

const labelClass = 'font-mono text-[0.8125rem] text-foreground-soft';
</script>

<template>
    <div aria-live="polite">
        <div
            v-if="isSubmitted"
            class="flex flex-col gap-3.5 rounded-md bg-inverse p-10 text-inverse-foreground"
            role="status"
        >
            <MonoLabel class="text-primary">sent ✓</MonoLabel>
            <span class="text-[2rem] leading-[1.1] font-bold tracking-[-0.03em]">
                {{ form?.success_message || "thanks, we'll be in touch soon." }}
            </span>
            <button
                class="min-h-11 self-start underline underline-offset-6 hover:no-underline"
                type="button"
                @click="sendAnother"
            >
                send another
            </button>
        </div>

        <p v-else-if="!form" class="text-xl text-foreground-soft">
            The form isn't available right now. Email us at
            <a :href="`mailto:${email}`" class="underline decoration-highlight underline-offset-5">
                {{ email }}
            </a>
            and we'll get back to you.
        </p>

        <form v-else class="relative flex flex-wrap gap-x-6 gap-y-7" @submit.prevent="submitForm">
            <input
                v-if="form.spam_protection"
                v-model="honeypot"
                :name="form.spam_protection.honeypot_field"
                aria-hidden="true"
                autocomplete="off"
                class="absolute -left-[9999px] size-px opacity-0"
                tabindex="-1"
                type="text"
            />

            <template v-for="field in form.fields" :key="field.key">
                <input
                    v-if="field.type === 'hidden'"
                    v-model="answers[field.key]"
                    :name="field.key"
                    type="hidden"
                />

                <fieldset v-else-if="isChips(field)" class="flex w-full flex-col gap-3">
                    <legend :class="labelClass" class="mb-3">{{ field.label }}</legend>
                    <ChoiceChips
                        v-model="answers[field.key]!"
                        :name="field.key"
                        :options="options(field)"
                        active-tone="foreground"
                        mode="radio"
                    />
                    <p v-for="message in errors[field.key]" :key="message" class="text-destructive">
                        {{ message }}
                    </p>
                </fieldset>

                <div
                    v-else
                    :class="isShort(field) ? 'min-w-[min(13.75rem,100%)] flex-1' : 'w-full'"
                    class="flex flex-col gap-2"
                >
                    <label :class="labelClass" :for="`contact-${field.key}`">
                        {{ field.label }}
                    </label>

                    <select
                        v-if="field.type === 'select'"
                        :id="`contact-${field.key}`"
                        v-model="answers[field.key]"
                        :class="fieldClasses"
                        :name="field.key"
                        class="h-13"
                    >
                        <option
                            v-for="option in options(field)"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </option>
                    </select>

                    <Textarea
                        v-else-if="field.type === 'textarea'"
                        :id="`contact-${field.key}`"
                        v-model="answers[field.key]"
                        :maxlength="field.settings.max_length"
                        :name="field.key"
                        :placeholder="placeholders[field.key]"
                        :required="field.required"
                        :rows="field.settings.rows ?? 6"
                    />

                    <Input
                        v-else
                        :id="`contact-${field.key}`"
                        v-model="answers[field.key]"
                        :autocomplete="inputAttributes[field.type]?.autocomplete"
                        :name="field.key"
                        :placeholder="placeholders[field.key]"
                        :required="field.required"
                        :type="inputAttributes[field.type]?.type ?? 'text'"
                    />

                    <p v-for="message in errors[field.key]" :key="message" class="text-destructive">
                        {{ message }}
                    </p>
                </div>
            </template>

            <p v-if="isError" class="w-full text-destructive" role="alert">
                Something went wrong sending that. Please try again, or email us directly.
            </p>

            <div class="flex w-full flex-wrap items-center gap-x-6 gap-y-4">
                <Button
                    :disabled="isSubmitting"
                    class="h-14 px-7 text-lg"
                    type="submit"
                    variant="inverse"
                >
                    {{ isSubmitting ? 'sending…' : form.submit_button_text || 'send it →' }}
                </Button>
                <span class="text-[0.9375rem] text-muted-foreground">
                    We'll only use this to reply to you.
                </span>
            </div>
        </form>
    </div>
</template>
