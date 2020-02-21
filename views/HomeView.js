import React, { Component } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import IconButton from '../components/IconButton';
import DropdownFilter from '../components/DropdownFilter';
import EventCard from '../components/EventCard';
import styles from '../styles';

const NUM_COLUMNS = 2;

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
      allData: null,
      currentData: null,
      toggleFilter: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerTitle = navigation.getParam("headerTitle", "All");
    return {
      headerTitle: headerTitle,
      headerTitleStyle: styles.headerText,
      headerLeft: () => (
        <IconButton
          onPress={() => { navigation.toggleDrawer(); }}
          source={require('../images/white_list.png')}
        />
      ),
      headerRight: () => (
        <IconButton
          onPress={() => { params.toggleFilter(); }}
          source={require('../images/white_filter.png')}
        >
        </IconButton>
      ),
    }
  };

  fetchData = () => {
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let ALL_DATA = [];
        let CATEGORIES = []
        for (var i = 0; i < responseJson.category_set.length; i++) {
          CATEGORIES.push({
            category: responseJson.category_set[i],
            id: String(i * Math.random()) + responseJson.category_set + String(i * Math.random()),
          });
        }
        for (var i = 0; i < responseJson.sources.length; i++) {
          ALL_DATA.push({
            title: responseJson.titles[i],
            category: responseJson.categories[i],
            source: responseJson.sources[i],
            description: responseJson.descriptions[i],
            id: responseJson.id_list[i],
          })
        }
        this.setState({ categories: CATEGORIES, allData: ALL_DATA, currentData: ALL_DATA });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setCurrentDisplay = (nextTitle) => {
    let HOME_DATA = []
    for (var i = 0; i < this.state.allData.length; i++) {
      if (this.state.allData[i].category == nextTitle) {
        HOME_DATA.push(this.state.allData[i]);
      }
    }
    this.setState({ currentData: HOME_DATA });
    return HOME_DATA;
  }

  toggleFilter = () => {
    this.setState({ toggleFilter: !this.state.toggleFilter });
  };

  onFilterItemPress = (item) => {
    this.setState({ title: item.category, currentData: this.setCurrentDisplay(item.category) });
    this.toggleFilter();
    this.props.navigation.setParams({ headerTitle: item.category });
  }

  componentDidMount() {
    this.fetchData();
    this.props.navigation.setParams({
      toggleFilter: this.toggleFilter,
    });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{ flex: 0, alignItems: "center" }}>
          <FlatList
            data={this.state.currentData}
            contentContainerStyle={{ flex: 0, justifyContent: "flex-start" }}
            numColumns={NUM_COLUMNS}
            renderItem={({ item }) =>
              <EventCard
                navigation={this.props.navigation}
                data={item}
                target="InfoSchedule"
              />}
            keyExtractor={item => item.id}
          />
        </View>
        <DropdownFilter
          duration={250}
          direction="right"
          data={this.state.categories}
          toggleFilter={this.state.toggleFilter}
          onFilterItemPress={this.onFilterItemPress}
        />
      </SafeAreaView>
    );
  }
}