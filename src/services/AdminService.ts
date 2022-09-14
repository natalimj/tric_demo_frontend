import http from "../http-common";
import IQuestionData from "../types/Question";
import IResultData from "../types/Result";

const startSession = () => {
  return getQuestionByNumber(1);
};

const endSession = () => {
  return http.post("adminApi/endSession");
};

const showResult = (questionId: any) => {
  return http.get<IResultData>("questionApi/result", {
    params: {
      questionId: questionId
    }
  })
};

const getQuestionByNumber = (questionNumber: number) => {
  return http.get<IQuestionData>("questionApi/question", {
    params: {
      questionNumber: questionNumber
    }
  })
};

const AdminService = {
  startSession,
  endSession,
  showResult,
  getQuestionByNumber
};
export default AdminService;