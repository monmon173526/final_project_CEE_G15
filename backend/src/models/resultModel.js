import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  board: {
    type: Number,
    required: true, 
  }
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
