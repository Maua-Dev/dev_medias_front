import axios from "axios";

export const http = axios.create({
    baseURL: 'https://10rp5zrm1j.execute-api.sa-east-1.amazonaws.com/prod/mss-medias',
    // baseURL: process.env.API_URL,
});