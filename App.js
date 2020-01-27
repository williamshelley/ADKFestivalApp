import React,{Component} from "react";
import {
  SafeAreaView,
  Text,
  Image,
} from "react-native";

import { createAppContainer } from 'react-navigation';

import {
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation-drawer";

import {createStackNavigator} from 'react-navigation-stack';

import styles from './styles';
import MyButton from './components/MyButton';
import MyDrawerButton from './components/MyDrawerButton';
import MyNavStackButton from './components/MyNavStackButton';
import InfoSchedule from './views/InfoSchedule';
import HomeView from './views/HomeView';

const eventTitle = "Event Title";

const DrawerNavigator = createDrawerNavigator({
  Headliners: createStackNavigator({
      A: {
        screen: HomeView,
        navigationOptions:{
          title:"Headliners"
        }
      },
      InfoSchedule,
  }),
  Features: createStackNavigator({
    A:{
      screen: HomeView,
      navigationOptions:{
        title:"Features"
      },
    },
    InfoSchedule
  }),
  Shorts: createStackNavigator({
    A:{
      screen: HomeView,
      navigationOptions:{
        title:"Shorts"
      }
    },
    InfoSchedule
  }),
});

const App = createAppContainer(DrawerNavigator);



export default App;
