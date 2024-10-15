<script setup lang="ts">
import { computed } from "vue";

type Props = {
  type?: "submit" | "reset" | "button" | undefined;
  rounded?: boolean;
  btnStyle?: "outline" | undefined;
  size?: "sm" | "md" | "lg" | undefined;
};

const props = defineProps<Props>();

const handleBtnSize = computed(() =>
  props.size === undefined ? "" : `btn--${props.size}`
);
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      rounded ? 'rounded-full' : 'btn--rounded',
      { 'btn--outline': btnStyle === 'outline' },
      handleBtnSize,
    ]"
    class="btn"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0.595rem 1rem;
  background-color: theme("colors.primary");
  color: theme("colors.white");
  transition: all 0.2s ease;

  &:hover {
    background-color: theme("colors.primary-dark");
  }
}

.btn--rounded {
  border-radius: 0.25rem;
}

.btn--outline {
  background-color: theme("colors.white");
  border: 1px solid theme("colors.nevada");
  color: theme("colors.nevada");

  &:hover {
    background-color: theme("colors.nevada");
    color: theme("colors.white");
  }
}

.btn--sm {
  padding: 0.4rem 1rem;
}

.btn--md {
  padding: 0.595rem 1rem;
}

.btn--lg {
  padding: 0.72rem 1rem;
}
</style>
