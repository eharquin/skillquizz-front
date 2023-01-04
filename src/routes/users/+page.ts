import type {PageLoad} from './$types';
import type User from "$lib/types/user";
import {get} from "$lib/api";

export const load: PageLoad<User[]> = async ({fetch, params}) => {
  const users: User[] = await get('/user').then(res => res.json());
  return users;
}
