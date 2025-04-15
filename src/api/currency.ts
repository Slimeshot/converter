import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_CURRENCY_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    apikey: import.meta.env.VITE_API_CURRENCY_KEY
  },

});