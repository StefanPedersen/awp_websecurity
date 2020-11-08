import React, {useEffect, useState} from 'react';
import { Router } from "@reach/router";

import Questions from './Questions';
import Question from './Question';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);
  const [answerdata, setAnswerData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/questions`;
      try{
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      //Answer Data
      const answerurl = `${API_URL}/answers`;
      const answerresponse = await fetch(answerurl);
      const answerdata = await answerresponse.json();
      setAnswerData(answerdata);
    } catch(error){
      console.error("Getting Data", error.message);
      return{};
      }

    }
    getData();

  }, []); 

  const [thisTitle, setTitle] = useState("");
  const [thisDescription, setDescription] = useState("");


  async function addQuestion(){
      const newQuestion = {
        title: thisTitle,
        text: thisDescription
      };
      const url = `${API_URL}/questions`;
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
      };
      try{
      const response = await fetch(url, requestOption);
      const data = await response.json();
      console.log(data);
      } catch(error){
        console.error("Adding Question", error.message);
            return{};
      }
    }

  function getQuestion(id){
    const question = data.find(element => element._id ===id);
    return question;
  }

  function getAnswer(id){
    const answer = answerdata.find(element => element.questionId === id)
    return answer;
  }


  return (
    <>
      
      <h1>Mandatory Assignement - StackOverflow Edition</h1>
      <Router>
        <Questions path="/" questions={data}/> 
        <Question path="/question/:id" getQuestion={getQuestion} answers={answerdata} getAnswer={getAnswer}/>
      </Router>
      <div>
          <h2>Ask a Question</h2>
          <input onChange={(event) => setTitle(event.target.value)} name="title" type="text"  /><br />  <br />  
          <input onChange={(event) => setDescription(event.target.value)} name="description" type="text"  /><br />  <br />  
          <button type="button" onClick={(event) => addQuestion()}>Submit Question</button>
       </div>
      
    </>
  );
}

export default App;
