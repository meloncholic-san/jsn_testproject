import { Router } from "express";
import superheroRouter from "./superheroRoutes.js"

const router = Router();


router.use('/superhero', superheroRouter);

export default router;
