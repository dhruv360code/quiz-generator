const questionStore = require("./quesStore");

const _paramsBuilder = (body) => {
  if (body.difficulty) {
    // all keys sum should be 100
    const sum = Object.values(body.difficulty).reduce((a, b) => a + b, 0);
    if (sum !== 100) {
      return [
        {
          message: "Sum of difficulty should be 100",
        },
        null,
      ];
    }

    if (
      body.difficulty.easy &&
      ((body.difficulty.easy * body.totalMarks) / 100) % 1 !== 0
    ) {
      return [
        {
          message: "Easy difficulty should be a multiple of 1",
        },
        null,
      ];
    } else if (
      body.difficulty.medium &&
      ((body.difficulty.medium * body.totalMarks) / 100) % 2 !== 0
    ) {
      return [
        {
          message: "Medium difficulty should be a multiple of 2",
        },
        null,
      ];
    } else if (
      body.difficulty.hard &&
      ((body.difficulty.hard * body.totalMarks) / 100) % 5 !== 0
    ) {
      return [
        {
          message: "Hard difficulty should be a multiple of 5",
        },
        null,
      ];
    }

    return [
      null,
      {
        property: "difficulty",
        propertyDistribution: body.difficulty,
        totalMarks: body.totalMarks,
      },
    ];
  }
  return [null, { totalMarks: body.totalMarks }];
};

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleQuestions = (question) => {
  for (let i = question.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [question[i], question[j]] = [question[j], question[i]];
  }
};

const generateQuestionPaper = ({
  totalMarks,
  property,
  propertyDistribution,
}) => {
  console.log(totalMarks, property, propertyDistribution);
  const questionPaper = [];
  for (const key in propertyDistribution) {
    const marksForproperty = Math.floor(
      totalMarks * (propertyDistribution[key] / 100)
    );
    const [err, selectedQuestions] = _selectQuestions(
      key,
      property,
      marksForproperty
    );
    if (err) {
      return [err, null];
    }
    questionPaper.push(...selectedQuestions);
  }

  return [null, questionPaper];
};

const _selectQuestions = (key, property, marks) => {
  console.log(key, property, marks);
  const availableQuestions = questionStore.filter(
    (q) => q[property] === key && q.marks <= marks
  );
  // console.log(availableQuestions);

  shuffleQuestions(availableQuestions);

  const selectedQuestions = [];
  let currentMarks = 0;

  while (currentMarks < marks && availableQuestions.length > 0) {
    const selectedQuestion = availableQuestions.shift();

    selectedQuestions.push(selectedQuestion);
    currentMarks += selectedQuestion.marks;
  }

  console.log(marks, currentMarks);

  if (currentMarks < marks) {
    return [
      {
        message: `Not enough questions available for ${key} category in ${property}`,
      },
      null,
    ];
  }

  return [null, selectedQuestions];
};

module.exports = {
  _paramsBuilder,
  generateQuestionPaper,
};
