import { getUser } from './user';

export async function getSession(id = 1) {
  try {
    const user = await getUser(id);
    return {
      user: user,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI2OTQzNTczLCJleHAiOjE3MjY5NDcxNzN9._NHsgf_XETO00eiLRLpm61qUaT20F0wfQmVK7QF_xDI'
    };
  } catch (err) {
    return {
      user: null,
      token: null
    };
  }
}
