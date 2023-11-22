const joi = require("joi");

const quizParamsSchema = joi.object({
  totalMarks: joi.number().required().min(1),
  difficulty: joi.object(),
  topics: joi.object(),
});

module.exports = {
  quizParamsSchema,
};
