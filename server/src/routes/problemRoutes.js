import express from "express";
import { createProblem, getProblems, updateProblem, deleteProblem } from "../controllers/problemController.js";

const router = express.Router();

router.route("/")
  .get(getProblems)
  .post(createProblem);

router.route("/:id")
  .put(updateProblem)
  .delete(deleteProblem);

export default router;
