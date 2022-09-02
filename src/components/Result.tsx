import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import IResultData from '../types/Result';
import SockJsClient from 'react-stomp';
import Constants from "../Constants";
import IQuestionData from '../types/Question';
import AdminService from '../services/AdminService';

const Result = () => {
    const { id }= useParams();
    let navigate = useNavigate();
    const initialResultState = {
      first: 0.0,
      second: 0.0
    };

    const [result, setResult] = useState<IResultData>(initialResultState);


    useEffect(() => {
      if (id)
        getResult(id);
    }, [id]);
  
    const getResult = (id: string) => {
      AdminService.showResult(id)
        .then((response: any) => {
          setResult(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
  
    };

    let onMessageReceived2 = (msg: IResultData) => {
      setResult(msg);
      console.log("first:"+msg.first);
    }

    let onMessageReceived = (msg:IQuestionData) => {
      //navigate to question page
      navigate("/question/"+msg.id, { replace: true });
    }
    
  return (
    <div>
      <p>Result page for question {id}</p>

<div>
      <p>Question : {id}</p>
      <p>Answer 1: %{result.first}</p>
      <p>Answer2: %{result.second}</p>


    </div>
    <div>
        <SockJsClient
          url={Constants.SOCKET_URL}
          topics={['/topic/start']}
          onConnect={console.log("Connected!")}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg: IQuestionData) => onMessageReceived(msg)}
          debug={false}
        />

      </div>
        <div>
        <SockJsClient
          url={Constants.SOCKET_URL}
          topics={['/topic/result']}
          onConnect={console.log("Connected!")}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg: IResultData) => onMessageReceived2(msg)}
          debug={false}
        />

      </div>


    </div>
    
  )
}

export default Result