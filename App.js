import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import Details from './views/Details';
import Schedule from './views/Schedule';

import { styles, theme } from './styles';
import IconButton from './components/IconButton';
import { requestJson } from './utils/data-funcs';
import Sponsors from './views/Sponsors';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const drawerIcon = require("./images/drawerIcon-white.png");

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.navigationAccent,
        headerStyle: styles.stackHeader,
      }}>
      <Stack.Screen name="Home" component={Home}
        options={{
          headerLeft: () => (
            <IconButton source={drawerIcon}
              onPress={() => { navigation.toggleDrawer() }} />),
        }} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}



const ScheduleStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: theme.navigationAccent,
      headerStyle: styles.stackHeader,
    }}>
    <Stack.Screen name="Schedule" component={Schedule}
      options={{
        headerLeft: () => (
          <IconButton source={drawerIcon}
            onPress={() => { navigation.toggleDrawer() }} />)
      }} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const SponsorStack = ({ navigation }) => {

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: theme.navigationAccent,
      headerStyle: styles.stackHeader,
    }}>
      <Stack.Screen name="Sponsors" component={Sponsors} options={{
        headerLeft: () => (
          <IconButton source={drawerIcon}
            onPress={() => { navigation.toggleDrawer() }} />)
      }} />
    </Stack.Navigator>
  );
}

export default class App extends React.Component {
  componentDidMount = async () => {
    await requestJson();
  }

  render = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="Schedule" component={ScheduleStack} />
          <Drawer.Screen name="Sponsors" component={SponsorStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
}