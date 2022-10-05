import { BanController } from "../controllers";
import express from 'express';

const router = express.Router();

router.get("/", BanController.cget);

router.post("/", BanController.post);

router.get("/:id", BanController.get);

router.delete("/:id", BanController.delete);

export default router;
