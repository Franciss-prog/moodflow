export interface User {
	username: string;
	email: string;
	password: string;
	moods: { mood: string; content: string }[];
	overAllMood: {
		happy: number;
		sad: number;
		neutral: number;
		angry: number;
	};
}
