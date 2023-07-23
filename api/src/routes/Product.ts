import express from "express";
import { ProductController } from "../controllers";
import middlewares from "../middlewares";
import { userRolesEnum } from "../models/type";

const router = express.Router();

router.get(
	"/",
	middlewares.authentication({ optional: true }),
	ProductController.cget
);

router.get(
	"/:id",
	middlewares.authentication({ optional: true }),
	ProductController.get,
);

router.post(
	"/",
	middlewares.authentication,
	middlewares.authorization({ verified: true }),
	ProductController.post,
);

router.put(
	"/:id",
	middlewares.authentication,
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	ProductController.put,
);

router.delete(
	"/:id",
	middlewares.authentication,
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	ProductController.delete,
);

router.patch(
	"/verify/:id",
	middlewares.authentication,
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	(req: any, res: any) => {
		req.body = {
			verifiedBy: req.user.id,
			visible: true,
		};
	},
	ProductController.put,
)

export default router;
