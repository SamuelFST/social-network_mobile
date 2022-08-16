import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@rneui/base";

import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PostContext } from "../context/PostContext";
import CustomAvatar from "../components/CustomAvatar";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { clearPosts } = useContext(PostContext);

  return (
    <Spacer>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <CustomAvatar name={user || ""} />
          <Text h4 style={styles.userTextStyle}>
            {user}
          </Text>
        </View>
        <Spacer />
        <Button title="Logout" onPress={() => {
          logout && logout();
          clearPosts && clearPosts();
        }} />
      </View>
    </Spacer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 150,
  },
  userContainer: {
    flexDirection: "row",
  },
  userTextStyle: {
    marginLeft: 10,
  },
});
