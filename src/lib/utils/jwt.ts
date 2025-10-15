import jwt from 'jsonwebtoken';

interface JwtProps {
	username: string;
	email?: string;
	password: string;
	secret: string;
}

export const token = ({ username, email, password, secret }: JwtProps) => {
	return jwt.sign({ username, email, password }, secret);
};
