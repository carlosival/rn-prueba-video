import React,{ useState }  from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../components/TrendingMovies';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../theme';
import Loading from '@/components/Loading';
import { useRouter } from 'expo-router';

const ios = Platform.OS == 'ios'

export default function HomeScreen() {
  const [trending, setTrending] = useState([1,2,3]); 
  const [upcomming, setUpcomming] = useState([1,2,3]);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();  

  return (
    <View className = "flex-1 bg-neutral-800"> 
    {/* search bar and logo */} 
        <SafeAreaView className={ios? "-mb-2": "mb-3"}>
            <StatusBar style='light'/>
            <View className="flex-row justify-between items-center mx-4">
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
         <TrendingMovies data={trending}/>

         {/* upcoming movies row*/}
         <TrendingMovies data={trending}/>
        </ScrollView> 
            )
        }  
    </View>
  );
}
