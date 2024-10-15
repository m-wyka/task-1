<script setup lang="ts">
import { useUsersStore } from "../store/users";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/solid";

const usersStore = useUsersStore();
const emit = defineEmits<{
  (e: "change", id: number): void;
}>();

const onChangePage = (currentPage: number, direction: "prev" | "next") => {
  switch (direction) {
    case "prev":
      emit("change", currentPage - 1);
      break;
    case "next":
      emit("change", currentPage + 1);
      break;
  }
};
</script>

<template>
  <div class="pagination flex items-center justify-between py-3">
    <div class="flex flex-1 items-center justify-betwee">
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white"
          aria-label="Pagination"
        >
          <a
            href="#"
            class="pagination__item pagination__item--arrow rounded-l-md"
            :class="{ 'pagination__item--disabled': usersStore.page === 1 }"
            @click.prevent="onChangePage(usersStore.page, 'prev')"
          >
            <span class="sr-only">Previous</span>
            <ChevronDoubleLeftIcon class="w-[14px] h-[14px]" />
          </a>

          <a
            href="#"
            :aria-current="index === 0 ? 'page' : 'false'"
            class="pagination__item"
            :class="{
              'pagination__item--active': usersStore.page === index + 1,
            }"
            v-for="(_, index) in usersStore.totalPages"
            @click.prevent="$emit('change', index + 1)"
          >
            {{ index + 1 }}</a
          >

          <a
            href="#"
            class="pagination__item pagination__item--arrow rounded-r-md"
            :class="{
              'pagination__item--disabled':
                usersStore.page === usersStore.totalPages,
            }"
            @click.prevent="onChangePage(usersStore.page, 'next')"
          >
            <span class="sr-only">Next</span>
            <ChevronDoubleRightIcon class="w-[14px] h-[14px]" />
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination__item {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  position: relative;
  color: theme("colors.primary");
  border: 1px solid theme("colors.athens-gray-2");

  &:hover {
    background-color: theme("colors.primary-dark");
    border-color: theme("colors.primary-dark");
    color: theme("colors.white");
  }
}

.pagination__item--active,
.pagination__item--active:hover {
  background-color: theme("colors.primary");
  color: theme("colors.white");
  border-color: theme("colors.primary");
}

.pagination__item--arrow {
  padding: 0.5rem;
}

.pagination__item--disabled {
  pointer-events: none;
  filter: grayscale(1);
  opacity: 0.6;
}
</style>
