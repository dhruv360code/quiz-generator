const questionStore = require("./quesStore");

const _paramsBuilder = (body) => {
  const quizParams = {
    numberOfQuestions: body.numberOfQuestions,
    difficulty: body.difficulty,
    category: body.category,
    type: body.type,
  };
  return quizParams;
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleQuestions = (question) => {
  for (let i = question.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [question[i], question[j]] = [question[j], question[i]];
  }
};

const generateQuestionPaper = (totalMarks, property, propertyDistribution) => {
  const questionPaper = [];
  for (const key in propertyDistribution) {
    const marksForproperty = Math.floor(
      totalMarks * (propertyDistribution[key] / 100)
    );
    const selectedQuestions = _selectQuestions(key, marksForproperty);
    questionPaper.push(...selectedQuestions);
  }

  return questionPaper;
};

const _selectQuestions = (key, marks) => {
  const availableQuestions = questionStore.filter(
    (q) => q[property] === key && q.marks <= marks
  );

  shuffleQuestions(availableQuestions);

  const selectedQuestions = [];
  let currentMarks = 0;

  while (currentMarks < marks && availableQuestions.length > 0) {
    const selectedQuestion = availableQuestions.shift();

    selectedQuestions.push(selectedQuestion);
    currentMarks += selectedQuestion.marks;
  }

  return selectedQuestions;
};

module.exports = {
  _paramsBuilder,
  generateQuestionPaper,
};
