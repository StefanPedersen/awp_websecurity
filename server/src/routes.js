module.exports = (questionDB) => {
  const express = require("express");
  const router = express.Router();
  const router2 = express.Router();

  /**** Routes ****/
  router.get('/', async (req, res) => {
    const questions = await questionDB.getQuestions(); 
    res.json(questions)
      
  });

  router.get('/:id', async (req, res) => {
    const question = await questionDB.getQuestion(req.params.id);
    res.json(question);
  });

  router2.get('/', async (req, res) => {
    const answers = await questionDB.getAnswers(); 
    res.json(answers)
      
  });

  router2.get('/:id', async (req, res) => {
    const answers = await questionDB.getAnswers(); 
    res.json(answers)
      
  });

  //Create Answer
  router2.post("/", async (req, res) => {
    const postQuestionID = req.body.question;  
    const postAnswer = req.body.text;
    const postScore = req.body.score;

    addAnswer = {question: postQuestionID, text:postAnswer, score:postScore};

    await questionDB.createAnswer(postQuestionID, postAnswer);
    
    res.json(addAnswer);
    });

    //Create Question
  router.post('/', async (req, res) => {

    const postHeading = req.body.title;
    const postDescription = req.body.text;

    addQuestion = {title: postHeading, text:postDescription};
    await questionDB.createQuestion(postHeading, postDescription);
    res.json(addQuestion);
  });

  //Update Answer
  router2.patch('/', async (req, res) => {

    const postId = req.body.id
    const postscore = req.body.score

    updateScore = {id: postId, newscore:postscore}
    await questionDB.updateScore(postId,postscore);
    res.json(updateScore);
  })

  return {router, router2};
}
