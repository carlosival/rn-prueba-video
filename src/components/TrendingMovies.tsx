import { View, Text, Dimensions, TouchableWithoutFeedback, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useRouter } from 'expo-router';

var {width, height} = Dimensions.get('window')
export default function TrendingMovies({data}) {


  const navigation = useNavigation();
  const router = useRouter();
  const handleClick = ()=>{
       router.push({pathname:'[movieId]',params: { movieId: 1337 }})
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-a mb-5">Trending</Text>
      <Carousel 
      data={data}
      renderItem={({item})=> <MovieCard item={item} handleClick={handleClick}/>}
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
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require('../assets/moviePoster.jpeg')}
       style={{
            width: width*0.6,
            height: height*0.4
       }}
       className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  )
}