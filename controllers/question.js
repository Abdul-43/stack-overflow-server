import Questions from "../models/Question.model.js";

export const createQuestion = async (req, res, next) => {
  const newQuestion = new Questions(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    next(err);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    const question = await Questions.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};

export const getAllQuestion = async (req, res, next) => {
  try {
    const questions = await Questions.find();
    res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
};
