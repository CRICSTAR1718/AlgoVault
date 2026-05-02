import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    problemName: { type: String, required: true },
    platform: { type: String, default: "LeetCode" },
    link: { type: String, default: "" },
    topic: { type: String, default: "" },
    pattern: { type: String, default: "" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    status: { type: String, enum: ["Solved", "Not Solved", "Revision"], default: "Not Solved" },
    attempts: { type: Number, default: 1 },
    timeComplexity: { type: String, default: "" },
    approach: { type: String, default: "" },
    keyIdea: { type: String, default: "" },
    mistake: { type: Boolean, default: false },
    dateSolved: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
