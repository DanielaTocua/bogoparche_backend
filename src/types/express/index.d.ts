declare namespace Express {
	export interface Request {
		username?: string;
		email?: string;
<<<<<<< HEAD
		user?: User;
=======
		user?:User;
>>>>>>> 7a99664b067eb018fba5ca9bb0f8c9e0df84186c
	}
	export interface Response {
		username?: string;
		email?: string;
	}
}
