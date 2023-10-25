import { create } from "apisauce";

const api = create({
    baseURL: 'https://newsapi.org/v2',
    
  })
  const apiKey = '?country=jp&pageSize=100&apiKey=d105e09d8c7a486cb0b31851b68c119e'

  const getTopHeadline=api.get('/top-headlines'+apiKey)

  export default{
    getTopHeadline
  }
  // /top-headlines?country=us&apiKey=d105e09d8c7a486cb0b31851b68c119