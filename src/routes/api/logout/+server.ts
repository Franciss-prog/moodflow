// src/routes/logout/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	// remove the auth cookie
	cookies.delete('session', { path: '/' });
	cookies.delete('username', { path: '/' });

	return json({ success: true, message: 'Logout successful' });
};
