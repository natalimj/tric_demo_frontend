import axios from "axios";
export default axios.create({
  //baseURL: "http://localhost:8080/",
  baseURL: "https://tric-project.azurewebsites.net",
  headers: {
    "Content-type": "application/json"
  }
});