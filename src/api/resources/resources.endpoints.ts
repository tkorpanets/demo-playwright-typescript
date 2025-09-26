export const RESOURCES = {
  base: '/api/unknown',
  list: '/api/unknown',
  one: (id: number) => `/api/unknown/${id}`,
  delayed: (sec: number) => `/api/users?delay=${sec}`,
};
