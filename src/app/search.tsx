import Loading from "@/components/Loading";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get('window');
export default function SearchScreen() {
  const router = useRouter();
  const [results, setResults] = useState([1,2]);
  const [loading, setLoading] = useState(false);
  
  const movieName = "Txto muy largo de la pelicula: War Zone"
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput 
            placeholder='Search Movie'
            placeholderTextColor={'lightgray'}
            className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={()=> router.navigate('/')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="23" color="white"/>
        </TouchableOpacity>
      </View>
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
              <Text className="text-white font-semibold ml-1"> Results ({results.length})</Text>
              <View className="flex-row justify-between flex-wrap">
                  {
                    results.map((_item,index)=>{
                      return (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={()=>router.push({})}
                          >
                        <View className="space-y-2 mb-4"> 
                        <Image 
                          className="rounded-3xl"
                          source={require('../assets/moviePoster.jpeg')}
                          style={{width: width*0.44,height:height*0.3}}
                        /> 
                        <Text className="text-neutral-300 ml-1">
                          {
                            movieName.length > 22? movieName.slice(0,22)+'...': movieName
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
            <View className="flex-row justify-center">
                  <Text> No result </Text>
            </View>
          ) 
        )
      }
       
    </SafeAreaView>
  );
}

