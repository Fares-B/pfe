import express from "express";
import { GroupController } from "../controllers";
import middlewares from "../middlewares";
import { USER_ROLE } from "../models/type";


const router = express.Router();

router.get(
	"/",
	middlewares.authentication({ optional: true }),
	GroupController.cget,
	);
	
router.get(
	"/:id",
	middlewares.authentication({ optional: true }),
	GroupController.get,
);

router.post(
	"/",
	middlewares.authentication,
	middlewares.authorization({ role: USER_ROLE.MODERATOR }),
	GroupController.post
);

router.put(
	"/:id",
	middlewares.authentication,
	middlewares.authorization({ role: USER_ROLE.MODERATOR }),
	GroupController.put,
);

router.delete(
	"/:id",
	middlewares.authentication,
	middlewares.authorization({ role: USER_ROLE.MODERATOR }),
	GroupController.delete,
);

export default router;
