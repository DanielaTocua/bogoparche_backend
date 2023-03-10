import express from "express";
import passport from "passport";

import helloController from "../controllers/hello.controller";

const router = express.Router();

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	helloController.hello,
);

export default router;
