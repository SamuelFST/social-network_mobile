import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import * as ImagePicker from 'expo-image-picker';

import Spacer from "./Spacer";

interface Props {
  onFileLoaded: (file: File) => void;
}

export default function PostImagePicker({ onFileLoaded }: Props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      setImage(uri);
      const name = uri.match(/[^\\/]+$/)[0];
      const file = {
        name,
        uri,
        type: "image/jpg",
        data: result.data,
      };

      onFileLoaded(file);
    }
  }

  return (
    <>
      <Button
        title="Anexar imagem"
        onPress={pickImage}
      />
      {image && (
        <View style={styles.imageContainer}>
          <Spacer>
            <Image
              source={{ uri: image }}
              style={styles.imageStyle}
            />
          </Spacer>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});
