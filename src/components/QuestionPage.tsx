import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IQuestionData from '../types/Question';
import AdminService from '../services/AdminService';
import IResultData from '../types/Result';
import UserService from '../services/UserService';
import WaitingPage from './WaitingPage';
import WebSocketComponent from './WebSocketComponent';

const QuestionPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const initialQuestionState = {
    id: null,
    text: "",
    firstAnswer: "",
    secondAnswer: ""
  };

  const [currentQuestion, setCurrentQuestion] = useState<IQuestionData>(initialQuestionState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (id)
      getQuestion(id);
  }, [id]);

  const getQuestion = (id: string) => {
    AdminService.getQuestionById(id)
      .then((response: any) => {
        setCurrentQuestion(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

  };

  const vote = (answer: string) => {

    var userId = sessionStorage.getItem("userid");

    console.log("username is " + userId);

    const voteData = {
      userId: userId,
      questionId: id,
      answer: answer
    };

    UserService.saveVote(voteData)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    console.log("vote: " + answer);
    setSubmitted(true);
  };

  let onMessageReceived = (msg: IQuestionData) => {
    navigate("/question/" + msg.id, { replace: true });
  }

  let onMessageReceived2 = (msg: IResultData) => {
    navigate("/result/" + id, { replace: true });
  }

  return (

    <div>
      <p><b>QuestionPage {currentQuestion.id}</b></p>

      {submitted ? (
        <WaitingPage />
      ) : (

        <div>
          <div>
            <p>Question : {currentQuestion.text}</p>
            <button onClick={() => vote(`${currentQuestion.firstAnswer}`)} className="btn btn-success">
              {currentQuestion.firstAnswer}
            </button>
            <button onClick={() => vote(`${currentQuestion.secondAnswer}`)} className="btn btn-success">
              {currentQuestion.secondAnswer}
            </button>
          </div>
        </div>)}

        <WebSocketComponent topics={['/topic/start']} onMessage = {(msg: IQuestionData) => onMessageReceived(msg)}/>
        <WebSocketComponent topics={['/topic/result']} onMessage = {(msg: IResultData) => onMessageReceived2(msg)}/>
    </div>

  )
}

export default QuestionPage