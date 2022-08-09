import React, { useContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function RegisterScreen({ navigation }: Props) {
  const { register, clearErrorMessage, errorMessage } = useContext(AuthContext);

  const handleLoginClick = () => {
    clearErrorMessage && clearErrorMessage();
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <AuthForm
        submitButtonText="Cadastrar-se"
        onSubmit={register}
      />
      <TouchableOpacity onPress={handleLoginClick}>
        <Spacer>
          <Text style={styles.link}>
            Já tem uma conta? Faça o login
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
