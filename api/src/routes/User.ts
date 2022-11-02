import { UserController } from "../controllers";
import middlewares from "../middlewares";
import express from "express";
import { userRolesEnum } from "../models/type";

const router = express.Router();

router.get(
	"/",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	UserController.cget,
);

router.post(
	"/",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	UserController.post,
);

router.get(
	"/:id",
	middlewares.authorization({ verified: false }),
	UserController.get,
);

router.put(
	"/:id",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	UserController.put,
);

// router.delete("/:id", UserController.delete);

export default router;
