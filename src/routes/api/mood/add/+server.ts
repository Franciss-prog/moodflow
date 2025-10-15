import { json, type RequestHandler } from '@sveltejs/kit';
import { connectDB } from '$lib/database/config';
import type { User } from '$lib';
export const POST: RequestHandler = async ({ request, cookies }) => {
	// parse the request body
	const { mood, why } = await request.json();

	//validate the request body
	if (!mood || !why) {
		console.error('Missing required fields');
		return json({ error: 'Missing required fields' }, { status: 400 });
	}
	// get the user id from the cookie
	const userId = cookies.get('session');
	const username = cookies.get('username');
	// validate the cookie
	if (!userId) {
		return json({ error: 'Not today script kiddie' }, { status: 401 });
	}
	// add the mood to the database
	const user = await connectDB<User>('users');

	// find the user based on cookie
	const userDoc = await user.findOne({ username });

	if (!userDoc) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	const inserMood = await user.updateOne(
		{ username },
		{
			$push: {
				moods: { mood, content: why }
			},
			$inc: {
				[`overAllMood.${mood}`]: 1
			}
		}
	);
	// validate the insertion
	if (!inserMood) {
		return json({ error: 'Mood not added' }, { status: 500 });
	}
	return json({ message: 'Mood added successfully' }, { status: 200 });
};
