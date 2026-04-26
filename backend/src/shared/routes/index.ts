import { Router } from "express";
import {authRouter }from "../../auth";
import { clientRouter } from "../../clients";
authRouter

const router = Router();

router.use("/auth", authRouter);
router.use("/clients",clientRouter)

export default router;