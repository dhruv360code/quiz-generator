# Node.js Backend Server for Dynamic Question Generation

This repository contains the code for a Node.js backend server that dynamically generates questions based on the difficulty of topics.

## Getting Started

Follow these steps to set up and run the backend server on your local machine.

### Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone [https://github.com/your-username/question-generator-backend.git](https://github.com/dhruv360code/quiz-generator.git)
   ```

2. Navigate to the project directory:

   ```bash
   cd quz-generator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Server

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:3000` by default.

## API Endpoints

### 1. Generate a Question

- **Endpoint:** `/api/quiz`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "totalMarks": 100,
    "difficulty":{
        "easy": 26,
        "medium": 24,
        "hard": 50
    }

  }
  ```
- **Response:**
  ```json
  {
    "code": 200,
    "data": [
        {
            "question": "Question 55",
            "subject": "SubjectA",
            "topic": "TopicX",
            "difficulty": "easy",
            "marks": 1
        },
        {
            "question": "Question 64",
            "subject": "SubjectA",
            "topic": "TopicZ",
            "difficulty": "easy",
            "marks": 1
        },
        {
            "question": "Question 22",
            "subject": "SubjectB",
            "topic": "TopicQ",
            "difficulty": "easy",
            "marks": 1
        },
        {},{}
    ],
    "message": "Quiz generated successfully"
}```


Adjust the endpoint and payload based on your application's needs.

## Technologies Used

- Node.js
- Express.js
- 
# Question Paper Generation Logic

This module encompasses the logic for dynamically generating question papers based on specified criteria, including difficulty levels, topics, and total marks. The primary objective is to ensure that the generated question paper aligns with the desired distribution of difficulty levels and topics while adhering to the specified total marks constraint.

## `_paramsBuilder` Function

The `_paramsBuilder` function plays a crucial role in validating and extracting parameters from the request body. It conducts the following checks:

- **Difficulty Sum Check:** Ensures that the sum of difficulty levels is 100.
- **Difficulty Multiple Check:** Verifies that the distribution of difficulty levels aligns with specific multiples (easy, medium, and hard).
- **Topics Sum Check:** Ensures that the sum of topic percentages is 100.

The function returns an array with an error message and `null` if validation fails. If successful, it provides `null` and an object containing the extracted parameters for further processing.

## `shuffleQuestions` Function

The `shuffleQuestions` function employs the Fisher-Yates algorithm to randomize the order of questions in an array. This step is crucial for preventing biases in the selection process.

## `generateQuestionPaper` Function

The `generateQuestionPaper` function takes parameters such as `totalMarks`, `property` (representing difficulty or topics), and `propertyDistribution` (distribution percentages). It leverages the `_selectQuestions` function to choose questions based on the specified criteria.

The function iterates through the distribution, calculates the marks for each category, and selects questions accordingly. The final result is an array containing the selected questions, forming a comprehensive question paper.

## `_selectQuestions` Function

The `_selectQuestions` function filters available questions based on the specified category (e.g., difficulty level or topic) and maximum marks. Following this, it shuffles the filtered questions and selects questions until the total marks for the category are reached. If an insufficient number of questions is available, an error is returned.

This logic ensures that the generated question paper aligns with the specified distribution and total marks, maintaining a balanced representation of difficulty levels and topics.
