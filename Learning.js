import React, { useState,useEffect } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeadlineList from './HeadlineList';
import GlobalApi from './GlobalApi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Learning({ navigation }) {
  const [newsList,setNewsList] = useState([])
  useEffect(()=>{
    getTopHeadline();
  },[])

  const getTopHeadline=async()=>{
    const result=(await GlobalApi.getTopHeadline).data;
    setNewsList(result.articles)
  }

  const handleBoxClick = (boxNumber) => {
    // 클릭 가능한 박스를 눌렀을 때 수행할 동작 추가
    // 예: navigation.navigate('다음 화면');
    /*navigation.navigate('Article')*/
  };
  const handleMenuPress = () => {
    // 메뉴 아이콘을 눌렀을 때 드로어를 열도록 합니다.
    navigation.openDrawer();
  };

  const handleQuizStart = () => {
    navigation.navigate('WordQuiz');
  };

  const boxes = Array.from({ length: 10 }, (_, index) => (
    <TouchableOpacity key={index} onPress={() => handleBoxClick(index + 1)}>
      <View style={styles.clickableBox}>
        <Text style={styles.boxText}> 기사 {index + 1}</Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
    <TouchableOpacity onPress={handleMenuPress}>
        <Image source={require('./assets/menu.png')} style={styles.menu} />
      </TouchableOpacity>
      <Image source={require('./assets/human.png')} style={styles.human} />
      <TouchableOpacity style={styles.Button} onPress={handleQuizStart}>
        <Text style={styles.ButtonText}>오늘의 단어 퀴즈 GO!</Text>
      </TouchableOpacity>
      <Text style={styles.customText}>학습하고 싶은 기사를 골라보세요!</Text>
      </View>
      <View style={styles.boxContainer}>
          {/*boxes*/}
          <HeadlineList newsList={newsList}/>
        </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // 스크롤 가능한 영역을 확장합니다.
    backgroundColor: "#FCF6F5",
  },
  container: {
    flex: 1,
    marginLeft:1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.1,
    paddingTop: windowHeight * 0.09,
  },
  menu: {
    left: windowWidth*0.0001, // 원하는 좌측 여백으로 조정
    position: 'absolute',
    width: windowWidth * 0.057,
    height: windowHeight * 0.047,
  },
  human: {
    top:windowHeight*0.115, // 원하는 높이로 조정
    right: windowWidth*0.07, // 원하는 우측 여백으로 조정
    position: 'absolute',
    width: windowWidth * 0.33,
    height: windowHeight * 0.2,
  },
  Button: {
    position: 'absolute',
    top:windowHeight*0.213, // 원하는 높이로 조정
    left: windowWidth*0.09, // 원하는 좌측 여백으로 조정
    width: windowWidth*0.47,
    height: windowHeight * 0.06,
    backgroundColor: '#990011',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ButtonText: {
    color: '#ffffff',
    fontSize: windowWidth*0.035,
    fontWeight: 'bold',
  },
  customText: {
    color: '#282828',
    position: 'absolute',
    top:windowHeight*0.269, // 원하는 높이로 조정
    left: windowWidth*0.11,
    fontSize: windowWidth * 0.036,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: windowHeight * 0.02,
    fontWeight: 'bold',
  },
  boxContainer: {
    marginTop: windowHeight * 0.24, // 박스와 customText 사이 간격 조정
    flexDirection: 'column', // 세로로 정렬
    /*alignItems: 'center',*/ // 중앙 정렬
  },
  clickableBox: {
    width: windowWidth * 0.8, // 박스 너비 조정
    height: windowHeight * 0.15, // 박스 높이 조정
    backgroundColor: '#ffffff',
    borderWidth:1,
    borderColor: "#c8c8c8",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowHeight*0.03, // 박스 사이 간격 조정
  },
  boxText: {
    color: '#282828',
    fontWeight: 'bold',
  },
});