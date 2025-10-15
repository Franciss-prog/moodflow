import axios from 'axios';

// custom fetch
interface FetchProps {
	url: string;
	data?: Object;
	method: string;
}
export const customAxios = async ({ url, data, method }: FetchProps) => {
	// validate what method using
	if (!method) {
		return;
	}
	if (method === 'POST') {
		return await axios.post(url, data);
	}
	if (method === 'GET') {
		return await axios.get(url);
	}
};
