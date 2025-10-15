import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let moods;
	let overAllMood;
	try {
		const response = await fetch('/api/mood/get');
		const data = await response.json();

		if (response.status === 200) {
			moods = data.moods;
			overAllMood = data.overAllMood;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}

	return {
		moods,
		overAllMood
	};
};
