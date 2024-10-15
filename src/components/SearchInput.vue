<script setup lang="ts">
import { ref, watch } from "vue";
import debounce from "lodash.debounce";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

const search = ref("");

watch(
  search,
  debounce(() => {
    emit("search", search.value);
  }, 500)
);
</script>

<template>
  <div class="search-input-wrap flex flex-wrap items-center relative">
    <input
      v-model="search"
      type="search"
      placeholder="Search for users..."
      class="w-full rounded-md"
    />

    <MagnifyingGlassIcon class="w-[20px] h-[20px] absolute right-4" />
  </div>
</template>

<style lang="scss" scoped>
.search-input-wrap {
  width: 100%;

  @media only screen and (min-width: 576px) {
    max-width: 500px;
  }
}

input {
  background-color: theme("colors.athens-gray");
  padding: 0.5rem 3rem 0.5rem 1rem;
  font-weight: 500;
  outline: none;
}
</style>
