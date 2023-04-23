declare namespace Express {
	export interface Request {
		username?: string;
		email?: string;
		user?: User;
	}
	export interface Response {
		username?: string;
		email?: string;
	}
}