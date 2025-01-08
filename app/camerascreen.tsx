import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAppContext } from "../contexts/AppContext";
import { useRouter } from "expo-router";

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
    <View style={styles.container}>
      <Button title="Capture Image" onPress={captureImage} />
      <Button title="Upload Image" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
