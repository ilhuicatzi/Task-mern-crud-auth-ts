import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers";
import { validateSchema } from "../middlewares/validatorSchema.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { authRequired } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/signup", validateSchema(registerSchema) ,authControllers.register);
router.post("/signin", validateSchema(loginSchema) ,authControllers.login);
router.get("/profile", authRequired ,authControllers.profile);
router.post("/signout", authControllers.logout);
router.post("/verify", authControllers.verify);

export default router;
