import {env} from '$env/dynamic/public'
export const get = (path: string, body: Map<string, string> = new Map()) => {
    const resolvedUrl = (new URL(path, env.PUBLIC_BASE_URL))
    return fetch(resolvedUrl);
}