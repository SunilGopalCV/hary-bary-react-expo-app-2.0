import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Harry-Barbery Predictor!</Text>
      <Text style={styles.subtitle}>
        Capture or upload an image of a sheep to classify its breed.
      </Text>
      <Button
        title="Get Started"
        onPress={() => router.push("/camerascreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 40 },
});
