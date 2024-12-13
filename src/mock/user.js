import { delay } from '@/lib/utils';

const users = [
  {
    id: 1,
    name: 'Sabbir Ahmed',
    email: 'sabbir.ahmed@pathao.com',
    isAdmin: true,
    status: 'active',
    avatar: 'https://avatars.githubusercontent.com/u/47929407'
  }
];

export async function getMockUser(id) {
  await delay(400);
  return users.filter((user) => user.id === id)[0];
}

export async function getUser() {

}