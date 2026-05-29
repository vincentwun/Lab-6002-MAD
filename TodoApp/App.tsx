import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import data from "./data.json";

type RootParams = { Login: undefined; Home: undefined };
type Todo = {
  _id: string;
  title: string;
  description: string;
  user?: string;
  commentCount: number;
  createdAt: string;
  comments: Comment[];
};
type Comment = { id: string; user: string; title: string; createdAt: string };
const Stack = createNativeStackNavigator<RootParams>();

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootParams, "Login">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <Text style={styles.header}>System Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Todo List (FlatList)</Text>
    <FlatList
      data={data as Todo[]}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.meta}>
            By: {item.user} | {item.commentCount} Comments
          </Text>

          <Text style={styles.meta}>
            Created: {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      )}
    />
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
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, marginVertical: 5 },
  meta: { fontSize: 12, color: "#666", marginTop: 2 },
});
