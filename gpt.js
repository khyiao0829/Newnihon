//import Constants from 'expo-constants';
import { API_KEY } from '@env';

//const apiKey = Constants.expoConfig.API_KEY;
//const isDebug = Constants.expoConfig.DEBUG;


export const CallGPT = async () =>{
  /*curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "Say this is a test!"}],
     "temperature": 0.7
   }' */
   const response = await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Say this is a test!"}],
        temperature: 0.7,
        max_tokens: 1_0
      })
   });
   const responseData = await response.json();
   console.log(">>responseData", responseData);
   return responseData;
};

/*import axios from 'axios';

const generateQuiz = async (newsContent) => {
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  try {
    const response = await axios.post(apiUrl, {
      prompt: `Create a quiz based on the following article: ${newsContent}`,
      max_tokens: 150,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const quizQuestions = response.data.choices[0].text;
    return quizQuestions;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return 'Failed to generate quiz';
  }
};*/


// Firebase에서 가져온 뉴스 기사 내용을 사용하여 퀴즈를 생성하는 함수
/*const generateQuiz = async (newsContent) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates a quiz based on the following article:',
        },
        {
          role: 'user',
          content: newsContent,
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
    });

    const generatedQuiz = response.data.choices[0].message.content;
    return generatedQuiz;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return 'Failed to generate quiz';
  }
};*/

