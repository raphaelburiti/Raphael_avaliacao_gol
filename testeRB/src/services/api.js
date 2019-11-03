import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.metaweather.com/',
})

export default api;
