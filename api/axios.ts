import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:4000/v1', // trocar para localhost ou variável de ambiente
});
