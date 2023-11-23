const { quizParamsSchema } = require("../joi/quiz.joi");
const { _paramsBuilder, generateQuestionPaper } = require("../utils/helpers");
const { serverErrorResponse, successResponse } = require("../utils/response");

const generateQuiz = async (req, res) => {
  try {
    // req body validation
    const joiError = quizParamsSchema.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    console.log(req.body);

    // build quiz parameters
    const [err0, quizParams] = _paramsBuilder(req.body);
    if (err0) {
      return serverErrorResponse(res, err0.message);
    }
    console.log(quizParams);

    // generate quiz questions
    const [err1, quizQuestions] = generateQuestionPaper(quizParams);
    if (err1) {
      return serverErrorResponse(res, err1.message);
    }

    return successResponse(res, quizQuestions, "Quiz generated successfully");
  } catch (err) {
    return serverErrorResponse(res, `Error in controller ${err.message}`);
  }
};

module.exports = {
  generateQuiz,
};
