import type {PageLoad} from './$types';
import type User from "$lib/types/user";
import {env} from "$env/dynamic/public";

export const load: PageLoad<User> = async ({params}) => {
    const user: User = await fetch(env.PUBLIC_BASE_URL + `/user/${params.id}`).then(r => r.json());
    return user;
}
