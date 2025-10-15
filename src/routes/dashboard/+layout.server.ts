import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ cookies }) => {
	const username = cookies.get('username');
	const session = cookies.get('session');
	// validate the two cookies
	if (!cookies.get('session') || !username) {
		redirect(302, '/auth');
	}

	return {
		username,
		session
	};
};
