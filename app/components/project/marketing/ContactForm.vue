<script lang="ts" setup>
import { Input, fieldClasses } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ChoiceChips from '~/components/project/utilities/ChoiceChips.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';

const types = [
    { value: 'bespoke-website', label: 'bespoke website' },
    { value: 'web-app', label: 'web app' },
    { value: 'mobile-app', label: 'mobile app' },
    { value: 'support', label: 'help with an existing project' },
    { value: 'other', label: 'something else' }
];

const starts = ['as soon as possible', 'in the next few months', 'just exploring'];

const emptyForm = () => ({
    crm_first_name: '',
    crm_email: '',
    type: 'bespoke-website',
    start: starts[0]!,
    message: ''
});

const form = ref(emptyForm());

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const isError = ref(false);

const submitForm = async () => {
    isSubmitting.value = true;
    isError.value = false;

    const { start, message, ...rest } = form.value;

    try {
        // The CRM endpoint only takes these fields, so the ideal start rides along in the message
        await $fetch('https://legacy-lxst.lxst.digital/api/form-submission/1', {
            method: 'POST',
            body: { ...rest, message: `Ideal start: ${start}\n\n${message}` }
        });
        isSubmitted.value = true;
    } catch (error) {
        console.error('Form submission error:', error);
        isError.value = true;
    } finally {
        isSubmitting.value = false;
    }
};

const resetForm = () => {
    form.value = emptyForm();
    isSubmitting.value = false;
    isSubmitted.value = false;
    isError.value = false;
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
                thanks, we'll be in touch soon.
            </span>
            <button
                class="min-h-11 self-start underline underline-offset-6 hover:no-underline"
                type="button"
                @click="resetForm"
            >
                send another
            </button>
        </div>

        <form v-else class="flex flex-col gap-7" @submit.prevent="submitForm">
            <div class="grid-split gap-x-6 gap-y-7 [--split-min:13.75rem]">
                <div class="flex flex-col gap-2">
                    <label :class="labelClass" for="contact-name">your name</label>
                    <Input
                        id="contact-name"
                        v-model="form.crm_first_name"
                        autocomplete="name"
                        name="name"
                        required
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label :class="labelClass" for="contact-email">email</label>
                    <Input
                        id="contact-email"
                        v-model="form.crm_email"
                        autocomplete="email"
                        name="email"
                        required
                        type="email"
                    />
                </div>
            </div>

            <fieldset class="flex flex-col gap-3">
                <legend :class="labelClass" class="mb-3">what's it for?</legend>
                <ChoiceChips
                    v-model="form.type"
                    :options="types"
                    active-tone="foreground"
                    mode="radio"
                    name="type"
                />
            </fieldset>

            <div class="flex flex-col gap-2">
                <label :class="labelClass" for="contact-start">ideal start</label>
                <select
                    id="contact-start"
                    v-model="form.start"
                    :class="fieldClasses"
                    class="h-13"
                    name="start"
                >
                    <option v-for="start in starts" :key="start">{{ start }}</option>
                </select>
            </div>

            <div class="flex flex-col gap-2">
                <label :class="labelClass" for="contact-message">tell us about it</label>
                <Textarea
                    id="contact-message"
                    v-model="form.message"
                    name="message"
                    placeholder="What you do, what you need, anything that's bugging you about what you have now."
                    required
                    rows="6"
                />
            </div>

            <p v-if="isError" class="text-destructive" role="alert">
                Something went wrong sending that. Please try again, or email us directly.
            </p>

            <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button
                    :disabled="isSubmitting"
                    class="h-14 px-7 text-lg"
                    type="submit"
                    variant="inverse"
                >
                    {{ isSubmitting ? 'sending…' : 'send it →' }}
                </Button>
                <span class="text-[0.9375rem] text-muted-foreground">
                    We'll only use this to reply to you.
                </span>
            </div>
        </form>
    </div>
</template>
