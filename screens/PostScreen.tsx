import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, ScrollView, SafeAreaView } from "react-native";
import { Input, Button, Text, Divider } from "@rneui/base";
import * as SecureStore from "expo-secure-store";

import axios from "../api/axios";
import PostItem from "../components/PostItem";
import { Post } from "../models/Post";
import Spacer from "../components/Spacer";
import CustomAvatar from "../components/CustomAvatar";

interface Props {
  route: any;
}

export default function PostScreen({ route }: Props) {
  const { id } = route.params;
  const [post, setPost] = useState<Post>();
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const profile = await SecureStore.getItemAsync("profile");

        const response = await axios.get(`/posts/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const post = {
          ...response.data,
          liked: response.data.likes.includes(profile),
        };

        setPost(post);
      } catch (err) {

      }
    }

    getPost();
  }, []);

  const addComment = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");

      await axios.post(
        `/posts/${id}/comments`,
        { description },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {

    }
  };

  return (
    <>
      {post ? (
        <KeyboardAvoidingView>
            <PostItem post={post} />
            <Spacer>
              <>
                <Divider />
                <Text h4 style={{ marginTop: 6 }}>Comentários</Text>
                <Input
                  label="Novo comentário"
                  value={description}
                  onChangeText={setDescription}
                  autoCorrect={false}
                />
                <Button
                  title="Publicar"
                  onPress={() => {
                    setDescription("");
                    addComment();
                  }}
                />
                <FlatList
                nestedScrollEnabled
                  style={styles.commentsContainer}
                  data={post.comments}
                  keyExtractor={({ _id }) => _id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.comment}>
                        <CustomAvatar name={item.profile.name} />
                        <Text style={styles.commentText}>{item.description}</Text>
                      </View>
                    );
                  }}
                />
              </>
            </Spacer>
        </KeyboardAvoidingView>
      ) : (null)}
    </>
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    marginTop: 20,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  commentText: {
    fontSize: 15,
    marginLeft: 10,
  },
});
