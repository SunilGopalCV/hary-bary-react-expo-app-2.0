import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import { useRouter } from "expo-router";

export default function ReportScreen() {
  const { imageUri, result, setResult } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (imageUri) {
      fetchPrediction();
    }
  }, [imageUri]);

  const fetchPrediction = async () => {
    setIsLoading(true);
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

      setResult(response.data);
    } catch (error) {
      console.error("API Request Failed:", error);
      alert("Failed to fetch prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : result ? (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>
            Barbery: {(result.predictions.Barbery * 100).toFixed(2)}%
          </Text>
          <Text style={styles.resultText}>
            Harry: {(result.predictions.Harry * 100).toFixed(2)}%
          </Text>
          <Text style={styles.resultText}>
            Inference Time: {result.inference_time}s
          </Text>
        </View>
      ) : null}
      <Button
        title="Capture Again"
        onPress={() => router.push("/camerascreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 200, height: 200 },
  resultText: { fontSize: 18, fontWeight: "bold", marginVertical: 5 },
  resultsContainer: { alignItems: "center", marginVertical: 20 },
});
