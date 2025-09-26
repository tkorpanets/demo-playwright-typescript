export const USERS = {
  base: '/api/users',
  list: (page: number = 1) => `/api/users?page=${page}`,
  one: (id: number) => `/api/users/${id}`,
};
