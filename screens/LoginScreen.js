import React from "react";
import useAuth from "../hooks/useAuth";
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
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();
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
            Welcome back! Glad to see you, Again!
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
          <Text className="text-right">Forgot Password?</Text>
          <View style={{ height: "10%" }}></View>

          <TouchableOpacity onPress={() => signIn(email, password)}>
            <View
              style={{
                backgroundColor: "#FCE353",
                height: 56,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text className="text-2xl font-bold">Login</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-5">
            <View className="bg-gray-300 h-1 flex-1"></View>
            <Text className="mx-2">Or Login with</Text>
            <View className="bg-gray-300 h-1 w-10 flex-1"></View>
          </View>

          <View className="flex-row justify-center mt-6">
            <TouchableOpacity>
              <View className="bg-blue-800 h-16 w-16 rounded-full items-center justify-center m-2">
                <Entypo name="facebook" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <View className="w-5"></View>
            <TouchableOpacity>
              <View className="bg-red-800 h-16 w-16 rounded-full items-center justify-center m-2">
                <Entypo name="google--with-circle" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-6">
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text className="text-yellow-500 ml-2">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
