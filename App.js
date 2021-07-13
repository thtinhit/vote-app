import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import { theme } from "./src/Utils/Theme";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LOGIN">
          <Stack.Screen
            name="LOGIN"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="REGISTER"
            component={RegisterScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HOME"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
