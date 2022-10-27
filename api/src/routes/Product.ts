import { ProductController } from "../controllers";
import middlewares from "../middlewares";
import express from 'express';
import { userRolesEnum } from "../models/type";

const router = express.Router();

router.get("/", ProductController.cget);

router.post(
    "/",
    middlewares.authorization({ role: userRolesEnum.MODERATOR }),
    ProductController.post
);

router.get(
    "/:id",
    // middlewares.authorization({ verified: false }),
    ProductController.get
);

router.get(
    "/barcode/:barcode",
    middlewares.authorization({ verified: false }),
    ProductController.get
);

router.put(
    "/:id",
    middlewares.authorization({ role: userRolesEnum.MODERATOR }),
    ProductController.put
);

router.delete(
    "/:id", 
    middlewares.authorization({ role: userRolesEnum.MODERATOR }),
    ProductController.delete,
);

export default router;
