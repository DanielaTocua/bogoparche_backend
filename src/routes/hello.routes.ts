import express from "express";

import helloController from "../controllers/hello.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, helloController.hello);

export default router;
