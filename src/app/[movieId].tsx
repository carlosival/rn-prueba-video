import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MovieDetails() {
  const navigation = useNavigation();
  const { movieId } = useLocalSearchParams<{movieId: string}>();

  useLayoutEffect(()=>{

    navigation.setOptions({
      title: `Details: ${movieId}`
    })

  },[]);
  
  return (
    <View className="flex flex-1">
      <Text> Deatils: {movieId}</Text>
    </View>
  );
}
