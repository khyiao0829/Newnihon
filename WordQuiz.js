import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Text, Button, Image } from 'react-native'; 
import { CallGPT } from "./gpt";
import quizData from './quiz/quiz';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function WordQuiz({ navigation }) {
  const [answers, setAnswers] = useState(new Array(quizData.length).fill(null));
  const [score, setScore] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizData.length).fill(null));


  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);

    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleQuizSubmit = () => {
    // 선택한 답안과 정답을 채점 화면으로 전달
    navigation.navigate('Score', {
      selectedAnswers: selectedAnswers,
      correctAnswers: quizData.map((question) => question.correctAnswer),
    });
  };
  
  const handleMenuPress = () => {
    // 메뉴 아이콘을 눌렀을 때 드로어
    navigation.openDrawer();
  };
  const handleBackPress = () => {
    // 홈화면 
    navigation.navigate('Learning');
  };

  return (
      <ScrollView> 
      <TouchableOpacity onPress={handleMenuPress}>
        <Image source={require('./assets/menu.png')} style={styles.menu} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackPress}>
      <Image source={require('./assets/back.png')} style={styles.back} />
      </TouchableOpacity>
      {quizData.map((question, questionIndex) => (
         <View key={questionIndex} style={styles.container}>
         <Text>{question.question}</Text>
         {question.options.map((option, optionIndex) => (
           <TouchableOpacity
             key={optionIndex}
             onPress={() => handleAnswerSelect(questionIndex, optionIndex)}
             style={{
               backgroundColor:
                 answers[questionIndex] === optionIndex ? 'pink' : 'white',
             }}
           >
             <Text>{option}</Text>
           </TouchableOpacity>
         ))}
       </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleQuizSubmit}>
      <Text style={styles.submitText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  function calculateScore(answers) {
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (answers[i] === quizData[i].correctAnswer) {
        score++;
      }
    }
    return score;
  }
}
  export default WordQuiz;

/*function WordQuiz() {
  const [data, setData] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleClickAPI = async () => {
    try{
      setIsLoading(true);
      const message = await CallGPT();
      setData(message);
    } catch (error){
    } finally{
      setIsLoading(false);
    }
  }
  
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleClickAPI}>
      <Text>data: {data.choices[0].message.content}</Text>
      <Text>isLoading: {isLoading.model}</Text>
    </TouchableOpacity>
  </View>
  );
}*/
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FCF6F5",
  },
  container: {
    flex: 1,
    //justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.1,
    paddingTop: windowHeight * 0.1,
    top: windowHeight * 0.07,
  },
  menu: {
    left: windowWidth * 0.04,
    top: windowHeight * 0.06,
    position: 'absolute',
    width: windowWidth * 0.08,
    height: windowHeight * 0.047,
    zIndex: 1,
  },
  header: {
    width: windowWidth * 0.32,
    height: windowHeight * 0.06,
    position: 'absolute',
    top: windowHeight * 0.086,
    left: windowWidth * 0.36,
  },
  wordBox: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.11,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfBox: {
    flex: 1,
    height: windowHeight * 0.08,
    borderRadius: 8,
  },
  leftHalf: {
    backgroundColor: '#990011',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightHalf: {
    backgroundColor: '#ffffff',
    padding: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  meaning: {
    fontSize: windowWidth * 0.04,
    color: '#282828',
    textAlign: 'center',
  }, 
  back: {
    right: windowWidth * 0.07,
    top: windowHeight * 0.06,
    position: 'absolute',
    width: windowWidth * 0.057,
    height: windowHeight * 0.047,
    zIndex: 1,
  },
  submitButton: {
    backgroundColor: 'pink', // 원하는 버튼 배경색 설정
    borderRadius: 80, // 버튼을 라운드로 만들기 위한 값
    padding: 20, // 내부 패딩 설정
    alignSelf: 'center', // 가운데 정렬
    top: windowHeight * 0.08,
  },
  submitText: {
    fontSize: 18,
    color: 'black', // 텍스트 색상 설정
  },
  /*scrollViewContent: {
    padding: 10, // 내용 주위의 여백 설정
    backgroundColor: "#FCF6F5",
    paddingBottom: 200,
  },*/
});




/*import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, CheckBox, Button } from 'react-native';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/database';

// Firebase 및 ChatGPT 설정 (상단의 예시 코드 참고)

const QuizApp = () => {
  const [newsData, setNewsData] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(new Array(10).fill(null)); // 10개의 문제에 대한 사용자 답안
  const [score, setScore] = useState(0); // 사용자 점수

  useEffect(() => {
    // Firebase를 통해 뉴스 데이터 가져오기
    const newsRef = firebase.database().ref('news');
    newsRef.once('value').then((snapshot) => {
      const newsData = snapshot.val();
      setNewsData(newsData);

      // ChatGPT를 사용하여 퀴즈 생성
      generateQuiz(newsData.content)
        .then((quizQuestions) => {
          setQuizQuestions(quizQuestions);
        })
        .catch((error) => {
          console.error('퀴즈 생성 오류:', error);
        });
    });
  }, []);

  const handleAnswerClick = (questionIndex, optionIndex) => {
    // 사용자의 선택을 추적하여 userAnswers 배열에 기록
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    // 정답과 사용자 답안을 비교하고 점수를 계산
    let userScore = 0;
    for (let i = 0; i < 10; i++) {
      if (userAnswers[i] === quizQuestions[i].correctAnswer) {
        userScore++;
      }
    }
    setScore(userScore);
  };

  return (
    <ScrollView>
      {quizQuestions.map((question, index) => (
        <View key={index}>
          <Text>{question.title}</Text>
          {question.options.map((option, optionIndex) => (
            <View key={optionIndex}>
              <CheckBox
                value={userAnswers[index] === optionIndex}
                onValueChange={() => handleAnswerClick(index, optionIndex)}
              />
              <Text>{option}</Text>
            </View>
          ))}
        </View>
      ))}
      <Button title="Submit" onPress={calculateScore} />
      {score > 0 && <Text>Your Score: {score}</Text>}
    </ScrollView>
  );
};


export default QuizApp;*/






/*import React, { useState } from 'react';
import { View, TextInput,  StyleSheet, Dimensions, Button, Text } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function WordQuiz() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://192.168.1.164:8080/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message})
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Enter your message"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.responseText}>{response}</Text>
    </View>
  );
  }
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1, // 스크롤 가능한 영역을 확장합니다.
      backgroundColor: "#FCF6F5",
    },
    input:{
      marginTop: 200
    },
    menu: {
        marginTop: 74,
      left: windowWidth*0.05, // 원하는 좌측 여백으로 조정
      position: 'absolute',
      width: windowWidth * 0.08,
      height: windowHeight * 0.047,
    },
    back:{
        marginTop: 60,
      left: windowWidth*0.85, // 원하는 좌측 여백으로 조정
      position: 'absolute',
      width: windowWidth * 0.085,
      height: windowHeight * 0.085,
    },
    contents:{
        marginTop:10,
        marginLeft: 20, 
        marginRight: 20, 
        fontSize:16, 
        lineHeight:30,
    },
  });
  

export default WordQuiz*/