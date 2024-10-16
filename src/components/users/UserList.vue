<script setup lang="ts">
import { nextTick, onMounted, ref, toRaw, watch } from "vue";
import { RouterLink } from "vue-router";
import { ModalsContainer } from "vue-final-modal";
import { PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useFetch } from "../../composables/useFetch.ts";
import { useUsersStore } from "../../store/users.ts";
import type { ResponseData } from "../../types/ResponseData.ts";
import type { User } from "../../types/User.ts";
import DeleteUserModal from "@/components/users/DeleteUserModal.vue";
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import Btn from "@/components/Btn.vue";

const usersStore = useUsersStore();
const { setPagination } = usersStore;
const users = ref<User[]>([]);
const isPaginationShown = ref(true);

const getUsers = async (page: number) => {
  const { data } = await useFetch<ResponseData<User[]>>("users", {
    page: `${page}`,
    per_page: "10",
  });

  watch(data, (newData) => {
    if (newData) {
      const { page, per_page, total, total_pages } = newData;

      users.value = newData.data;
      setPagination({
        page,
        per_page,
        total,
        total_pages,
      });
    }
  });
};

// Get list of users
onMounted(async () => {
  await getUsers(1);
});

const handleUsersOnChangePage = async (page: number) => {
  await getUsers(page);
};

const handleSearch = async (searchValue: string) => {
  if (searchValue) {
    const filteredUsers = users.value.filter(
      (user) =>
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    users.value = filteredUsers;
    isPaginationShown.value = false;
  } else {
    await getUsers(1);
    isPaginationShown.value = true;
  }
};

const handleDeleteUserModal = (user: User) => {
  usersStore.deleteUser = user;
  usersStore.deleteUserModalState = true;
};
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-8">
      <h1>User list</h1>

      <div class="card grid gap-6 p-5">
        <div
          class="flex flex-col md:flex-wrap md:flex-row gap-4 items-start justify-between"
        >
          <SearchInput class="flex-1" @search="handleSearch" />

          <RouterLink to="/users/new">
            <Btn
              class="flex items-center font-medium"
              :rounded="true"
              size="lg"
            >
              <PlusIcon class="w-[20px] mr-2" /> Add user
            </Btn>
          </RouterLink>
        </div>

        <hr />

        <div class="relative overflow-x-auto">
          <table class="users-table table-fixed">
            <thead>
              <tr>
                <th class="w-[120px]"></th>
                <th>Full Name</th>
                <th class="w-[100px]">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <img
                    :src="user.avatar"
                    :alt="`${user.first_name} ${user.first_name}`"
                    class="w-[45px] h-[45px] rounded-full object-cover"
                  />
                </td>

                <td class="font-semibold">
                  {{ user.first_name }} {{ user.last_name }}
                </td>

                <td>
                  <div class="flex flex-wrap gap-2">
                    <RouterLink
                      :to="`/users/${user.id}`"
                      class="users-table__action"
                    >
                      <PencilSquareIcon class="w-[18px]" />
                    </RouterLink>

                    <button
                      @click="handleDeleteUserModal(user)"
                      class="users-table__action"
                    >
                      <TrashIcon class="w-[18px]" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Pagination v-if="isPaginationShown" @change="handleUsersOnChangePage" />
    <DeleteUserModal v-model="usersStore.deleteUserModalState" />
    <ModalsContainer />
  </div>
</template>

<style lang="scss" scoped>
.users-table {
  width: 100%;
  min-width: 500px;
  text-align: left;

  th {
    color: theme("colors.abbey");
  }

  th,
  td {
    padding: 0.75rem 1rem;

    &:first-of-type {
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }

    &:last-of-type {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
  }

  tr:nth-child(2n + 1) {
    td {
      background-color: theme("colors.athens-gray");
    }
  }
}

.users-table__action {
  color: theme("colors.hit-gray");
  transition: all 0.2s ease;

  &:hover {
    color: theme("colors.primary");
  }
}
</style>
