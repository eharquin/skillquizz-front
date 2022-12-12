import { writable } from 'svelte/store';

function createTitle() {
    const {subscribe, set, update} = writable('');

    return {
        subscribe,
        set: (value: string) => {
            set(`${value}`)
        },
        clear: () => {
            set('Home');
        }
    }
}

export const title = createTitle();