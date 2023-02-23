import express from "express";
import { createQuestion, getAllQuestion, getQuestion} from "../controllers/question.js";
import { createAnswer,getAnswers } from "../controllers/answer.js";
import {auth} from "../middleware/auth.js"
// import Hotel from "../models/Hotel.js";
const router = express.Router();

//CREATE
router.post("/addquestion", createQuestion);

router.post("/answer/:questionId", createAnswer)

//GET
router.get("/find/:id", getQuestion);

router.get("/", getAllQuestion)

router.get("/find/:questionId/answers/:answerId", getAnswers)

export default router;