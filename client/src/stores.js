import {writable} from 'svelte/store';

export const data = writable([]);
export const limit = writable(1000);
export const page = writable(0);
