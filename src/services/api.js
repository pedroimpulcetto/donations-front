import axios from "axios";

const api = axios.create({
  baseURL: "https://pi-donations.herokuapp.com",
});

export default api;