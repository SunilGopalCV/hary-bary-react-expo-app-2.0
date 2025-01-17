import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary px-4">
      <View className="flex-1 justify-center items-center">
        {/* Logo Section */}
        <View className="flex-row items-center gap-4 mb-6">
          <Image
            source={images.logo}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <View className="flex items-center justify-center text-center">
            <Text className="text-3xl font-pbold text-white">JAGRUTHI</Text>
            <Text className="text-sm text-white font-pregular">
              ಜಾನುವಾರು ಗುರುತಿಸಿ
            </Text>
          </View>
        </View>

        {/* Main Image */}
        <Image
          source={images.cards}
          className="w-full max-w-[360px] h-[200px] mb-8"
          resizeMode="contain"
        />

        {/* Title Section */}
        <View className="relative mb-10">
          <Text className="text-2xl font-bold text-white text-center leading-8">
            Identifying Breeds{"\n"}
            Empowering Care with{" "}
            <Text className="text-secondary-200">JAGRUTHI</Text>
          </Text>
          <Image
            source={images.path}
            className="absolute w-36 h-4 -bottom-2 right-10"
            resizeMode="contain"
          />
        </View>

        {/* Action Button */}
        <CustomButton
          title=" Let's get Started ! "
          handlePress={() => router.push("/camerascreen")}
          containerStyles="w-full mt-10"
        />

        {/* Footer Text */}
        <Text className="text-sm text-white font-pmedium mt-6 text-center px-2">
          ಜೆಎಸ್‌ಎಸ್‌ಎಟಿಇ ಬೆಂಗಳೂರು ಪ್ರಾಯೋಜಿತ
        </Text>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
