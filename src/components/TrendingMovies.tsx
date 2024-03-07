import { View, Text, Dimensions, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useRouter } from 'expo-router';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window')
export default function TrendingMovies({data}) {

  const router = useRouter();
  const handleClick = (item :{id:number})=>router.push({pathname:'[movieId]',params: { movieId: item.id }})
  

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-a mb-5">Trending</Text>
      <Carousel 
      data={data}
      renderItem={({item})=> { 
        console.log('Item passing to move card',item) 
       return <MovieCard item={item} handleClick={handleClick}/>
    
    }}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display: 'flex', alignItems:'center'}}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
      <Image
       source={{uri: image500(item.poster_path)}}
       style={{
            width: width*0.6,
            height: height*0.4
       }}
       className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  )
}