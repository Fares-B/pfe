import { UserController } from "../controllers";
import middlewares from "../middlewares";
import express from 'express';
const router = express.Router();


router.get("/all", middlewares.authorization({ role : 'admin' }), UserController.cget);

router.post("/", UserController.post);

router.get("/", UserController.get);

router.put("/", UserController.put);

// router.delete("/:id", UserController.delete);

router.put("/ban", UserController.ban);

export default router;
