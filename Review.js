import React from 'react';
import { StatusBar, Dimensions, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Review({ navigation }) {
  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Image source={require('./assets/menu.png')} style={styles.menu} />
        </TouchableOpacity>
        <Image source={require('./assets/reviewText.png')} style={styles.header} />
        <TouchableOpacity style={styles.Button}>
          <Text style={styles.ButtonText}>단어 퀴즈</Text>
        </TouchableOpacity>
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
  Button: {
    position: 'absolute',
    top: windowHeight * 0.2,
    right: windowWidth * 0.09,
    width: windowWidth * 0.19,
    height: windowHeight * 0.04,
    backgroundColor: '#ffec99',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ButtonText: {
    color: '#282828',
    fontSize: windowWidth * 0.035,
    fontWeight: 'bold',
  },
  header: {
    width: windowWidth * 0.23,
    height: windowHeight * 0.06,
    position: 'absolute',
    top: windowHeight * 0.085,
    left: windowWidth * 0.41,
  },

  
});