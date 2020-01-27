import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import InfoSchedule from './views/InfoSchedule';
import HomeView from './views/HomeView';


const DrawerNavigator = createDrawerNavigator({
  Headliners: createStackNavigator({
      Headliners: {
        screen: HomeView,
        navigationOptions:{
          title:"Headliners",
          headerTitleAlign:'center',
        }
      },
      InfoSchedule,     
  }),
  Features: createStackNavigator({
    Features:{
      screen: HomeView,
      navigationOptions:{
        title:"Features",
        headerTitleAlign:'center',
      },
    },
    InfoSchedule
  }),
  Shorts: createStackNavigator({
    Shorts:{
      screen: HomeView,
      navigationOptions:{
        title:"Shorts",
        headerTitleAlign:'center',
      }
    },
    InfoSchedule
  }),
});

const App = createAppContainer(DrawerNavigator);



export default App;
