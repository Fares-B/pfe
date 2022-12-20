import { BanController } from "../controllers";
import express from "express";

const router = express.Router();

router.get("/", BanController.cget);

router.get("/:id", BanController.get);

router.post("/:id", BanController.post);

router.put("/:id", BanController.put);

router.delete("/:id", BanController.delete);

export default router;
