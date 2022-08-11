import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Card } from "@rneui/base";
import { MaterialIcons } from '@expo/vector-icons';

import CustomAvatar from "../components/CustomAvatar";
import FavoriteIconButton from "../components/FavoriteIconButton";

export default function PostListScreen() {
  const posts = [
    {
      "_id": "62e9c6a51c1bb21e021c833f",
      "title": "teste com imagem",
      "description": "http://localhost:9000/first-bucket/62e9c539f3ee88309889de3f/Captura de tela de 2022-08-02 21-48-38.png",
      "profile": {
        "_id": "62e9c539f3ee88309889de3f",
        "name": "Samuel",
        "user": "62e9c539f3ee88309889de3d",
        "following": [],
        "followers": [
          "62e9c6b61c1bb21e021c8373"
        ],
        "createdAt": "2022-08-03T00:45:45.842Z",
        "updatedAt": "2022-08-03T00:45:45.842Z",
        "__v": 0
      },
      "comments": [
        "62e9c6e01c1bb21e021c8435"
      ],
      "likes": [
        "62e9c6b61c1bb21e021c8373"
      ],
      "image": true,
      "createdAt": "2022-08-03T00:51:49.339Z",
      "updatedAt": "2022-08-03T00:51:49.339Z",
      "__v": 0
    },
    {
      "_id": "62e9c55af3ee88309889deef",
      "title": "teste de post sam",
      "description": "dvegtrfgvf",
      "profile": {
        "_id": "62e9c539f3ee88309889de3f",
        "name": "Samuel",
        "user": "62e9c539f3ee88309889de3d",
        "following": [],
        "followers": [
          "62e9c6b61c1bb21e021c8373"
        ],
        "createdAt": "2022-08-03T00:45:45.842Z",
        "updatedAt": "2022-08-03T00:45:45.842Z",
        "__v": 0
      },
      "comments": [],
      "likes": [
        "62e9c6b61c1bb21e021c8373"
      ],
      "image": false,
      "createdAt": "2022-08-03T00:46:18.301Z",
      "updatedAt": "2022-08-03T00:46:18.301Z",
      "__v": 0
    }
  ];

  return (
    <FlatList
      data={posts}
      keyExtractor={({ _id }) => _id}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Card>
            <View style={styles.cardHeader}>
              <CustomAvatar name={item.profile.name}/>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            {item.image ? (
              <Card.Image source={{ uri: item.description }} style={styles.cardImage} />
            ) : (
              <Text style={styles.cardDescription}>{item.description}</Text>
            )}
            <Card.Divider />
            <View style={styles.actionContainer}>
              <FavoriteIconButton liked={true} handleLike={() => {}} />
              <Text style={styles.actionItem}>{item.likes.length}</Text>
              <MaterialIcons name="chat-bubble-outline" size={24} style={styles.actionItem} />
              <Text style={styles.actionItem}>{item.comments.length}</Text>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
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
  }
});
