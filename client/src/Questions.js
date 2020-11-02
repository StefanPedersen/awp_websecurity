import { Link } from "@reach/router";
import React from "react";


function Questions(props) {
    
    let questions = props.questions; 
    let listOfQuestions = questions.map(
        question => 
        <li><Link to={`/question/${question._id}`} key={question._id}>
        {question.heading}</Link></li>
        )

return(
    <>
        <h3>Questions</h3>
        {listOfQuestions}
        <br />
        <Link to="/">Go Back</Link>
    </>
    );
}
export default Questions;


