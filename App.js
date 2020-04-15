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

  

const ScheduleStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: theme.navigationAccent,
      headerStyle: styles.stackHeader,
    }}>
    <Stack.Screen name="My Schedule" component={Schedule}
      options={{
        headerLeft: () => (
          <IconButton source={drawerIcon}
            onPress={() => { navigation.toggleDrawer() }} />)
      }} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

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

  render = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="Films" component={HomeStack} />
          <Drawer.Screen name="Special Events" component={SpecEventStack} />
          <Drawer.Screen name="My Schedule" component={ScheduleStack} />
          <Drawer.Screen name="Venues" component={VenueStack} />
          <Drawer.Screen name="Sponsors" component={SponsorStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
}
