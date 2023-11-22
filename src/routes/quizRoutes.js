const router = require("express").Router();

const { generateQuiz } = require("../controllers/quizController");

router.post("/quiz", generateQuiz);

module.exports = router;
