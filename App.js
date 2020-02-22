import React, { Component } from 'react';
import {
  SafeAreaView, Text,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import InfoSchedule from './views/Info';
import HomeView from './views/HomeView';
import MasterSchedule from './views/Schedule';
import styles from './styles';

console.ignoredYellowBox = ['Unable to find module for UIManager'];


const DATA = [
  {
    category: "Program",
    id: "Program",
    route: "Program",
    data: null,
  },
  {
    category: "Schedule",
    id: "Schedule",
    route: "MasterSchedule",
    data: null,
  },
  {
    category: "Map",
    id: "Map",
    rout: "Map",
    data: null,
  }
];

class CategorySidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: DATA,
    }
  }



  SidebarButton = ({ navigation, dataItem }) => {
    if (dataItem != null) {
      return (
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate(dataItem.route);
          }}>
          <Text style={[styles.medWhiteText, {}]}>{dataItem.category}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.menuSidebar}>

        <ImageBackground source={require("./images/swan.jpg")} style={styles.container}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={{ flex: 0, justifyContent: "flex-start" }}
            numColumns={1}
            renderItem={({ item }) => <this.SidebarButton
              navigation={this.props.navigation}
              dataItem={item}
            />}
            keyExtractor={item => item.id}
          />

        </ImageBackground>
      </SafeAreaView>

    );
  }
};

const StackNavigator = createStackNavigator({
  HomeView,
  InfoSchedule,
  MasterSchedule,
}, {
  defaultNavigationOptions:
    navigationOptions = ({ navigation }) => {
      return {
        headerStyle: styles.headerBar,
        headerTitle: "",
        headerBackTitle: "",
        headerTintColor: "white",
      };
    },
},
);

const DrawerNavigator = createDrawerNavigator({
  StackNavigator,
}, {
  contentComponent: CategorySidebar,
});

const SwitchNavigator = createSwitchNavigator({
  DrawerNavigator,
  MasterSchedule,
})

const App = createAppContainer(DrawerNavigator);


export default App;
