import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/database';

const NewsScreen = () => {
  useEffect(() => {
    // Firebase 초기화
    const firebaseConfig = {
      apiKey: "AIzaSyBqhrY74o24qC3Z3CGbvKXcyNUVDe_Oo_4",
      authDomain: "newnihon-f89dd.firebaseapp.com",
      databaseURL: "https://newnihon-f89dd-default-rtdb.firebaseio.com",
      projectId: "newnihon-f89dd",
      storageBucket: "newnihon-f89dd.appspot.com",
      messagingSenderId: "739277304129",
      appId: "1:739277304129:web:5f8673c0c1d217e7a0b1c0",
      measurementId: "G-H8J92C6756"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // 뉴스 API 엔드포인트
    const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=US&apiKey=YOUR_API_KEY';

    // 뉴스 데이터 가져오기
    axios.get(newsApiUrl)
      .then((response) => {
        // Firebase Realtime Database에 데이터 저장
        const newsData = response.data.articles;
        const database = firebase.database();
        const newsRef = database.ref('news');

        newsData.forEach((newsItem, index) => {
          // Firebase에 뉴스 데이터 저장
          newsRef.push().set({
            title: newsItem.title,
            date: newsItem.publishedAt,
            content: newsItem.content,
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
      });
  }, []);

  return (
    <View>
      <Text>뉴스를 Firebase에 저장 중...</Text>
    </View>
  );
};

export default NewsScreen;


/*import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.asahi.com/articles/ASRBS4G6HRBSUTIL002.html?iref=comtop_7_05';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Article({navigation}){
        //const [articleTitle, setArticleTitle] = useState('');
        //const [articleText, setArticleText] = useState('');
        const [newsData, setNewsData] = useState([]);
        const [topNews, setTopNews] = useState([]);

        useEffect(() => {
          axios.get('http://192.168.1.164::8080/getTopNews')
          .then((response) => {
          setTopNews(response.data.topNews);
        })
          .catch((error) => {
          console.error('데이터 가져오기 오류:', error);
        });
}, []);
          
        const handleMenuPress = () => {
            // 메뉴 아이콘을 눌렀을 때 드로어를 열도록 합니다.
            navigation.openDrawer();
          };
        function handleBackPress() {
            navigation.goBack(); // 뒤로 가기
          }
          const [imageUri, setImageUri] = useState('');

          useEffect(() => {
           // 비동기 작업을 통해 이미지 URI를 가져옴
          const fetchImageUri = async () => {
          const uri = await fetchImageUriFromServer(); // 이미지 URI 가져오는 비동기 함수
          setImageUri(uri);
        };

        fetchImageUri();
  }, []);

    return(
        <View style={{backgroundColor:'#FCF6F5',flex:1,scrollContainer:1}}>
          <View>
      <Text>News Articles</Text>
      <ScrollView>
        {newsData.map((article, index) => (
          <View key={index}>
            <Text>{article.title}</Text>
            <Text>{article.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    </View>
  );
}

export default Article


const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1, // 스크롤 가능한 영역을 확장합니다.
      backgroundColor: "#FCF6F5",
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
    }

});*/