import React, {useEffect, useState} from 'react';
import { Router, navigate, Link } from "@reach/router";
import AuthService from "./AuthService";
import Login from "./Login";
import Questions from './Questions';
import Question from './Question';

const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
  const [data, setData] = useState([]);
  const [answerdata, setAnswerData] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [postCount, setPostCount] = useState(0);

  const [thisTitle, setTitle] = useState("");
  const [thisDescription, setDescription] = useState("");
  
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

      //User Data
      const userurl = `${API_URL}/users`;
      const userresponse = await fetch(userurl);
      const userdata = await userresponse.json();
      setUserData(userdata);
      console.log(userdata);
    } 
    catch(error){
      console.error("Getting User Data", error.message);
      return{};
      }
    }
    getData();
  }, [postCount]);


// Functions

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log("Authentication:", resp.msg);
      setPostCount(postCount + 1);
    } catch (e) {
      console.log("Login", e);
    }
  }

  async function createUser(username, password) {
    try {
      const newUser = {
        username: username,
        password: password
      };
      const userurl = `${API_URL}/users`;
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      };

      const response = await fetch(userurl, requestOption);
      const userdate = await response.json();
      console.log(userdate);
      } 
      catch(error){
        console.error("Adding User", error.message);
            return{};
      }
      //const resp = await authService.login(username, password);
      //console.log("Authentication:", resp.msg);
      setPostCount(postCount + 1);
    }

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
      setPostCount(postCount + 1);
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

  const logged = <p>Not Logged in</p>
  

  // Render

  return (
    <>
      <h1>Mandatory Assignement - StackOverflow Edition</h1>
      
      <Router>
        <Questions path="/" questions={data}/> 
        <Question path="/question/:id" getQuestion={getQuestion} answers={answerdata} getAnswer={getAnswer} />
        
      </Router>
      <Login login={login} create={createUser} users={userdata} />
      {authService.loggedIn() ? <pre>User is logged in</pre> : <pre>User is not logged in</pre>}
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
