import Loading from "@/components/Loading";
import { Link, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Dimensions, Platform, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MagnifyingGlassCircleIcon, XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import { searchMovies, image185 } from '../api/moviedb';

const ios = Platform.OS == 'ios';

const { width, height } = Dimensions.get('window');
export default function SearchScreen() {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = value =>{
    console.log('value: ',value);
    if(value && value.length>2){
      setLoading(true);
      searchMovies({
        query: value,
        include_adults: 'false',
        language: 'en-US', 
        page: '1'
      }).then(data=>{
        setLoading(false);
        if(data && data.results){
          setResults(data.results);
        }
      })
    }else{
      setLoading(false);
      setResults([])
    }
  } 

  const handleTextDebounce = useCallback(debounce(handleSearch,400), [])

  return (
    <View className="bg-neutral-800 flex-1 ">
    <SafeAreaView className={ios? "-mb-2": "mb-3"}>
      <View className=" mx-4 mb-3 my-8 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput 
            onChangeText={handleTextDebounce}
            placeholder='Search Movie'
            placeholderTextColor={'lightgray'}
            className=" pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={()=> router.navigate('/')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="23" color="white"/>
        </TouchableOpacity>
      </View>
      </SafeAreaView> 
      {/* results*/}
      {
        loading?(
          <Loading/>
        ):(
          results.length>0? (
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            className="space-y-3">
              <Text className="text-white font-semibold  ml-1 my-4"> Results ({results.length})</Text>
              <View className="flex-row justify-between flex-wrap">
                  {
                    results.map((item,index)=>{
                      return (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={()=>router.push({pathname:'[movieId]',params: { movieId: item.id }})}
                          >
                        <View className="space-y-2 mb-4"> 
                        <Image 
                          className="rounded-3xl"
                          source={{uri: image185(item?.poster_path)}}
                          style={{width: width*0.44,height:height*0.3}}
                        /> 
                        <Text className="text-neutral-300 ml-1">
                          {
                            item?.title.length > 22? item?.title.slice(0,22)+'...': item?.title
                          }  
                        </Text>
                        </View>   
                        </TouchableWithoutFeedback>
                      )
                    })
                  }
              </View>
          </ScrollView>
          ):(
            <View className="flex-1 justify-center items-center">
                  {/* <MagnifyingGlassCircleIcon size="128" color="white"/> */}  
            </View>
          ) 
        )
      }
       
    
    </View>
  );
}

