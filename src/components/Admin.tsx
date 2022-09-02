import React, { useState } from 'react'
import SockJsClient from 'react-stomp';
import AdminService from '../services/AdminService';
import Constants from "../Constants";
import IQuestionData from '../types/Question';
import WebSocketComponent from './WebSocketComponent';

const Admin = () => {

  const [showQuestionNo, setShowQuestionNo] = useState<boolean>(false);
  const [showResultNo,setShowResultNo] =useState<boolean>(false);
  const [questionNo, setQuestionNo] = useState<number>(0);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);

  const startSession = () => {
    AdminService.startSession();
    /*   .then((response: any) => {
 
         console.log(response.data);
       })
       .catch((e: Error) => {
         console.log(e);
       });
 
 */

  };

  const showNextQuestion = () => {
    AdminService.showNextQuestion(questionNo);
    /*   .then((response: any) => {
 
         console.log(response.data);
       })
       .catch((e: Error) => {
         console.log(e);
       });
 
 */
       setShowResultNo(false);

  };

  const showResult= () => {
    AdminService.showResult(questionNo);
    /*   .then((response: any) => {
 
         console.log(response.data);
       })
       .catch((e: Error) => {
         console.log(e);
       });
 
 */
    setShowQuestionNo(false);
   setShowResultNo(true);
   // setInfo("Result "+ {questionNo} + "is on screen....")

  };


  const endSession = () => {
    //delete all users and user answers

    AdminService.endSession();
    /* .then((response: any) => {
 
         console.log(response.data);
       })
       .catch((e: Error) => {
         console.log(e);
       });
 
 */
       setShowResultNo(false);

  };

  let onMessageReceived = (msg: IQuestionData) => {
    
    setQuestionNo(msg.id);
    setShowQuestionNo(true);
  }

  let onMessageReceived2 = (msg: number) => {
    setNumberOfUsers(msg);
  }


  return (
    <div>Admin

      <button onClick={startSession} className="btn btn-success">
        Start
      </button>

      <div>
      <WebSocketComponent topics={['/topic/start']} onMessage= {(msg: IQuestionData) => onMessageReceived(msg)}/>
      <WebSocketComponent topics={['/topic/message']} onMessage={(msg2: number) => onMessageReceived2(msg2)}/>
      <WebSocketComponent topics={['/topic/next']}  onMessage={(msg: IQuestionData) => onMessageReceived(msg)}/>    
      <p>online users: {numberOfUsers}</p>

        {showQuestionNo && <div><p>Question {questionNo} is on screen....</p><button onClick={showResult} className="btn btn-success">
       Show Result
      </button></div> }
        {showResultNo && <div><p>Result {questionNo} is on screen....</p><button onClick={showNextQuestion} className="btn btn-success">
        Next
      </button> </div> }

    
      <button onClick={endSession} className="btn btn-success">
        End Session
      </button>
      </div>
    </div>
  )
}

export default Admin