import React, { useState, useCallback, useEffect} from "react";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from './routes/homeNavigator'
import FindExercisesNavigator from './routes/findExercisesNavigator';
import MyExercisesNavigator from './routes/myExercisesNavigator'
import AwardsNavigator from './routes/awardsNavigator'
import AboutNavigator from './routes/aboutNavigator'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from './screens/header'

// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
          'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: (props) => <Header {...props} />
      }}>
      <Drawer.Screen name="Home" component={HomeNavigator}/>
      <Drawer.Screen name="Find an Exercise" component={FindExercisesNavigator}/>
      <Drawer.Screen name="My Exercises" component={MyExercisesNavigator}/>
      <Drawer.Screen name="Awards" component={AwardsNavigator}/>
      <Drawer.Screen name="About" component={AboutNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}