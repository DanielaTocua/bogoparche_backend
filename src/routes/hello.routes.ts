import express from "express";

import helloController from "../controllers/hello.controller";
import asyncErrorMiddleware from "../middlewares/asyncError.middleware";

const router = express.Router();

router.get("/", asyncErrorMiddleware(helloController.hello));

export default router;
