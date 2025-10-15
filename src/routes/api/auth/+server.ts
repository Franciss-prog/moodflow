import { connectDB } from '$lib/database/config';
import { json, type RequestHandler } from '@sveltejs/kit';
import { compare } from 'bcrypt-ts';
import { token } from '$lib/utils/jwt';
import { JWT_SECRET } from '$env/static/private';
export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		// parse the request body
		const { username, password } = await request.json();

		// get the collection
		const usersCollection = await connectDB('users');

		// look for the user document
		const user = await usersCollection.findOne({ username });

		// if the user doesn't exist
		if (!user) {
			return json({ error: 'user not found' }, { status: 400 });
		}

		// compare passwords
		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			return json({ error: 'incorrect password' }, { status: 400 });
		}

		// set the cookies
		cookies.set(
			'session',
			token({ username, email: user.email, password: user.password, secret: JWT_SECRET }),
			{
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			}
		);
		// cookies for username
		cookies.set('username', user.username, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		return json({ message: `Welcome to Moodflow! ${user.username}` }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json({ error: 'internal server error' }, { status: 500 });
	}
};
