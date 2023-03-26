import express from "express"; //ESModules

import categoryController from "../controllers/category.controller";

// Crea router
const router = express.Router();

// Gets all activities (plan/events)
router.route("/get-categories").get(categoryController.getAll);

export default router;
