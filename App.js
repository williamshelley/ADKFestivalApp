import React, { Component } from 'react';
import { View, Dimensions, SafeAreaView, Text, TouchableOpacity, FlatList,ImageBackground } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import MyNavStackButton from './components/MyNavStackButton';
import InfoSchedule from './views/Info';
import HomeView from './views/HomeView';
import Schedule from './views/Schedule';
import styles from './styles';

const screenWidth = Math.round(Dimensions.get('window').width);

const DATA=[
  {
    category: "Program",
    id: "Program",
    data: null,
  },
  {
    category: "Schedule",
    id: "Schedule",
    data: null,
  },
  {
    category: "Map",
    id: "Map",
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

  

  SidebarButton = ({ navigation, title }) => {
    if (title != null) {
      return (
        <TouchableOpacity
          style={styles.menuSidebarBtn}
          onPress={() => {
            navigation.navigate(title);
          }}>
          <Text style={[styles.medWhiteText,{}]}>{title}</Text>
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
              title={item.category}
              data={item.data} />}
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
    Schedule,
  },{
    defaultNavigationOptions:
      navigationOptions = ({navigation}) => {
        return{
          headerStyle: styles.headerBar,
          headerTitle: "",
          headerBackTitle:"",
          headerTintColor:"white",
      };
    },
  },
);

const DrawerNavigator = createDrawerNavigator({
  StackNavigator,
}, {
  contentComponent: CategorySidebar,
  //drawerWidth: screenWidth / 2,

});

const App = createAppContainer(DrawerNavigator);


export default App;
