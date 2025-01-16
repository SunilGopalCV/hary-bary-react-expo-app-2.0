import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import breedDetails from "../data/breedDetails.json";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import icons from "@/constants/icons";

interface BreedDetails {
  name: string;
  type: string;
  origin: string;
  purpose: string;
  physicalTraits: string;
  milkYield?: string;
  specialFeature?: string;
  icon: string;
}

export default function ReportScreen() {
  const { imageUri, result, setResult } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [breedDetail, setBreedDetail] = useState<BreedDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (imageUri) {
      fetchPrediction();
    }
  }, [imageUri]);

  const fetchPrediction = async () => {
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await axios.post(
        "https://jagruthi-effnetb2-api-803431563668.asia-south1.run.app/predict/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const predictionResult = response.data;
      setResult(predictionResult);

      const predictedBreed = Object.keys(predictionResult.predictions).reduce(
        (a, b) =>
          predictionResult.predictions[a] > predictionResult.predictions[b]
            ? a
            : b
      );

      const breedDetail = breedDetails[predictedBreed];
      if (breedDetail) {
        setBreedDetail(breedDetail);
      } else {
        alert("Breed details not found.");
      }
    } catch (error) {
      console.error("API Request Failed:", error);
      alert("Failed to fetch prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <LottieView
          source={require("../assets/animations/analysis.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text className="text-xl font-pbold text-white mt-4">
          Analyzing Image...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full py-10">
      <ScrollView>
        <View className="flex-1 items-center px-4">
          {/* Uploaded Image */}
          <Image
            source={{ uri: imageUri }}
            className="w-80 h-80 rounded-lg mb-6 shadow-lg"
            alt="Uploaded Image"
          />

          {breedDetail && (
            <View className="w-full flex gap-5">
              {/* Breed Name with Icon */}
              <View className="flex flex-col items-center bg-black-200 rounded-lg p-4 shadow-md">
                <View className="flex flex-row justify-center border-b-2 border-gray-400 px-5">
                  <Image
                    source={icons[breedDetail.icon]}
                    className="w-10 h-10 mr-4"
                  />
                  <Text className="text-3xl font-pbold text-white">
                    {breedDetail.name}
                  </Text>
                </View>

                <Text className="text-base font-psemibold text-secondary-200">
                  {breedDetail.type}
                </Text>
              </View>

              {/* Origin */}
              <View className="flex justify-center bg-black-200 rounded-lg p-4 shadow-md">
                <Text className="text-lg font-psemibold text-gray-100">
                  Origin:
                </Text>
                <View className="border-t-2 border-gray-400 my-2" />
                <Text className="text-md font-pmedium text-gray-300">
                  {breedDetail.origin}
                </Text>
              </View>

              {/* Purpose */}
              <View className="flex justify-center bg-black-200 rounded-lg p-4 shadow-md">
                <Text className="text-lg font-psemibold text-gray-100">
                  Purpose:
                </Text>
                <View className="border-t-2 border-gray-400 my-2" />
                <Text className="text-md font-pmedium text-gray-300">
                  {breedDetail.purpose}
                </Text>
              </View>

              {/* Physical Traits */}
              <View className="flex justify-center bg-black-200 rounded-lg p-4 shadow-md">
                <Text className="text-lg font-psemibold text-gray-100">
                  Physical Traits:
                </Text>
                <View className="border-t-2 border-gray-400 my-2" />
                <Text className="text-md font-pmedium text-gray-300">
                  {breedDetail.physicalTraits}
                </Text>
              </View>

              {/* Milk Yield */}
              {breedDetail.milkYield && (
                <View className="flex justify-center bg-black-200 rounded-lg p-4 shadow-md">
                  <Text className="text-lg font-psemibold text-gray-100">
                    Milk Yield:
                  </Text>
                  <View className="border-t-2 border-gray-400 my-2" />
                  <Text className="text-md font-pmedium text-gray-300">
                    {breedDetail.milkYield}
                  </Text>
                </View>
              )}

              {/* Special Feature */}
              {breedDetail.specialFeature && (
                <View className="flex justify-center bg-black-200 rounded-lg p-4 shadow-md">
                  <Text className="text-lg font-psemibold text-gray-100">
                    Special Feature:
                  </Text>
                  <View className="border-t-2 border-gray-400 my-2" />
                  <Text className="text-md font-pmedium text-gray-300">
                    {breedDetail.specialFeature}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Capture Again Button */}
          <CustomButton
            title="Capture Again"
            handlePress={() => router.push("/camerascreen")}
            containerStyles="w-full mt-10 shadow-lg"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
