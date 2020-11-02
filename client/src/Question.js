import React, { Component, useState, useEffect } from 'react';
import { Link } from '@reach/router';

function Question(props) {
    const id = props.id
    const question = props.getQuestion(props.id);
    let filter = props.filter;
    //let filterHead =""; 

    let answers = props.answers.filter(answer => answer.questionId === props.id);
    if(filter){
        answers = props.answers.filter(answer => answer.questionId.includes(filter));
    }   
    let listOfAnswers = answers.map(element =>
    <div class="score"><div key={element._id}>
      <span>
        <button type="button" onClick={(event) => {
        upVoteScore(element._id, element.score); 
        }}>
        &#8593;
    </button></span>
    <div id={element._id}>{element.score}</div><span>
        <button type="button" onClick={(event) => {
        downVoteScore(element._id, element.score); 
        }}>
      &#8595;
    </button></span></div> <div class="answer"> {element.answer}</div></div>
    )
    
    //AddAnswer
    const API_URL = process.env.REACT_APP_API;  

  useEffect(() => {
    const fetchData = async () => {
      const answerurl = `${API_URL}/answers`;
      const answerresponse = await fetch(answerurl, {mode:'cors'});
      const answerdata = await answerresponse.json();
      setAnswer(answerdata);
      
    }
    fetchData()    
  }, []);

  const [input, setAnswer] = useState("");

  async function upVoteScore(id, score){
    score += 1;
    document.getElementById(id).innerHTML = score;
 
    const upVote = {
      id: id,
      score:score 
    };
    console.log(upVote);
    const answerurl = `${API_URL}/answers`;
    const requestOption = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(upVote)
    };
    const answerresponse = await fetch(answerurl, requestOption);
    const answerdata = await answerresponse.json();
    console.log(answerdata);
  }

  async function downVoteScore(id, score){
    score -= 1;
    document.getElementById(id).innerHTML = score;

    const downVote = {
      id: id,
      score:score 
    };
    console.log(downVote);
    const answerurl = `${API_URL}/answers`;
    const requestOption = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(downVote)
    };
    const answerresponse = await fetch(answerurl, requestOption);
    const answerdata = await answerresponse.json();
    console.log(answerdata);
  }

    async function addAnswer(){
        const newAnswer = {
          question: id,
          text: input,
          score:0
        };
        const answerurl = `${API_URL}/answers`;
        const requestOption = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnswer)
        };
        const answerresponse = await fetch(answerurl, requestOption);
        const answerdata = await answerresponse.json();
        console.log(answerdata);
      }

    return(
        
        <>
            <h1>{question.heading}</h1>
            <p>Answers:</p>
            {listOfAnswers}
            <br></br>
            <h2>Add answer</h2>
            <input onChange={(event) => setAnswer(event.target.value)} name="answer" type="text"  /><br />  <br />  
            <button type="button" onClick={(event) => addAnswer()}>Submit Answer</button>
            <br></br><br></br>
            <Link to="/">Go Back</Link>
        </>
    );
}

export default Question;