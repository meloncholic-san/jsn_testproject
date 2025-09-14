import express from "express";
import {
  getSuperheroes,
  postSuperhero,
  patchSuperhero,
  deleteSuperhero,
  getSuperheroByIdController
} from "../controllers/superheroController.js";
import validateBody from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js"
// import { authMiddleware } from '../middlewares/auth.js';
import { isValidId } from "../middlewares/isValidId.js";
import { upload } from '../middlewares/upload.js';
import { createSuperheroSchema, updateSuperheroSchema } from "../validationSchemes/superheroValidationSchema.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(getSuperheroes));
router.get("/:id", isValidId, ctrlWrapper(getSuperheroByIdController));
router.post("/", jsonParser, upload.array("images", 10), validateBody(createSuperheroSchema), ctrlWrapper(postSuperhero));
router.patch("/:id", isValidId, jsonParser, upload.array("images", 10), validateBody(updateSuperheroSchema), ctrlWrapper(patchSuperhero));
router.delete("/:id", isValidId, ctrlWrapper(deleteSuperhero));

export default router;



