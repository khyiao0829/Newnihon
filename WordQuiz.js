import React from 'react';
import { StatusBar, Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Review({ navigation }) {
  const handleMenuPress = () => {
    navigation.openDrawer();
  };
  function handleBackPress() {
    navigation.goBack(); // 뒤로 가기
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Image source={require('./assets/menu.png')} style={styles.menu} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image source={require('./assets/back.png')} style={styles.back} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={require('./assets/TWQ.png')} style={styles.header} />
        <StatusBar style="auto" />
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
  backButton: {
    position: 'absolute',
    right: windowWidth * 0.07,
    top: windowHeight * 0.093,
  },
  back: {
    width: windowWidth*0.09,
    height: windowHeight*0.05,
  },
  header: {
    width: windowWidth*0.5,
    height: windowHeight*0.06,
    position: 'absolute',
    top: windowHeight * 0.088,
    left: windowWidth * 0.27,
  },

  
});