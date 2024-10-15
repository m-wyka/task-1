import { defineStore } from "pinia";
import type { Pagination } from "../types/Pagination";
import type { User } from "../types/User.ts";

export const useUsersStore = defineStore("usersStore", {
  state: () => {
    return {
      pagination: {
        page: 0,
        per_page: 0,
        total: 0,
        total_pages: 0,
      } as Pagination,
      deleteUserModalState: false,
      deleteUser: {} as User,
    };
  },

  getters: {
    page: (state) => state.pagination.page,
    perPage: (state) => state.pagination.per_page,
    total: (state) => state.pagination.total,
    totalPages: (state) => state.pagination.total_pages,
    getDeleteUserModalState: (state) => state.deleteUserModalState,
    getDeleteUser: (state) => state.deleteUser,
  },

  actions: {
    setPagination(params: Pagination) {
      this.pagination = params;
    },
  },
});
