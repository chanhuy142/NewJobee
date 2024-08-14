import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";
const SignUpScreen = () => {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //secure state
  const [secure, setSecure] = useState(true);
  //toggle secure
  const toggleSecure = () => {
    setSecure(!secure);
    console.log("Email: ", email);
  };
  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="px-6 pt-10">
          <Text className="text-5xl">
            You are just one step away from your account!
          </Text>
          <View className="h-1/6"></View>

          <View className="flex flex-row items-center">
            <TextInput
              className="border-2 border-gray-300 text-2xl flex-1  my-2 py-3 px-6 rounded"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View className="flex flex-row items-center">
            <TextInput
              className="border-2 border-gray-300 text-2xl flex-1  py-3 px-6 my-2 rounded"
              placeholder="Password"
              secureTextEntry={secure}
              value={password}
              onChangeText={setPassword}
            />
            {secure ? (
              <Entypo
                name="eye"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20 }}
                onPress={toggleSecure}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20 }}
                onPress={toggleSecure}
              />
            )}
          </View>
          <View className="flex flex-row items-center">
            <TextInput
              className="border-2 border-gray-300 text-2xl flex-1  py-3 px-6 my-2 rounded"
              placeholder="Confirm Password"
              secureTextEntry={secure}
            />
            {secure ? (
              <Entypo
                name="eye"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20 }}
                onPress={toggleSecure}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="black"
                style={{ position: "absolute", right: 20 }}
                onPress={toggleSecure}
              />
            )}
          </View>

          <View style={{ height: "10%" }}></View>

          <TouchableOpacity onPress={() => signUp(email, password)}>
            <View
              style={{
                backgroundColor: "#FCE353",
                height: 56,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text className="text-2xl font-bold">Sign Up</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text className="text-yellow-500 ml-2">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
