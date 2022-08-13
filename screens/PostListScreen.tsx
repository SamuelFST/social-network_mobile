import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import PostItem from "../components/PostItem";
import { Context as PostContext } from "../context/PostContext";

export default function PostListScreen() {
  const { posts, errorMessage, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View>
      {errorMessage ?
        (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={({ _id }) => _id}
            renderItem={({ item }) => (
              <PostItem post={item} />
            )}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessageStyle: {
    color: "red",
    fontSize: 20,
    fontWeight: "700",
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 300,
  },
});
