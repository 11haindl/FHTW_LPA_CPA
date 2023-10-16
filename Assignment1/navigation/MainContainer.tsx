import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'

// Screens
import Home from './screens/Home';
import About from './screens/About';
import Map from './screens/Map';

//Screen names
const homeName = "Home";
const aboutName = "About";
const mapName = "Map";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'default-icon-name';
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === aboutName) {
              iconName = focused ? 'information' : 'information-outline';

            } else if (rn === mapName) {
              iconName = focused ? 'map' : 'map-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>

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
