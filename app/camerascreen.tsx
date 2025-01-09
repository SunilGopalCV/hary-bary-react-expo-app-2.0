import React from "react";
import { View, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../contexts/AppContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

import { images } from "../constants";

export default function CameraScreen() {
  const { setImageUri, setResult } = useAppContext();
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setResult(null); // Reset previous predictions
      router.push("/report");
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setResult(null); // Reset previous predictions
      router.push("/report");
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Text className="text-white font-pbold text-center text-2xl">
            Upload an Image
          </Text>

          <Image
            source={images.group_cards}
            className="max-w-[380px] w-full h-[298px] my-16"
            resizeMode="contain"
          />

          <View className="flex flex-row items-center justify-center gap-6">
            <TouchableOpacity
              onPress={captureImage}
              className="bg-black-100 rounded-xl min-h-[200px] min-w-[170px] flex justify-center items-center border-dashed border-2 border-gray-200 gap-3"
            >
              <FontAwesome name="camera" size={54} color="#d9d9db" />
              <Text className="text-white max-w-[120px] text-center font-pregular text-lg">
                ಕ್ಯಾಮೆರಾ ಆನ್
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              className="bg-black-100 rounded-xl min-h-[200px] min-w-[170px] flex justify-center items-center border-dashed border-2 border-gray-200 gap-3"
            >
              <Entypo name="folder-images" size={54} color="#d9d9db" />
              <Text className="text-white max-w-[120px] text-center  font-pregular text-lg">
                ಗ್ಯಾಲರಿ ಅಪ್ಲೋಡ್
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-white font-pregular text-sm mt-10">
            ಜೆಎಸ್‌ಎಸ್‌ಎಟಿಇ ಬೆಂಗಳೂರು ಪ್ರಾಯೋಜಿತ
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
