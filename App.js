import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert(
        "If you want to upload a pic, you really need to grant us permission."
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setSelectedImage({ localUri: pickerResult.uri });
  };
  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button
          onPress={openImagePickerAsync}
          title="Choose A Different Photo"
        ></Button>
        <Button
          onPress={() => setSelectedImage(null)}
          title="Back home"
        ></Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      ></Image>
      <Text style={styles.instructions}>
        To share a photo with a friend, press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: "orange", borderRadius: 10, padding: 10 }}
      >
        <Text style={{ fontSize: 20, color: "#fff" }}>Pick a photo</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#b2f4f1",
  },
  logo: {
    width: 250,
    height: 125,
    marginBottom: 20,
  },
  instructions: {
    color: "black",
    fontSize: 18,
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 30,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
