import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "@rneui/base";
import { MaterialIcons } from "@expo/vector-icons";

import CustomAvatar from "./CustomAvatar";
import FavoriteIconButton from "./FavoriteIconButton";
import { Post } from "../models/Post";

interface Props {
  post: Post;
}

export default function PostItem({ post }: Props) {
  return (
    <TouchableOpacity>
      <Card>
        <View style={styles.cardHeader}>
          <CustomAvatar name={post.profile.name} />
          <Text style={styles.cardTitle}>{post.title}</Text>
        </View>
        {post.image ? (
          <Card.Image source={{ uri: post.description }} style={styles.cardImage} />
        ) : (
          <Text style={styles.cardDescription}>{post.description}</Text>
        )}
        <Card.Divider />
        <View style={styles.actionContainer}>
          <FavoriteIconButton liked={false} handleLike={() => { }} />
          <Text style={styles.actionItem}>{post.likes.length}</Text>
          <MaterialIcons name="chat-bubble-outline" size={24} style={styles.actionItem} />
          <Text style={styles.actionItem}>{post.comments.length}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    marginLeft: 15,
    fontWeight: "bold",
  },
  cardImage: {
    resizeMode: "contain",
    maxHeight: 600,
    marginBottom: 15,
  },
  cardDescription: {
    fontSize: 12,
    marginBottom: 15,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-around",
  },
  actionItem: {
    marginLeft: 5,
  },
});
