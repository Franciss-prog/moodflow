import { clerkClient } from 'svelte-clerk/server';

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const { userId } = locals.auth();

	const user = await clerkClient.users.getUser(userId as string);
	if (!userId) {
		redirect(301, '/');
	}
	return {
		user: {
			name: user.fullName
		}
	};
};
