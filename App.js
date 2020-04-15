import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './views/Home';
import Details from './views/Details';
import Schedule from './views/Schedule';
import SpecialEvents from './views/SpecialEvents';

import { styles, theme } from './styles';
import IconButton from './components/IconButton';
import { requestJson } from './utils/data-funcs';
import Sponsors from './views/Sponsors';
import DrawerContent from './components/DrawerContent';
import Venues from './views/Venues';

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
      <Stack.Screen name="Films" component={Home}
        options={{
          headerLeft: () => (
            <IconButton source={drawerIcon}
              onPress={() => { navigation.toggleDrawer() }} />),
        }} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

const SpecEventStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.navigationAccent,
        headerStyle: styles.stackHeader,
      }}>
      <Stack.Screen name="Special Events" component={SpecialEvents}
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
    <Stack.Screen name="My Schedule" component={Schedule}
      options={{
        headerLeft: () => (
          <IconButton source={drawerIcon}
            onPress={() => { navigation.toggleDrawer() }} />)
      }} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
<<<<<<< HEAD
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
=======
>>>>>>> experimental
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

const VenueStack = ({ navigation }) => {

  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: theme.navigationAccent,
      headerStyle: styles.stackHeader,
    }}>
      <Stack.Screen name="Venues" component={Venues} options={{
        headerLeft: () => (
          <IconButton source={drawerIcon}
            onPress={() => { navigation.toggleDrawer() }} />)
      }} />
    </Stack.Navigator>
  );
}

<<<<<<< HEAD
=======
export default class App extends React.Component {
  componentDidMount = async () => {
    await requestJson();
  }

>>>>>>> experimental
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
<<<<<<< HEAD
}
=======
}
>>>>>>> experimental
