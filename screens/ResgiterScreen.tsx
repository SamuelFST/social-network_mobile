import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Spacer from "../components/Spacer";
import AuthForm from "../components/AuthForm";

interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}

export default function RegisterScreen({ navigation }: Props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <AuthForm
        submitButtonText="Cadastrar-se"
        onSubmit={({ user, password }: { user: string, password: string }) => {}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Spacer>
          <Text style={styles.link}>
            Já tem uma conta? Faça o login
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
