import axios from "axios";
import {env} from "$env/dynamic/public";
import {user} from "$lib/store";
import {get} from "svelte/store";

export const client = axios.create({
    baseURL: env.PUBLIC_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': get(user) ? 'Bearer ' + get(user) : '',
    }
});