import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
export const load: LayoutServerLoad = ({ cookies }) => {
	if (cookies.get('session') && cookies.get('username')) {
		throw redirect(302, '/dashboard');
	}
	return {};
};
