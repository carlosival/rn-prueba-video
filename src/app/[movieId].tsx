import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, PauseIcon, PlayIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient';
import { startMapper } from 'react-native-reanimated';
import { endEvent } from 'react-native/Libraries/Performance/Systrace';
import Loading from '@/components/Loading';
import { fetchMoviesDetails, image500 } from '../api/moviedb';
import YoutubePlayer from "react-native-youtube-iframe";
import  { IMovie } from '../core/movieType';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3'


export default function MovieDetails() {
  const navigation = useNavigation();
  const router = useRouter()
  const [isFavourite, setisFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { movieId } = useLocalSearchParams<{ movieId: string }>();
  const [movie, setMovie] = useState<IMovie>()
  const [playing, setPlaying] = useState(false);

  useLayoutEffect(() => {

    navigation.setOptions({
      title: `Details: ${movieId}`
    })

  }, []);

  useEffect(() => {
    // call the movie details api
    console.log("movieId: ", movieId)
    setLoading(true);
    getMovieDetails(movieId);
  }, [movieId])

  const getMovieDetails = async movieId => {
    const data = await fetchMoviesDetails(movieId);
    if (data) {
      // add static uri video
      setMovie(data);
    }
    setLoading(false);
  }

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      console.log("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const isyoutubeVideo = (() => movie?.videos?.results?.filter(item => item.site == "YouTube").length > 0)()


  const getYoutubeVideoKey = () => {
    return movie?.videos?.results?.filter(item => item.site == "YouTube")[0].key //'iee2TATGMyI'
  }


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie*/}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row flex-wrap px-4 "}>
          <View className='flex-row flex-wrap justify-between my-8'>
            <TouchableOpacity style={{ backgroundColor: theme.background }} onPress={() => router.back()} className="rounded-xl p-1 ml-4">
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisFavorite(!isFavourite)} className="p-1 mx-4">
              <HeartIcon size="35" color={isFavourite ? theme.background : "white"}></HeartIcon>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {
          loading ? (
            <Loading />
          ) : (
            <View>
              {isyoutubeVideo ? (<YoutubePlayer
                height={height * 0.30}
                play={playing}
                videoId={getYoutubeVideoKey()}
                onChangeState={onStateChange}
              />) : (<Image
                source={{ uri: image500(movie?.poster_path) }}
                style={{ width, height: height * 0.55 }}
              />)}



              {/* movie details*/}
              <View className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider m-4">
                  {movie?.title}
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                  {movie?.status} · {movie?.release_date.split('-')[0]} · {movie?.runtime} min
                </Text>
                <View className='w-full flex-row justify-center'>
                  {isyoutubeVideo && (
                    <TouchableOpacity onPress={togglePlaying}>
                      {playing ? (<PauseIcon size="45" strokeWidth={2.5} color={theme.color}></PauseIcon>) : (<PlayIcon size="45" strokeWidth={2.5} color={theme.color}></PlayIcon>)}
                    </TouchableOpacity>
                  )}
                </View>
                <View className="flex-row justify-center mx-4 space-x-2">
                  {
                    movie?.genres?.map((genre, idx) => {
                      let showDot = idx + 1 != movie?.genres.length;
                      return (
                        <Text key={idx} className='text-neutral-400 font-semibold text-base text-center'>
                          {genre?.name} {showDot && " · "}
                        </Text>

                      )
                    })
                  }
                </View>
                <Text className="text-neutral-400 m-4 tracking-wide text-center">
                  {movie?.overview}
                </Text>
              </View>


            </View>
          )
        }
      </View>
    </ScrollView>
  );
}
