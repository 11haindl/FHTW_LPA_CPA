import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

// Screens
import Home from './screens/Home';
import About from './screens/About';
import Map from './screens/Map';
import Profile from './screens/Profile';

//Screen names
const homeName = "Home";
const aboutName = "About";
const mapName = "Map";
const profileName = "Profile";

// create the Bottom Navigation with @react-navigation/bottom-tabs
const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName} // Name of the landing page
        screenOptions={({ route }) => ({
          // set icons for the tabs
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'image';
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === aboutName) {
              iconName = focused ? 'information' : 'information-outline';
            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === mapName) {
              iconName = focused ? 'map' : 'map-outline';
            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>

        {/* create a screen for every Page */}
        <Tab.Screen
          name={homeName}
          component={Home}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name={mapName}
          component={Map}
          options={{
            tabBarLabel: 'Map',
          }}
        />
        <Tab.Screen
          name={profileName}
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
        <Tab.Screen
          name={aboutName}
          component={About}
          options={{
            tabBarLabel: 'About',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
