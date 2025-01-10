import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex flex-row gap-4 items-center">
            <Image
              source={images.logo}
              className="w-[80px] h-[80px]"
              resizeMode="contain"
            />
            <View className="flex flex-col items-center">
              <Text className="font-pbold text-white text-3xl">
                {"JAGRUTHI "}{" "}
              </Text>
              <Text className="text-white font-pregular text-sm">
                ಜಾನುವಾರು ಗುರುತಿಸಿ
              </Text>
            </View>
          </View>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="flex items-center mt-5">
            <Text className="text-2xl text-white font-pbold text-center mt-3">
              {"Identifying Breeds, Empowering Care with"}{" "}
              <Text className="text-secondary-200">JAGRUTHI </Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px]"
              resizeMode="contain"
            />
          </View>
          {/* Continue with Email Button */}
          <CustomButton
            title="ಜಾನುವಾರುಗಳ ಗುರುತಿಸಿ"
            handlePress={() => router.push("/camerascreen")}
            containerStyles="w-full mt-12"
          />

          <Text className="text-white font-pregular text-sm mt-5">
            {"ಜೆಎಸ್‌ಎಸ್‌ಎಟಿಇ ಬೆಂಗಳೂರು ಪ್ರಾಯೋಜಿತ"}
          </Text>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
