import express from "express";
import { RateController } from "../controllers";
import middlewares from "../middlewares";


const router = express.Router();

router.get(
	"/",
	middlewares.authorization({ verified: false }),
	RateController.cget,
);

router.post("/", RateController.post);

router.get(
	"/:id",
	middlewares.authorization({ verified: false }),
	RateController.get,
);

router.put(
	"/:id",
	RateController.put,
);

router.delete(
	"/:id",
	RateController.delete,
);

export default router;
