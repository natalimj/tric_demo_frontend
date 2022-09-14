import React, { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import UserService from '../services/UserService';
import IQuestionData from '../types/Question';
import IUserData from '../types/User';
import WaitingPage from './WaitingPage';


type QuestionProps = { user: IUserData; questionNumber: number };

const Question = ({ user, questionNumber }: QuestionProps) => {

  const initialQuestionState = {
    id: null,
    questionNumber: 0,
    questionText: "",
    answers: []
  };

  const [currentQuestion, setCurrentQuestion] = useState<IQuestionData>(initialQuestionState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    getQuestion(questionNumber);
  }, []);

  const getQuestion = (no: number) => {
    AdminService.getQuestionByNumber(no)
      .then((response: any) => {
        setCurrentQuestion(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

  };

  const vote = (answerId: any) => {
    const voteData = {
      userId: user.id,
      questionId: currentQuestion.questionId,
      answerId: answerId
    };

    UserService.saveVote(voteData)
      .then((response: any) => {
        console.log(response.data);
        sessionStorage.setItem("answerId",answerId);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    console.log("vote: " + answerId);
    setSubmitted(true);
  };


  return (
    <div>
      <p><b>QuestionPage {currentQuestion.questionId}</b></p>
      {submitted ? (
         (<WaitingPage />)
        ) : (
        <div>
          <div>
            <p>Question : {currentQuestion.questionText}</p>
            {currentQuestion.answers && currentQuestion.answers.map((answer) => (
              <button onClick={() => vote(answer.answerId)} className="btn btn-success">
                <p>{answer.answerText.toString()}</p>
              </button>
            ))}
          </div>
        </div>)}
    </div>
  )
}
export default Question