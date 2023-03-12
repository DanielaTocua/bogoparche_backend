import express from "express";

import helloController from "../controllers/hello.controller";

const router = express.Router();

router.get("/", helloController.hello);

export default router;
