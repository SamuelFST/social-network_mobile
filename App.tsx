import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/ResgiterScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfilesScreen from './screens/ProfilesScreen';
import NewPostScreen from './screens/NewPostScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const token = "null";

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!token ? (
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Post' component={PostScreen} />
            <Tab.Screen name='CreatePost' component={NewPostScreen} />
            <Tab.Screen name='Profiles' component={ProfilesScreen} />
            <Tab.Screen name='Profile' component={ProfileScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
