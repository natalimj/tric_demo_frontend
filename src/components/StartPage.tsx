import React, { useState, ChangeEvent } from "react";
import UserService from "../services/UserService";
import IUserData from '../types/User';
import IQuestionData from '../types/Question';
import WaitingPage from "./WaitingPage";
import WebSocketComponent from "./WebSocketComponent";
import Question from "./Question";
import MainPage from "./MainPage";


const StartPage = () => {
    const initialUserState = {
        id: null,
        username: "",
        imagePath: ""
      };
      const [user, setUser] = useState<IUserData>(initialUserState);
      const [submitted, setSubmitted] = useState<boolean>(false);
      const [sessionStarted, setSessionStarted] = useState<boolean>(false);
      const [questionNumber, setQuestionNumber] = useState(0);
    
      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };
    
      const saveUser = () => {
        var data = {
          username: user.username,
          imagePath: ""
        };
        UserService.createUser(data)
          .then((response: any) => {
            setSubmitted(true);  // hide input field and button - show spinner
            setUser(response.data)
          })
          .catch((e: Error) => {
            console.log(e);
          });
    
      };
    
      let onQuestionMessageReceived = (msg: IQuestionData) => {
        console.log("Not waiting")
        setQuestionNumber(msg.questionNumber);
        setSessionStarted(true);
      }
    
      return (
        <div>
          <WebSocketComponent topics={['/topic/question']} onMessage={(msg: IQuestionData) => onQuestionMessageReceived(msg)} />
          <div className="submit-form">
            {submitted ? (
              <div> {sessionStarted ? (<MainPage user={user} questionNumber={questionNumber}/>) : (<WaitingPage />)}</div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    required
                    value={user.username}
                    onChange={handleInputChange}
                    name="username"
                  />
                </div>
                <button onClick={saveUser} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
    
        </div>
      );
    }
export default StartPage