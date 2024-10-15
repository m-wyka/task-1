<script setup lang="ts">
import { computed } from "vue";
import { VueFinalModal } from "vue-final-modal";
import { useUsersStore } from "../../store/users";
import type { User } from "../../types/User";
import { useFetch } from "../../composables/useFetch";
import Btn from "@/components/Btn.vue";

defineProps<{
  title?: string;
}>();

const usersStore = useUsersStore();

const handleConfirm = () => {
  const { id } = usersStore.getDeleteUser;
  useFetch(
    `users/${id}`,
    {},
    { method: "DELETE" },
    "The user has been deleted."
  );
  usersStore.deleteUserModalState = false;
  usersStore.deleteUser = {} as User;
};

const handleCancel = () => {
  usersStore.deleteUserModalState = false;
  usersStore.deleteUser = {} as User;
};

const userData = computed(() => {
  const { first_name, last_name } = usersStore.getDeleteUser;
  return `${first_name} ${last_name}`;
});
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal-content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
    @closed="handleCancel"
  >
    <h2>Delete user</h2>
    <p>Are you sure you want to delete: {{ userData }}?</p>

    <div class="flex flex-wrap gap-4">
      <Btn @click="handleConfirm">YES</Btn>
      <Btn @click="handleCancel" btnStyle="outline">NO</Btn>
    </div>
  </VueFinalModal>
</template>

<style>
.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-modal-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: theme("colors.white");
  border-radius: 0.5rem;
}

.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}

.confirm-modal-content h1 {
  font-size: 1.375rem;
}
</style>
