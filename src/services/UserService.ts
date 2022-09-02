import http from "../http-common";
import IUserData from "../types/User";
import IVoteData from "../types/Vote";

const getAllUsers = () => {
    return http.get<Array<IUserData>>("api/users");
  };
  const createUser = (data: IUserData) => {
    return http.post<IUserData>("api/users", data);
  };

  const saveVote = (data: IVoteData) => {
    return http.post<IVoteData>("api/vote", data); 
  };
  const UserService = {
    getAllUsers,
    createUser,
    saveVote
  };
  export default UserService;