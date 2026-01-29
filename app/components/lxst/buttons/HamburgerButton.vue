<script setup lang="ts">
const props = defineProps<{
    isActive?: boolean;
}>();

// function to emit that the button was clicked
const emit = defineEmits(['click']);

const handleClick = () => {
    emit('click');
};
</script>

<template>
    <button
        type="button"
        class="hamburger-button cursor-pointer flex flex-col group justify-between w-6 h-4"
        :class="{
            active: props.isActive
        }"
        aria-label="Menu"
        @click="handleClick"
    >
        <span
            v-for="i in 3"
            :key="i"
            class="block h-[2px] bg-foreground rounded w-full group-hover:bg-primary transition-all ease-in-out duration-300 origin-center"
        />
    </button>
</template>

<style scoped lang="postcss">
.active {
    span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    span:nth-child(2) {
        opacity: 0;
    }

    span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
}
</style>
