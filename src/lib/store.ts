import {writable} from 'svelte/store';
import {writable as localWritable} from 'svelte-local-storage-store'

export const title = writable('Home');

export const user = localWritable<string | null>('user', null);
