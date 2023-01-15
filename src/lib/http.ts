import axios from "axios";
import {env} from "$env/dynamic/public";
import {goto} from "$app/navigation";

const client = axios.create({
    baseURL: env.PUBLIC_BASE_URL,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
    },
});

client.interceptors.response.use((response) => response, function (e) {
    // If status is 403 (ie token expired), redirect to login page
    if (e.response!.status === 401) {
        goto('/login');
    }
});

export default client;