import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InfiniteScroll from "react-native-infinite-scrolling";

import PostItem from "../components/PostItem";
import { Post } from "../models/Post";
import { Context as PostContext } from "../context/PostContext";

interface Props {
  navigation: any;
}

export default function PostListScreen({ navigation }: Props) {
  const { posts, errorMessage, getPosts } = useContext(PostContext);
  const [actualPage, setActualPage] = useState(0);

  useEffect(() => {
    getPosts && getPosts({ page: actualPage });
  }, [actualPage]);

  const renderData = ({ item }: { item: Post }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("PostDetail", { id: item._id })}
      >
        <PostItem post={item} />
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    setActualPage(page => page + 1);
  };

  return (
    <>
      {errorMessage ?
        (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
          </View>
        ) : (
          <InfiniteScroll
            data={posts}
            renderData={renderData}
            loadMore={loadMore}
          />
        )
      }
    </>
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
