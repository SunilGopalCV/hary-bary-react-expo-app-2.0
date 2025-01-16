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
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center px-4">
        {/* Logo Section */}
        <View className="flex-row items-center gap-4 mb-6">
          <Image
            source={images.logo}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <View className="flex items-center justify-centertext-center">
            <Text className="text-3xl font-pbold text-white">JAGRUTHI</Text>
            <Text className="text-sm text-white font-pregular">
              ಜಾನುವಾರು ಗುರುತಿಸಿ
            </Text>
          </View>
        </View>

        {/* Main Image */}
        <Image
          source={images.cards}
          className="w-full max-w-[380px] h-[200px] mb-6"
          resizeMode="contain"
        />

        {/* Title Section */}
        <View className="relative mb-8">
          <Text className="text-3xl font-bold text-white text-center">
            Identifying Breeds{"\n"}
            Empowering Care with{" "}
            <Text className="text-secondary-200">JAGRUTHI</Text>
          </Text>
          <Image
            source={images.path}
            className="absolute w-36 h-4 -bottom-2 right-12"
            resizeMode="contain"
          />
        </View>

        {/* Action Button */}
        <CustomButton
          title="Let's get Started ! "
          handlePress={() => router.push("/camerascreen")}
          containerStyles="w-full mt-10"
        />

        {/* Footer Text */}
        <Text className="text-sm text-white font-pmedium mt-6 text-center">
          ಜೆಎಸ್‌ಎಸ್‌ಎಟಿಇ ಬೆಂಗಳೂರು ಪ್ರಾಯೋಜಿತ
        </Text>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
