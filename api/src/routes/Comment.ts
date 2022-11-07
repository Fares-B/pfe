import express from "express";
import { CommentController } from "../controllers";
import middlewares from "../middlewares";
import { userRolesEnum } from "../models/type";

const router = express.Router();

router.get(
	"/",
	middlewares.authorization({ verified: false }),
	CommentController.cget,
);

router.post("/", CommentController.post);

router.get(
	"/:id",
	middlewares.authorization({ verified: false }),
	CommentController.get,
);

router.put(
	"/:id",
	middlewares.authorization({
		role: userRolesEnum.MODERATOR,
		isCurrentUser: true,
	}),
	CommentController.put,
);

router.delete(
	"/:id",
	middlewares.authorization({
		role: userRolesEnum.MODERATOR,
		isCurrentUser: true,
	}),
	CommentController.delete,
);

export default router;
