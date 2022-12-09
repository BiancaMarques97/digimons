import axios from "axios"; 

export const digimon = axios.create({
  baseURL: "https://digimon-api.vercel.app/api",
  timeout: 5000,
});

