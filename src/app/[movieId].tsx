import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, PlayIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient';
import { startMapper } from 'react-native-reanimated';
import { endEvent } from 'react-native/Libraries/Performance/Systrace';
import Loading from '@/components/Loading';



const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3'

export default function MovieDetails() {
  const navigation = useNavigation();
  const router = useRouter()
  const [isFavourite, setisFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieId } = useLocalSearchParams<{ movieId: string }>();

  useLayoutEffect(() => {

    navigation.setOptions({
      title: `Details: ${movieId}`
    })

  }, []);

  useEffect(() => {
    // call the movie details api

  }, [movieId])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie*/}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
          <TouchableOpacity onPress={() => router.back()} className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setisFavorite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? theme.background : "white"}></HeartIcon>
          </TouchableOpacity>
        </SafeAreaView>
        {
          loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={require('../assets/moviePoster.jpeg')}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{ width, height: height * 0.40 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
              {/* movie details*/}
              <View className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                  Movie Name Lorem Ipsum un textp mas grande
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                  Release · 2020 · 170 min
                </Text>
                <View className='w-full flex-row justify-center'>
                  {/* Progress bar */}
                  <TouchableOpacity>
                    <PlayIcon strokeWidth={2.5} color="white"></PlayIcon>
                  </TouchableOpacity>
                </View>
                <View className=" flex-row justify-center mx-4 space-x-2">
                  <Text className='text-neutral-400 font-semibold text-base text-center'> Action ·</Text>
                  <Text className='text-neutral-400 font-semibold text-base text-center'> Action ·</Text>
                  <Text className='text-neutral-400 font-semibold text-base text-center'> Action ·</Text>
                </View>
                <Text className="text-neutral-400 mx-4 tracking-wide">
                  Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien
                </Text>
              </View>


            </View>
          )
        }
      </View>
    </ScrollView>
  );
}
