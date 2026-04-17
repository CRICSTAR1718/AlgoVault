import Problem from "../models/Problem.js";

export async function getProblems(req, res, next) {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    next(error);
  }
}

export async function createProblem(req, res, next) {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    next(error);
  }
}

export async function updateProblem(req, res, next) {
  try {
    const { id } = req.params;
    const problem = await Problem.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    
    res.json(problem);
  } catch (error) {
    next(error);
  }
}

export async function deleteProblem(req, res, next) {
  try {
    const { id } = req.params;
    const problem = await Problem.findByIdAndDelete(id);
    
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    
    res.json({ message: "Problem removed" });
  } catch (error) {
    next(error);
  }
}
