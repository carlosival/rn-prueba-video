import React,{ useEffect, useState }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { ArrowUpOnSquareIcon, Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../theme';
import Loading from '@/components/Loading';
import { useRouter } from 'expo-router';
import { fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'
import MovieList from '@/components/MovieList';

const ios = Platform.OS == 'ios'

export default function HomeScreen() {
  const [trending, setTrending] = useState([]); 
  const [upcoming, setUpcoming] = useState({page:0,results:[]});
  const [loading, setLoading] = useState(true);
  const router = useRouter();  

  useEffect(()=>{
    getTrendingMovies();
  },[])

  useEffect(()=>{
    if(upcoming.page < 1) getUpcomingMovies(1);
  },[])

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    if(data?.results){
        setTrending(data.results)
        setLoading(false)
    }

  }

  const getUpcomingMovies = async (page) => {
    const data = await fetchUpcomingMovies({ page });
    if(data && data.results){
        console.log('entro por aqui')
        setUpcoming({page: data.page, results: data.results})
    }
  }


  const handleNext = async () =>{
    // get Data from api with page++
    // replace upcoming if data exist
    console.log('Next page:', upcoming.page)
    getUpcomingMovies(upcoming.page+1)
    
  }

  const handlePrev = async ()=>{
    // get Data from api with page-- page have to be > 1
    // replace upcoming if data exist
    if(upcoming.page > 1) getUpcomingMovies(upcoming.page-1)
  }

  return (
    <View className = "flex-1 bg-neutral-800"> 
    {/* search bar and logo */} 
        <SafeAreaView className={ios? "-mb-2": "mb-3"}>
            <StatusBar style='light'/>
            <View className="flex-row justify-between items-center mx-4 my-8">
                <Bars3CenterLeftIcon size="30" strokeWidth={3} color="white"/>
                <Text className="text-white text-3xl font-bold">
                    <Text style={styles.text}>M</Text>ovies
                </Text>  
                <TouchableOpacity onPress={()=>router.push('/search')}>
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                </TouchableOpacity>    
            </View>
        </SafeAreaView>
        {
            loading? (
                <Loading />
            ):(
                <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
        >
         {/* Trending movies carousel*/}
         { trending.length >0 && <TrendingMovies data={trending}/>}

         {/* upcoming movies row*/}
          { <MovieList title="Upcoming" data={upcoming} handlePrev={handlePrev} handleNext={handleNext}/>  }
        </ScrollView> 
            )
        }  
    </View>
  );
}
