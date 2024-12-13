import { api } from '@/lib/api';

// Singin: @POST
export function loginMutation(payload) {
  return api.post('/v1/login', {
    email: payload?.email,
    password: payload?.password
  });
}

export function registerMutation(payload) {
  return api.post('/v1/registration', payload);
}
