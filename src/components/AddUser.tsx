import React, { useState, ChangeEvent } from "react";
import UserService from "../services/UserService";
import IUserData from '../types/User';
import { useNavigate } from "react-router-dom";
import IQuestionData from '../types/Question';
import WaitingPage from "./WaitingPage";
import WebSocketComponent from "./WebSocketComponent";


const AddUser  = () => {
  let navigate = useNavigate();

  const initialUserState = {
    id: null,
    username: ""
  };

  const [user, setUser] = useState<IUserData>(initialUserState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      username: user.username,
    };

    UserService.createUser(data)
      .then((response: any) => {
        setSubmitted(true);  // hide inputfield and button - show user list
        console.log( response.data.id);
        sessionStorage.setItem("userid", response.data.id);
      })
      .catch((e: Error) => {
        console.log(e);
      });
      
  };

  let onMessageReceived = (msg:IQuestionData) => {
    //navigate to question page
    navigate("/question/"+msg.id, { replace: true });
  }


  return (
    <div>
     <WebSocketComponent topics={['/topic/start']} onMessage= {(msg: IQuestionData) => onMessageReceived(msg)}/>
      <div className="submit-form">
        {submitted ? (
          <WaitingPage/>
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
};
export default AddUser;