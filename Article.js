import { useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import {Cheerio } from 'cheerio'
import *as WebBrowser from 'expo-web-browser';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Article({navigation}){
        const news=useRoute().params.news;

        useEffect(()=>{
            console.log(news)
        },[])


        /*const [article, setArticle] = useState('');
        useEffect(() => {
            async function crawlNewsArticle(Aurl) {
            try {
              const response = await axios.get(Aurl);
              const html = response.data;
              console.log(html);
              const $ = Cheerio.load(html);
          
              // 여기서 뉴스 기사 본문을 선택
              const articleBody = $('div.body-text'); // 예시: 본문이 들어있는 요소 선택
          
              // 선택한 요소에서 텍스트 추출
              const articleText = articleBody.text();
          
              setArticle(articleText);
            } catch (error) {
              console.error('크롤링 오류:', error);
            }
          }
          crawlNewsArticle(newsUrl);
        }, [newsUrl]);*/
          
        const handleMenuPress = () => {
            // 메뉴 아이콘을 눌렀을 때 드로어를 열도록 합니다.
            navigation.openDrawer();
          };
        function handleBackPress() {
            navigation.goBack(); // 뒤로 가기
          }

    return(
        <View style={{backgroundColor:'#FCF6F5',flex:1}}>
            <View>
                <TouchableOpacity onPress={handleMenuPress}>
                    <Image source={require('./assets/menu.png')} style={styles.menu} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                    <Image source={require('./assets/back.png')} style={styles.back} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <Text  style={{marginTop:170,marginLeft: 20, marginRight: 20, fontSize:23, fontWeight:'bold'}}>{news.title}</Text>
            <Text style={styles.contents}>{news.url}</Text>
            <Text style={styles.contents}>{news.description}</Text>
        </View>
    )
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

});