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
  const { errorMessage, clearErrorMessage, login } = useContext(AuthContext);

  const handleRegisterClick = () => {
    clearErrorMessage && clearErrorMessage();
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <AuthForm
        submitButtonText="Login"
        onSubmit={login}
      />
      <TouchableOpacity onPress={() => handleRegisterClick()}>
        <Spacer>
          <Text style={styles.link}>
            Não tem uma conta? Faça o cadastro
          </Text>
        </Spacer>
      </TouchableOpacity>
      {errorMessage && (
        <Spacer>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Spacer>
      )}
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
  errorText: {
    textAlign: "center",
    color: "red",
  },
});
