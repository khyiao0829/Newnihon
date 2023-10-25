import React, { useState } from 'react';
import { StatusBar, Dimensions, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Review({ navigation }) {
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  // 데이터 샘플
  const data = [
    { id: 1, word: '단어', meaning: '뜻' },
    { id: 2, word: '단어2', meaning: '뜻2' },
    // 나머지 데이터 추가
  ];

  // 페이지 네비게이션을 위한 상태
  const itemsPerPage = 1; // 페이지당 항목 수
  const [currentPage, setCurrentPage] = useState(0);

  // 현재 페이지의 데이터를 추출
  const currentData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // 페이지를 변경하는 함수
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Image source={require('./assets/menu.png')} style={styles.menu} />
        </TouchableOpacity>
        <Image source={require('./assets/quizText.png')} style={styles.header} />

        {/* 박스 */}
        <View style={styles.wordBox}>
          <View style={[styles.halfBox, styles.leftHalf]}>
            <Text style={styles.word}>{currentData[0].word}</Text>
          </View>
          <View style={[styles.halfBox, styles.rightHalf]}>
            <Text style={styles.meaning}>{currentData[0].meaning}</Text>
          </View>
        </View>

        <StatusBar style="auto" />

        {/* 페이지 네비게이션 */}
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => changePage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <Text>{currentPage + 1}</Text>
          <TouchableOpacity
            onPress={() => changePage(currentPage + 1)}
            disabled={currentData.length < itemsPerPage}
          >
            <Text>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FCF6F5",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: windowWidth * 0.1,
    paddingTop: windowHeight * 0.09,
  },
  menu: {
    left: windowWidth * 0.009,
    position: 'absolute',
    width: windowWidth * 0.057,
    height: windowHeight * 0.047,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: windowHeight * 0.65,
  },
});
