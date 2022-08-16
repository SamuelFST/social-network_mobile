import React, { useEffect, useState } from "react";
import { Button, Card } from "@rneui/base";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "@rneui/base";
import * as SecureStore from "expo-secure-store";

import CustomAvatar from "../components/CustomAvatar";
import Spacer from "../components/Spacer";
import axios from "../api/axios";

interface Profile {
  _id: string;
  name: string;
  followers: string[];
  following: string[];
}

export default function ProfilesScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        const response = await axios.get('/profiles', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setProfiles(response.data);
      } catch (err) {

      }
    }

    getProfiles();
  }, []);

  const handleFollow = async (id: string) => {
    try {
      const actualProfile = await SecureStore.getItemAsync("profile");
      const token = await SecureStore.getItemAsync("token");

      await axios.post(`/profiles/${id}/follow`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setProfiles((p: Profile[]) => {
        const indexFollowing = p.findIndex(
          (profile: Profile) => profile._id === id
        );
        const indexFollowers = p.findIndex(
          (profile: Profile) => profile._id === actualProfile
        );

        p[indexFollowing].followers.push(actualProfile);
        p[indexFollowers].following.push(id);

        return [...p];
      });
    } catch (err) {

    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={({ _id }) => _id }
        renderItem={({ item }) => (
          <Card>
            <View style={styles.cardHeaderStyle}>
              <CustomAvatar name={item.name} />
              <Text h4 style={styles.cardHeaderTextStyle}>
                {item.name}
              </Text>
            </View>
            <Spacer />
            <Text>{item.followers.length} seguidores</Text>
            <Text>
              Seguindo{" "}
              {item.following.length === 1
                ? item.following.length + " perfil"
                : item.following.length + " perfis"
              }
            </Text>
            <Spacer />
            <Button title="Seguir"
              onPress={() => handleFollow(item._id)}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  cardHeaderStyle: {
    flexDirection: "row",
  },
  cardHeaderTextStyle: {
    marginLeft: 15,
  },
});
