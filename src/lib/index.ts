// Define mood names as a union type
import type { Component } from 'svelte';
import { Laugh, Frown, Meh, Angry } from '@lucide/svelte';
export type MoodName = 'happy' | 'sad' | 'chill' | 'angry';
// class utils
export const hoverBG =
	'bg-dark text-light hover:bg-dark/80 dark:text-dark dark:bg-light dark:hover:bg-light/80';

export const dynamicBG = 'bg-dark text-light dark:bg-light dark:text-dark';
// Define mood object shape
export interface Mood {
	mood: MoodName;
	icon: Component;
}

// Strictly typed moods array
export const moods: Mood[] = [
	{ mood: 'happy', icon: Laugh }, // pick a fun/happy icon
	{ mood: 'sad', icon: Frown }, // sad face
	{ mood: 'chill', icon: Meh }, // neutral/relaxed face
	{ mood: 'angry', icon: Angry }
];

export type { User } from './database/types.ts';
