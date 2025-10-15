import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { connectDB } from '$lib/database/config';
import type { User } from '$lib';
export const GET: RequestHandler = async ({ cookies }) => {
	// get the cookies
	const userId = cookies.get('session');
	const username = cookies.get('username');

	// cookie validation
	if (!userId || !username) {
		return json({ error: 'auth guard bypassed || cookie path config error' }, { status: 401 });
	}
	// find the user
	const user = await connectDB<User>('users');
	const userDoc = await user.findOne({ username });

	// if the user doesn't exist
	if (!userDoc) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	// return the data
	const { moods, overAllMood } = userDoc;

	return json({
		message: 'get the data successfully',
		moods,
		overAllMood
	});
};
