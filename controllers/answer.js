import Answers from "../models/Answer.js";
import Questions from "../models/Question.model.js";

export const createAnswer = async (req, res, next) => {
  const questionId = req.params.questionId;
  const newAnswer = new Answers({ ...req.body });

  try {
    const savedAnswer = await newAnswer.save();

    await Questions.findByIdAndUpdate(questionId, {
      $push: { answers: savedAnswer._id },
    });
    res.status(200).json(savedAnswer);
  } catch (err) {
    next(err);
  }
};

export const getAnswers = async (req, res, next) => {
  try {
    console.log(req.params.answerId)
    const answers = await Answers.findById(req.params.answerId);
    res.status(200).json(answers);
  } catch (err) {
    next(err);
  }
};
