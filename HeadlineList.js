import React from  'react';
import { FlatList } from 'react-native-gesture-handler';
import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function HeadlineList({newsList}){
        const navigation=useNavigation()
    return(
        <View style={{marginRight:5,marginLeft:5}}>
            <FlatList
                data={newsList}
                scrollEnabled={false}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>navigation.navigate('Article',{news:item})} style={{marginTop:15,display:'flex',flexDirection:'row'}}>
                        <Image source={{uri:item.urlToImage}}
                        style={{width:150,height:120,borderRadius:10}}/>
                        <View style={{flex:1}}>
                            <Text numberOfLines={4} style={{fontSize:20,marginLeft:5,fontWeight:'bold'}}>{item.title}</Text>
                            <Text style={{color: '#3480eb', marginLeft:5, marginTop:7}}>{item?.source?.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default HeadlineList