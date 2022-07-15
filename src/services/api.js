import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:44308/",
})

export default api;

