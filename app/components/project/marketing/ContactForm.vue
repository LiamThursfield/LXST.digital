<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

const form = ref({
    crm_first_name: '',
    crm_email: '',
    type: 'bespoke-website',
    message: ''
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const isError = ref(false);

const submitForm = async () => {
    isSubmitting.value = true;
    isError.value = false;

    try {
        await $fetch('https://legacy-lxst.lxst.digital/api/form-submission/1', {
            method: 'POST',
            body: form.value
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
    form.value = {
        crm_first_name: '',
        crm_email: '',
        type: 'bespoke-website',
        message: ''
    };

    isSubmitting.value = false;
    isSubmitted.value = false;
    isError.value = false;
};
</script>

<template>
    <Card class="w-full max-w-lg mx-auto border-border bg-card">
        <CardHeader>
            <CardTitle class="text-2xl">Get in Touch</CardTitle>
            <CardDescription>
                Tell us about your project and we'll get back to you shortly.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div v-if="isSubmitted" class="py-8 text-center space-y-4">
                <div
                    class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary"
                >
                    <Icon name="heroicons:check-circle" size="32" />
                </div>
                <h3 class="text-xl font-bold">Message Sent!</h3>
                <p class="text-muted-foreground">
                    Thank you for reaching out. We'll be in touch with you shortly.
                </p>
                <Button variant="outline" @click="resetForm">Send another message</Button>
            </div>
            <form v-else class="space-y-6" @submit.prevent="submitForm">
                <div class="flex flex-col space-y-3">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        v-model="form.crm_first_name"
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div class="flex flex-col space-y-3">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        v-model="form.crm_email"
                        placeholder="hello@example.com"
                        required
                        type="email"
                    />
                </div>

                <div class="flex flex-col space-y-3">
                    <Label for="type">Project Type</Label>
                    <Select v-model="form.type" required>
                        <SelectTrigger id="type">
                            <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bespoke-website">Bespoke Website</SelectItem>
                            <SelectItem value="web-app">Web Application</SelectItem>
                            <SelectItem value="support">Tech Support / Maintenance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div class="flex flex-col space-y-2">
                    <Label for="message">Message</Label>
                    <Textarea
                        id="message"
                        v-model="form.message"
                        class="min-h-[120px]"
                        placeholder="Tell us about your project goals, timeline, and budget..."
                        required
                    />
                </div>

                <Button :disabled="isSubmitting" class="w-full" type="submit">
                    {{ isSubmitting ? 'Sending...' : 'Send Request' }}
                </Button>

                <div
                    v-if="isError"
                    class="p-4 rounded-md bg-destructive/10 text-destructive text-sm text-center"
                >
                    <p>Something went wrong. Please try again or email us directly.</p>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
