import express from "express";
import { ReportController } from "../controllers";
import middlewares from "../middlewares";
import { userRolesEnum } from "../models/type";

const router = express.Router();

router.get(
	"/",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	ReportController.cget,
);

router.get(
	"/:id",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	ReportController.get,
);

router.post("/", ReportController.post);

router.put(
  "/:id",
  middlewares.authorization({ role: userRolesEnum.MODERATOR }),
  ReportController.put,
);

router.delete(
	"/:id",
	middlewares.authorization({ role: userRolesEnum.MODERATOR }),
	ReportController.delete,
);

export default router;
