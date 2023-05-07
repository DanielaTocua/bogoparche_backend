declare namespace Express {
	export interface Request {
		username?: string;
		email?: string;
		userId?: number;
		isAdmin?: boolean;
	}
	export interface Response {
		username?: string;
		email?: string;
		userId?: number;
		isAdmin?: boolean;
	}
}
