import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

type RootParams = { Login: undefined; Home: undefined };
const Stack = createNativeStackNavigator<RootParams>();

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootParams, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to the Home Screen!</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: { width: '100%', borderWidth: 1, borderColor: '#aaa', padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { width: '100%', backgroundColor: '#007AFF', padding: 15, alignItems: 'center', borderRadius: 5 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});