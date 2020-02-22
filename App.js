import React, { Component } from 'react';
import { FlatList, ImageBackground } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import InfoSchedule from './views/Info';
import HomeView from './views/HomeView';
import MasterSchedule from './views/Schedule';
import styles from './styles';
import DrawerItem from './components/DrawerItem';

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
    route: "Map",
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

  render() {
    return (
        <ImageBackground source={require("./images/swan.jpg")} style={{
          flex:1,
          justifyContent: "center"
        }}>
          <FlatList
            data={this.state.data}
            contentContainerStyle={styles.scrollContainer}
            numColumns={1}
            renderItem={({ item }) => 
            <DrawerItem 
              title={item.category}
              onPress={()=>{this.props.navigation.navigate(item.route);}}
            />}
            keyExtractor={item => item.id}
          />

        </ImageBackground>

    );
  }
};

const StackNavigator = createStackNavigator({
  HomeView,
  InfoSchedule,
  MasterSchedule,
}, {
  defaultNavigationOptions:
    navigationOptions = () => {
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
