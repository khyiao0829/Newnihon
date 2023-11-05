import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions ,Image } from 'react-native';
import quizData from './quiz/quiz';
import answers from './WordQuiz'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// calculateScore 함수를 컴포넌트 외부로 이동
const calculateScore = (selectedAnswers, correctAnswers) => {
  let score = 0;
  for (let i = 0; i < correctAnswers.length; i++) {
    if (selectedAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }
  return score;
};
const handleHomePress = () => {
  // 홈화면 
  navigation.navigate('Learning');
};
const ScorePage = ({ route }) => {
  const { selectedAnswers, correctAnswers } = route.params;

  // 이제 calculateScore 함수를 사용하여 점수 계산
  const score = calculateScore(selectedAnswers, correctAnswers);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.scoreText}>Score: {score} / {quizData.length}</Text>
      <TouchableOpacity onPress={handleHomePress}>
      <Image source={require('./assets/smile.png')} style={styles.smile} />
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
              <Text style={answers[questionIndex] === optionIndex ? styles.selectedAnswer : null}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.correctAnswer}>
            정답: {question.options[question.correctAnswer]}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'left',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    top: windowHeight * 0.06,
  },
  smile: {
    right: windowWidth * 0.07,
    top: windowHeight * 0.06,
    width: windowWidth * 0.057,
    height: windowHeight * 0.047,
    zIndex: 1,
  },
  resultText: {
    fontSize: 18,
    marginTop: 10,
  },
  questionContainer: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  answersContainer: {
    marginTop: 10,
  },
  answerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  answerNumber: {
    marginRight: 5,
  },
  selectedAnswer: {
    color: 'pink', // 선택한 답 텍스트 색상
    fontWeight: 'bold', // 선택한 답 글꼴 굵기 (선택 사항)
  },
  correctAnswer: {
    color: 'green', // 정답 텍스트 색상
    fontWeight: 'bold', // 정답 글꼴 굵기 (선택 사항)
  },
});

export default ScorePage;
