import React,{ Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import MyNavStackButton from './components/MyNavStackButton';
import InfoSchedule from './views/InfoSchedule';
import HomeView from './views/HomeView';
import styles from './styles';

class CategorySidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      data: null,
    }
  }
  CategoryButton = ({navigation, title, data}) =>{
    return (
      <TouchableOpacity
          style={[styles.roundButton, { alignItems: "center", justifyContent: "center" }]}
          onPress={() => navigation.navigate("HomeView", { title:title, data:data })}>
            <Text style={styles.medWhiteText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount(){
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
        let DATA = [];
        let CATS = new Set();
        for(var i = 0; i < responseJson.sources.length; i++){
          CATS.add(responseJson.category);
          if (DATA.length < CATS.size){
            DATA.push({
              id: responseJson.category,
              title: responseJson.titles[i],
              links: responseJson.links[i],
              category: responseJson.category,
            });
          }
        }
        this.setState({data: DATA});
    })
    .catch((error) => {
        console.error(error);
    });
}

  render(){
    return ( 
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          contentContainerStyle={{ flex: 0 }}
          numColumns={1}
          renderItem={({ item }) => <this.CategoryButton
            navigation={this.props.navigation}
            title={item.category}
            data={item.data}/>}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
};


const DrawerNavigator = createDrawerNavigator({
  Stack: createStackNavigator({
    HomeView,
    InfoSchedule,
  }),
},{
  contentComponent: CategorySidebar,
});

const App = createAppContainer(DrawerNavigator);



export default App;
