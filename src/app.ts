import cors from "cors";
import express, { Application } from "express";
import session from "express-session"
import helmet from "helmet";
import errorMiddleware from "./middlewares/error.middleware";
import authMiddleware from "./middlewares/auth.middleware";
import helloRoutes from "./routes/hello.routes";
import bodyParser from 'body-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import authRoutes from "./routes/auth.routes";

export class App {
	private readonly _app: Application;

	constructor() {
		this._app = express();
		this.initMiddlewares();
	}

	private initMiddlewares() {
		this._app.use(cors());
		this._app.use(helmet());
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: true }));

		// For the database
		this._app.use(session({
			secret: 'secret',
			resave: false,
			saveUninitialized: false
		}));
		this._app.use(bodyParser.json());
		this._app.use(bodyParser.urlencoded({ extended: true }));
		this._app.use(passport.initialize());
		this._app.use(passport.session());
		
		authMiddleware(passport);
		
		this._app.use("/", authRoutes);
		this._app.use(errorMiddleware);
		
		
		
	}

	public get app(): Application {
		return this._app;
	}
}
