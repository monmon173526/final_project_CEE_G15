import express from "express";

import * as resultController from "../controllers/resultController.js";

const router = express.Router();

router.get("/", resultController.getResults);
router.post("/", resultController.createResult);
//router.delete("/:id", resultController.deleteMember);

export default router;