import {writable} from 'svelte/store';

export const data = writable([]);
export const limit = writable(100);
export const page = writable(0);
export const fileIndex = writable(0);
export const viewerActive = writable(false);
