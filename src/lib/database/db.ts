import { MONGODB_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';

let client: MongoClient;

if (!MONGODB_URL) {
	throw new Error('.env cannot initizialized');
}
declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!globalThis._mongoClientPromise) {
	client = new MongoClient(MONGODB_URL);
	globalThis._mongoClientPromise = client.connect();
}
const clientPromise: Promise<MongoClient> = globalThis._mongoClientPromise;

export default clientPromise;
