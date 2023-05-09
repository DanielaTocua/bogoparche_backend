import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import { appDataSource } from "./dataSource";
import errorMiddleware from "./middlewares/error.middleware";
import activitiesRoutes from "./routes/activity.routes";
import attendanceRoutes from "./routes/attendance.routes";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.router";
import commentRoutes from "./routes/comment.routes";
import eventRoutes from "./routes/event.routes";
import favoriteRoutes from "./routes/favorite.routes";
import helloRoutes from "./routes/hello.routes";
import planRoutes from "./routes/plan.routes";
import userRoutes from "./routes/user.routes";
export class App {
	private readonly _app: Application;

	constructor() {
		this._app = express();
		this.initDatabase();
		this.initMiddlewares();
	}

	private initDatabase() {
		appDataSource.initialize();
	}

	private initMiddlewares() {
		this._app.use(cors());
		this._app.use(helmet());
		this._app.use(express.json());
		this._app.use(express.urlencoded({ extended: true }));

		this._app.use("/api/activity", activitiesRoutes);
		this._app.use("/api/plan", planRoutes);
		this._app.use("/api/event", eventRoutes);
		this._app.use("/api/favorite", favoriteRoutes);
		this._app.use("/api/attendance", attendanceRoutes);
		this._app.use("/api/category", categoriesRoutes);
		this._app.use("/api/comment", commentRoutes);
		this._app.use("/api/auth", authRoutes);
		this._app.use("/api/hello", helloRoutes);
		this._app.use("/api/user", userRoutes);
		this._app.use(errorMiddleware);
	}

	public get app(): Application {
		return this._app;
	}
}
