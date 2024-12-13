import { defineStore } from 'pinia';
import { createUserMutaion, getCurrentUser } from './userApi';
import { AxiosError } from 'axios';
import { toast } from 'vue-sonner';
import { handleApiMutationError } from '@/lib/error';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    users: [],
    pagination: {
      page: 1,
      limit: 50,
      total: 0
    },
    currentUser: null,
    isUsersFetching: false,
    isUserCreating: false,
    user: {},
    isUserFetching: false
  }),
  actions: {
    setPage(page) {
      this.pagination.page = page;
      this.fetchUsers();
    },
    async fetchUsers() {
      try {
        this.isUsersFetching = true;
        // const result = await getUsersQuery({
        //   page: this.pagination.page,
        //   limit: this.limit
        // });
        // this.pagination.total = result.data.data?.total ?? 1;
        // this.merchants = result.data?.data?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          //
        }
      } finally {
        this.isUsersFetching = false;
      }
    },
    async createUser(payload, form) {
      try {
        this.isUserCreating = true;
        const result = await createUserMutaion(payload, form);
        console.log(result);
      } catch (err) {
        handleApiMutationError(err, form);
      } finally {
        this.isUserCreating = false;
      }
    },
    async getCurrentUser() {
      try {
        this.isUserFetching = true;
        const result = await getCurrentUser();
        this.user = result.data?.data;
      } catch (err) {
        handleApiMutationError(err);
      } finally {
        this.isUserFetching = false;
      }
    }
  }
});
