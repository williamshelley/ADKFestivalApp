import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, FlatList } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import MyNavStackButton from './components/MyNavStackButton';
import InfoSchedule from './views/InfoSchedule';
import HomeView from './views/HomeView';
import Schedule from './views/Schedule';
import styles from './styles';

class CategorySidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      homeData: null,
      allData: null,
    }
  }

  setHomeData = ( nextTitle ) =>{
    console.log("next screen title: ", nextTitle);
    let HOME_DATA = []
    for (var i = 0; i < this.state.allData.length; i++){
      if (this.state.allData[i].category == nextTitle){
        HOME_DATA.push(this.state.allData[i]);
      }
    }
    this.setState({homeData: HOME_DATA});
    return HOME_DATA;
  }

  CategoryButton = ({ navigation, title }) => {
    if (title != null) {
      return (
        <TouchableOpacity
          style={[styles.roundButton, {
            borderWidth: 2,
            borderColor: "black",
            alignItems: "center",
            justifyContent: "center"
          }]}
          onPress={() => {
            navigation.navigate("HomeView", { title: title, data: this.setHomeData(title) });
            navigation.toggleDrawer();
          }}>
          <Text style={styles.medWhiteText}>{title}</Text>
        </TouchableOpacity>
      );
    }
    else{
      return null;
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let DATA = [];
        let ALL_DATA = [];
        let CATS = new Set();
        for (var i = 0; i < responseJson.sources.length; i++) {
          CATS.add(responseJson.categories[i]);
          ALL_DATA.push({
            category: responseJson.categories[i],
            title: responseJson.titles[i],
            id: responseJson.id_list[i],
            //links: responseJson.links[i]
            source: responseJson.sources[i],
            description: responseJson.descriptions[i],
          })
          if (DATA.length < CATS.size) {
            DATA.push({
              id: String(i * Math.random()) + "$%^",
              category: responseJson.categories[i],
            });
          }
        }
        var iter = 0;
        CATS.forEach(cat => {
          DATA[iter].id = cat;
          DATA[iter].category = cat;
          iter++;
        })
        this.setState({ data: DATA, allData: ALL_DATA });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView style={[{ alignItems: "center", justifyContent: "flex-start" }]}>
        {
          <FlatList
            data={this.state.data}
            contentContainerStyle={{ flex: 2, justifyContent: "space-evenly" }}
            numColumns={1}
            renderItem={({ item }) => <this.CategoryButton
              navigation={this.props.navigation}
              title={item.category}
              data={item.data} />}
            keyExtractor={item => item.id}
          />
        }
      </SafeAreaView>
    );
  }
};


const DrawerNavigator = createDrawerNavigator({
  Stack: createStackNavigator({
    HomeView,
    InfoSchedule,
    Schedule,
  }),
}, {
  contentComponent: CategorySidebar,
});

const App = createAppContainer(DrawerNavigator);



export default App;
