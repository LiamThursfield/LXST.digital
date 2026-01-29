<script lang="ts" setup>
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
    <div>
        <button
            class="hamburger-button flex flex-col justify-between w-6 h-4"
            :class="{
                active: props.isActive
            }"
            aria-label="Menu"
            type="button"
            @click="handleClick"
        >
            <span
                v-for="i in 3"
                :key="i"
                class="block h-[2px] bg-foreground rounded w-full group-active:bg-primary group-hover:bg-primary origin-center transition-all ease-in-out duration-300"
            />
        </button>
    </div>
</template>

<style lang="postcss" scoped>
.active {
    span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
    }

    span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
}
</style>
