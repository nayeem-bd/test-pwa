import { api } from '@/lib/api';

// users: @GET
export function getUsersQuery({ page = 1, limit = 20 }) {
  return api.get(`/users?page=${page}&limit=${limit}`);
}

// users: @POST
export async function createUserMutaion(payload) {
  return api.post(`/users`, payload);
}

export async function getCurrentUser() {
  return api.get(`/v1/users`);
}