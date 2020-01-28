import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import InfoSchedule from './views/InfoSchedule';
import HomeView from './views/HomeView';


const DrawerNavigator = createDrawerNavigator({
  Headliners: createStackNavigator({
    Headliners: HomeView,
    InfoSchedule,
  }),

  Features: createStackNavigator({
    Features: HomeView,
    InfoSchedule,
  }),
  Shorts: createStackNavigator({
    Shorts: HomeView,
    InfoSchedule,
  }),
});

const App = createAppContainer(DrawerNavigator);



export default App;
