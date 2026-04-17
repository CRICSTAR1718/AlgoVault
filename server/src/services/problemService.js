import Problem from "../models/Problem.js";

export async function getAllProblems() {
  return Problem.find().sort({ createdAt: -1 });
}

export async function addProblem(payload) {
  return Problem.create(payload);
}
