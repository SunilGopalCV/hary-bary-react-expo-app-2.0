import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import breedDetails from "../data/breedDetails.json";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

interface BreedDetails {
  name: string;
  description: string;
  origin: string;
  characteristics: string[];
}

export default function ReportScreen() {
  const { imageUri, result, setResult } = useAppContext();
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
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
        "https://sheep-harry-barbary-model-api.onrender.com/predict/",
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

      // Fetch breed details from imported JSON
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
      setIsLoading(false); // Stop loading after API call
    }
  };

  // Show a loading spinner until the results are fetched
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <LottieView
          source={require("../assets/animations/analysis.json")} // Replace with your Lottie file path
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

  // Show the report once loading is complete
  return (
    <SafeAreaView className="bg-primary h-full py-10">
      <ScrollView>
        <View className="flex-1 justify-center items-center">
          <Image
            source={{ uri: imageUri }}
            className="w-80 h-80 rounded-lg mb-6"
            alt="Uploaded Image"
          />
          {breedDetail ? (
            <View className="flex gap-5 px-4">
              <View className="flex items-center justify-center bg-black-200 rounded-lg p-4">
                <Text className="text-3xl font-pbold text-gray-100">
                  {breedDetail.name}
                </Text>
              </View>
              <View className="flex justify-center bg-black-200 rounded-lg p-4">
                <Text className="text-lg font-psemibold text-gray-100">
                  About:{" "}
                </Text>
                <View className="h-1 w-full bg-gray-500 rounded-full mb-2" />
                <Text className="text-md font-pmedium text-gray-100">
                  {breedDetail.description}
                </Text>
              </View>

              <View className="flex flex-row items-center bg-black-200 rounded-lg p-4">
                <Text className="text-lg font-psemibold text-gray-100">
                  Origin:{" "}
                </Text>
                <Text className="text-md font-pmedium text-gray-100">
                  {breedDetail.origin}
                </Text>
              </View>

              <View className="flex bg-black-200 rounded-lg p-4">
                <Text className="text-lg font-psemibold text-gray-100">
                  Characteristics:{" "}
                </Text>
                <View className="h-1 w-full bg-gray-500 rounded-full mb-2" />
                {breedDetail.characteristics.map((char, index) => (
                  <Text
                    key={index}
                    className="text-md font-pmedium text-gray-100"
                  >{`- ${char}`}</Text>
                ))}
              </View>
            </View>
          ) : null}
          <CustomButton
            title="Capture Again"
            handlePress={() => router.push("/camerascreen")}
            containerStyles="min-w-80 mt-10"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
