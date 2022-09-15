import axios from "axios";
export default axios.create({
  //baseURL: "http://localhost:8080/",
  baseURL: "https://tricproject.azurewebsites.net/",
  headers: {
    "Content-type": "application/json"
  }
});