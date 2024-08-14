import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import Fontisto from "@expo/vector-icons/Fontisto";
import logo from "../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-deck-swiper";
import Entypo from "@expo/vector-icons/Entypo";
import { db } from "../firebaseConfig";
import {
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
const HomeScreen = () => {
  const swipeRef = useRef(null);
  const navigation = useNavigation();
  const { usersignOut, user } = useAuth();
  const [avatar, setAvatar] = useState("");
  const DummyData = [
    {
      id: 1,
      displayName: "John Doe",
      photoURL:
        "https://images.squarespace-cdn.com/content/v1/5bd23b160cf57d87c87873f3/1604423962385-DRILL5WEF2YI5WVTIKI4/eduard+schneider.jpg?format=2500w",
      job: "Software Engineer",
    },
    {
      id: 2,
      displayName: "Jane Doe",
      photoURL:
        "https://images.squarespace-cdn.com/content/v1/5bd23b160cf57d87c87873f3/1563401089029-R25ETEP5CX6VC0BWKJ99/igal+%28%C2%A9+www.danielbaylis.ca%29.jpg?format=2500w",
      job: "Data Scientist",
    },
    {
      id: 3,
      displayName: "John Smith",
      photoURL:
        "https://images.squarespace-cdn.com/content/v1/5bd23b160cf57d87c87873f3/1548582267189-ZU4QAXJDKO688Z2XOXN8/Steph+Green+%C2%A9+www.DanielBaylis.ca-28.jpg?format=1500w",
      job: "Product Manager",
    },
  ];

  const [Profiles, setProfiles] = React.useState([]);
  //console.log(user.email);
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (!doc.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsubscribe;
    const fetchProfiles = async () => {
      const loggedInUser = await (
        await getDoc(doc(db, "users", user.uid))
      ).data();
      setAvatar(loggedInUser.photoURL);
      console.log(avatar);
      const swipedLeft = await getDocs(
        collection(db, "users", user.uid, "swipedLeft")
      ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.id));
      console.log("swipedLeft:", swipedLeft);

      const swipedLeftUsersId = swipedLeft.length > 0 ? swipedLeft : ["none"];

      const swipedRight = await getDocs(
        collection(db, "users", user.uid, "swipedRight")
      ).then((querySnapshot) => querySnapshot.docs.map((doc) => doc.id));
      console.log("swipedRight:", swipedRight);

      const swipedRightUsersId =
        swipedRight.length > 0 ? swipedRight : ["none"];

      unsubscribe = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...swipedLeftUsersId, ...swipedRightUsersId])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
    };
    fetchProfiles();
    return () => {
      unsubscribe();
    };
  }, []);

  const swipeLeft = async (cardindex) => {
    const userSwiped = Profiles[cardindex];
    setDoc(doc(db, "users", user.uid, "swipedLeft", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardindex) => {
    const userSwiped = Profiles[cardindex];
    setDoc(
      doc(db, "users", user.uid, "swipedRight", userSwiped.id),
      userSwiped
    );
    const loggedInUser = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    //check if the user swiped right on the other user
    getDoc(doc(db, "users", userSwiped.id, "swipedRight", user.uid)).then(
      (docsnap) => {
        if (docsnap.exists()) {
          //id=id1+id2 if id1<id2 else id2+id1
          const matchId =
            user.uid < userSwiped.id
              ? user.uid + userSwiped.id
              : userSwiped.id + user.uid;
          console.log("Matched");
          setDoc(doc(db, "matches", matchId), {
            users: {
              [user.uid]: loggedInUser,
              [userSwiped.id]: userSwiped,
            },
            usersId: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          }).then(() => {
            navigation.navigate("Match", { loggedInUser, userSwiped });
          });

          //navigation.navigate("Match", { loggedInUser, userSwiped });
        }
      }
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-between p-5">
        <TouchableOpacity onPress={usersignOut}>
          <Image
            source={{
              uri: avatar ? avatar : "https://via.placeholder.com/150",
            }}
            className="w-10 h-10 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image source={logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Fontisto name="messenger" size={34} color="#FBD708" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        {Profiles.length > 0 ? (
          <Swiper
            disableBottomSwipe={true}
            disableTopSwipe={true}
            ref={swipeRef}
            onSwipedLeft={(cardid) => {
              swipeLeft(cardid);
            }}
            onSwipedRight={(cardid) => {
              swipeRight(cardid);
            }}
            cards={Profiles}
            stackSize={Profiles.length}
            containerStyle={{
              backgroundColor: "transparent",
            }}
            animateCardOpacity
            renderCard={(card) => {
              return (
                <View
                  key={card.id}
                  className="h-3/4  bg-white rounded-xl  flex justify-end"
                  style={style.cardShadow}
                >
                  <Image
                    source={{ uri: card.photoURL }}
                    className="w-full h-full rounded-xl absolute top-0"
                  />
                  <View className="bg-white rounded-b-xl p-2">
                    <Text className="text-2xl font-bold">
                      {card.displayName}
                    </Text>
                    <Text className="text-lg">{card.job}</Text>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold">Loading...</Text>
          </View>
        )}
      </View>
      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          className="w-16 h-16 justify-center items-center rounded-full bg-red-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={34} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-16 h-16 justify-center items-center rounded-full bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <Entypo name="heart" size={34} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default HomeScreen;
