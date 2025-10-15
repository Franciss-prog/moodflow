import { genSalt, hash } from 'bcrypt-ts';
import { json, type RequestHandler } from '@sveltejs/kit';
import { connectDB } from '$lib/database/config';
import { token } from '$lib/utils/jwt';
import { JWT_SECRET } from '$env/static/private';
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		// parse the request
		const { username, email, password } = await request.json();

		// connect to the database
		const user = await connectDB('users');

		// if the user already exists
		if ((await user.findOne({ username })) || (await user.findOne({ email }))) {
			return json({ error: 'user Already exists' }, { status: 400 });
		}

		// hash the password
		const hashedPassword = await hash(password, await genSalt(10));

		// create a user
		await user.insertOne({
			username,
			email,
			password: hashedPassword,
			moods: [],
			// start with empty moods and insert the mood later to add
			overAllMood: { happy: 0, chill: 0, sad: 0, angry: 0 },
			createdAt: new Date()
		});

		// set the cookies with jwt
		cookies.set(
			'session',
			token({ username, email, password: hashedPassword, secret: JWT_SECRET }),
			{
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			}
		);
		// cookies for username
		cookies.set('username', username, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		// return the user
		return json({ message: `Welcome to Moodflow! ${username}` }, { status: 200 });
	} catch (error) {
		return json({ error }, { status: 400 });
	}
};
