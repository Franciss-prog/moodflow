import { writable } from 'svelte/store';

export const overAllMood = writable<Record<string, number>>({});
