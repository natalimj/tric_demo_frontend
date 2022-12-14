import React, { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import IResultData from '../types/Result';
import IUserData from '../types/User';



type ResultProps = { user: IUserData; questionId: any };
const Result = ({ user, questionId }: ResultProps) => {
    const initialResultState = {
        questionNumber: 1,
        firstAnswerRate: 0.0,
        secondAnswerRate: 0.0,
        firstAnswerText :"",
        secondAnswerText:""
    };

    const answerId = sessionStorage.getItem("answerId");
    
    const [result, setResult] = useState<IResultData>(initialResultState);

    useEffect(() => {
        getResult(questionId);
    }, []);

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

    return (
        <div>
            <p>Question : {result.questionNumber}</p>
            <p>Your answer : {answerId}</p>
            <p>Answer 1: %{result.firstAnswerRate}</p>
            <p>Answer2: %{result.secondAnswerRate}</p>
        </div>


    )
}

export default Result

