import type {PageLoad} from './$types';
import type User from "$lib/types/user";
import {get} from "$lib/api";

export const load: PageLoad<User[]> = async ({fetch, params}) => {
  const res = await get('/user');
  const users = await res.json();
  return users;
}
