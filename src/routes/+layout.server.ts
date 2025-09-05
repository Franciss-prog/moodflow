import { buildClerkProps } from 'svelte-clerk/server';
import type { LayoutServerData } from './$types';
export const load: LayoutServerData = ({ locals }) => {
	return {
		...buildClerkProps(locals.auth())
	};
};
