import React, { useContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Context as AuthContext } from '../context/AuthContext';
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function LoginScreen({ navigation }: Props) {
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        submitButtonText="Login"
        onSubmit={login}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Spacer>
          <Text style={styles.link}>
            Não tem uma conta? Faça o cadastro
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    marginBottom: 150,
    marginTop: 100,
  },
  link: {
    color: "blue",
    textAlign: "center",
  },
});
