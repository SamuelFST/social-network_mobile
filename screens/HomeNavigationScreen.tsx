import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import PostListScreen from "./PostListScreen";
import PostScreen from "./PostScreen";
import NewPostScreen from "./NewPostScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigationScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='PostList'
        component={PostListScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity>
              <MaterialIcons
                name='edit'
                size={24}
                color="blue"
                onPress={() => navigation.navigate("PostCreate")}
              />
            </TouchableOpacity>
          ),
          title: "Home",
        })}
      />
      <Stack.Screen
        name='PostDetail'
        component={PostScreen}
        options={{ title: "Post" }}
      />
      <Stack.Screen
        name='PostCreate'
        component={NewPostScreen}
        options={{ title: "Criar Post" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

});
