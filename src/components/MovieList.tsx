import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { image185 } from '../api/moviedb'
import { theme } from '@/theme'
const {width, height} = Dimensions.get('window')
export default function MovieList({title, data, handleNext, handlePrev }) {

   const router = useRouter();
   
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-1 justify-between">
        <View className='flex-row justify-between'>
          <Text className='text-white text-2xl mx-1 mb-5 '>{title}</Text>
          <View className='flex-row flex-wrap   mb-5'>
          <TouchableOpacity onPress={()=>handlePrev()} style={{backgroundColor:theme.background}} className='px-2 py-1 rounded-2xl mx-4'><Text className='text-white text-2xl font-medium'> Prev </Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>handleNext()} style={{backgroundColor:theme.background}} className='px-2 py-1 rounded-2xl'><Text className=' text-white text-2xl font-medium'> Next </Text></TouchableOpacity>
          </View>
        </View>
      {/* movie row */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.results.map((item, index)=>{
                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> router.push({pathname:'[movieId]',params: { movieId: item.id }})}
                    >
                      <View>
                        <Image
                          source={{uri: image185(item.poster_path)}}
                          className="rounded-3xl mx-2"
                          style={{width: width*0.33, height: height*0.22}}
                        />

                        <Text className='text-neutral-300 ml-1'>
                            { 
                              item.title.length>14? item.title.slice(0,14)+'...': item.title 
                            }
                        </Text>
                      </View>        
                    </TouchableWithoutFeedback>
                )
            })
        }
      </ScrollView>
      </View>
    </View>
  )
}