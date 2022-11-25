import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import CustomIconButton from "./CustomIconButton";

interface Props {
  handleLike: () => void;
  liked: boolean;
}

export default function FavoriteIconButton({ liked, handleLike }: Props) {
  return (
    <CustomIconButton handleOnPress={handleLike}>
      {liked ? (
        <MaterialIcons name="favorite" size={24} color="red" />
      ) : (
        <MaterialIcons name="favorite-border" size={24} />
      )}
    </CustomIconButton>
  );
}
