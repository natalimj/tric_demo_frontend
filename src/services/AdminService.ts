import http from "../http-common";
import IQuestionData from "../types/Question";
import IResultData from "../types/Result";

  const startSession = () => {
    return http.post("questionApi/start");
  };

  const endSession = () => {
    return http.post("api/end");
  };

  const showNextQuestion = (id :number) => {
    return http.get<IQuestionData>(`questionApi/next/${id}`);
  };

  const getQuestionById = (id :any) => {
    return http.get<IQuestionData>(`questionApi/questions/${id}`);
  };

  const showResult = (id :any) => {
    return http.get<IResultData>(`questionApi/results/${id}`);
  }; 


  const AdminService = {
    startSession,
    endSession,
    showNextQuestion,
    getQuestionById,
    showResult
  };
  export default AdminService;