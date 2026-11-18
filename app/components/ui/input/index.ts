export { default as Input } from './Input.vue';

// Shared by Input, Textarea and native <select> so every form field matches
export const fieldClasses =
    'flex w-full rounded-md border border-input bg-background px-3.5 text-lg transition-colors placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-50';
