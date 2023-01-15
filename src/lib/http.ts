import axios from "axios";
import {env} from "$env/dynamic/public";
import {user} from "$lib/store";
import {get} from "svelte/store";
import {goto} from "$app/navigation";

const client = axios.create({
    baseURL: env.PUBLIC_BASE_URL,
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': get(user) ? 'Bearer ' + get(user) : '',
    },
});

client.interceptors.response.use((response) => response, function (e) {
    // If status is 403 (ie token expired), redirect to login page
    if (e.response!.status === 401) {
        user.set(null);
        goto('/login');
    }
});

export default client;