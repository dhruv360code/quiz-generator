const { _paramsBuilder, generateQuestionPaper } = require("../utils/helpers");
const { serverErrorResponse } = require("../utils/response");

const generateQuiz = async (req, res) => {
  try {
    // req body validation

    // build quiz parameters
    const [err0, quizParams] = _paramsBuilder(req.body);
    if (err0) {
      return serverErrorResponse(res, err0.message);
    }

    // generate quiz questions
    const [err1, quizQuestions] = generateQuestionPaper(quizParams);
    if (err1) {
      return serverErrorResponse(res, err1.message);
    }

    return successResponse(res, quizQuestions);
  } catch (err) {
    return serverErrorResponse(res, err.message);
  }
};

module.exports = {
  generateQuiz,
};
