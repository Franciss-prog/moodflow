import { Collection } from 'mongodb';
import type { Document } from 'mongodb';
import clientPromise from './db';

export const connectDB = async <T extends Document = Document>(
	collection: string
): Promise<Collection<T>> => {
	return (await clientPromise).db('moodflow').collection<T>(collection);
};
