import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const params = useRoute();
  const { loggedInUser, userSwiped } = params.params;
  return (
    <View
      className="
    h-full flex justify-center items-center bg-yellow-200 opacity-80
    "
    >
      <View className=" p-5 rounded-lg flex h-4/5 justify-evenly items-center w-full">
        <Text className="text-2xl font-bold">
          You have matched with {userSwiped.displayName}
        </Text>
        <Image
          source={{ uri: userSwiped.photoURL }}
          className="w-40 h-40 rounded-full"
        />
        <View className="flex items-center gap-2 w-full">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              navigation.navigate("Chat", { user: userSwiped });
            }}
            className="bg-yellow-400 p-3 rounded-lg w-full h-14 items-center justify-center"
          >
            <Text className="text-white text-xl font-bold">Chat now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MatchedScreen;
