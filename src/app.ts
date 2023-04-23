import "./config/passportConfig";

import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import passport from "passport";

import errorMiddleware from "./middlewares/error.middleware";
import activitiesRoutes from "./routes/activities.router";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.router";
import helloRoutes from "./routes/hello.routes";
import userRoutes from "./routes/user.routes";
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
		this._app.use(passport.initialize());
		this._app.use("/api", activitiesRoutes);
		this._app.use("/api", categoriesRoutes);
		this._app.use("/api", authRoutes);
		this._app.use("/api", helloRoutes);
		this._app.use("/api", userRoutes);
		this._app.use(errorMiddleware);
	}

	public get app(): Application {
		return this._app;
	}
}
