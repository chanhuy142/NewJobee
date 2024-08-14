import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, addDoc, setDoc } from "firebase/firestore";
import logowitext from "../assets/logowitext.png";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import BouncyCheckboxGroup, {
  CheckboxButton,
} from "react-native-bouncy-checkbox-group";
const _iconStyle = (borderColor) => ({
  height: 50,
  width: 50,
  borderRadius: 25,
  borderColor: borderColor,
});

const styles = {
  container: { marginTop: 24 },
  verticalStyle: { marginTop: 16 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 20, width: 20 },
};
const ModalScreen = () => {
  const verticalStaticData = [
    {
      id: 0,
      text: "Candidate",
      fillColor: "#ff7473",
      unFillColor: "#fbbfbb",
      iconStyle: _iconStyle("#fbbfbb"),
      textStyle: styles.textStyle,
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
    {
      id: 1,
      text: "HR",
      fillColor: "#5567e9",
      unFillColor: "#afb5f5",
      iconStyle: _iconStyle("#afb5f5"),
      textStyle: styles.textStyle,
      style: styles.verticalStyle,
      iconImageStyle: styles.iconImageStyle,
    },
  ];

  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");
  const [job, setJob] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [selectedCheckbox, setSelectedCheckbox] = useState(0);
  const { user } = useAuth();
  const updateUserProfile = async () => {
    setDoc(
      doc(db, "users", user.uid),
      {
        id: user.uid,
        displayName: displayName,
        job: job,
        photoURL: photoURL,
        role: selectedCheckbox,
      },
      { merge: true }
    ).then(() => {
      navigation.navigate("Home");
    });
  };
  return (
    <View className="flex p-5 justify-between w-full h-full">
      <View className="flex  items-center gap-2">
        <View className="flex items-center">
          <Image source={logowitext} />
        </View>
        <View>
          <Text className=" text-2xl text-yellow-500 text-center ">
            Display name
          </Text>
          <TextInput
            className="p-4  w-full rounded-md"
            placeholder="Enter your display name"
            textAlign={"center"}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
          />
        </View>

        <View>
          <Text className=" text-2xl text-yellow-500 text-center ">Job</Text>
          <TextInput
            className="p-4  w-full rounded-md"
            placeholder="Enter your job"
            textAlign={"center"}
            value={job}
            onChangeText={(text) => setJob(text)}
          />
        </View>
        <View>
          <Text className=" text-2xl text-yellow-500 text-center ">
            Photo URL
          </Text>
          <TextInput
            className="p-4  w-full rounded-md"
            placeholder="Enter your photo URL"
            textAlign={"center"}
            value={photoURL}
            onChangeText={(text) => setPhotoURL(text)}
          />
        </View>
        <View>
          <Text className=" text-2xl text-yellow-500 text-center ">
            You're candidate or HR of a company?
          </Text>
          <BouncyCheckboxGroup
            data={verticalStaticData}
            style={{ flexDirection: "columm", justifyContent: "space-between" }}
            onChange={(selectedItem) => {
              console.log("SelectedItem: ", JSON.stringify(selectedItem));
              setSelectedCheckbox(selectedItem.id + 1);
            }}
          />
        </View>
      </View>
      <TouchableOpacity className="m-2" onPress={updateUserProfile}>
        <View
          style={{
            backgroundColor: "#FCE353",
            height: 56,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
        >
          <Text className="text-2xl font-bold">Confirm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
