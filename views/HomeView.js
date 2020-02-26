import React, { Component } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import IconButton from '../components/IconButton';
import DropdownFilter from '../components/DropdownFilter';
import EventCard from '../components/EventCard';
import styles, { filterIcon, drawerIcon, theme, opacityValue } from '../styles';
import { notNull, isNull } from '../helper-functions/helpers';
import { _data, _date, JSON_DATA } from '../helper-functions/data';
import { pushData, pushCategories, storeData, retrieveData, OFFLINE_STORAGE_KEY } from '../helper-functions/storage_functions';


const NUM_COLUMNS = 2;

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.fetchLocation = true ? 'http://127.0.0.1:5000/' : null;

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
          onPress={() => {
            params.disableFilter();
            navigation.toggleDrawer();

          }}
          source={drawerIcon}
        />
      ),
      headerRight: () => (
        <IconButton
          onPress={() => { params.toggleFilter(); }}
          source={filterIcon}
        />
      ),
    }
  };

  fetchData = () => {
    fetch(this.fetchLocation, {
      method: 'GET',
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    })
    .then((responseJson) => {
        storeData(OFFLINE_STORAGE_KEY, responseJson, responseJson);
        this.setAllData(responseJson);
      });
  };

  setAllData = (json) => {
    let ALL_DATA = [];
    let CATEGORIES = []
    for (var i = 0; i < json.category_set.length; i++) {
      pushCategories({json: json, destination:CATEGORIES, index:i});
    }
    let parsedData = JSON.parse(json.data);
    for (var i = 0; i < parsedData.length; i++) {
      pushData({jsonData: parsedData, destination: ALL_DATA, index: i});
    }
    this.setState({ categories: CATEGORIES, allData: ALL_DATA, currentData: ALL_DATA });
  }

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

  disableFilter = () => {
    this.setState({ toggleFilter: false });
  }

  onFilterItemPress = (item) => {
    this.setState({ toggleFilter: !this.state.toggleFilter, title: item.category, currentData: this.setCurrentDisplay(item.category) });
    this.props.navigation.setParams({ headerTitle: item.category });
  }

  componentDidMount() {
    if (notNull(this.fetchLocation)) {
      this.fetchData();
    } else{
      retrieveData(OFFLINE_STORAGE_KEY, this.setAllData);
    }
    this.props.navigation.setParams({
      toggleFilter: this.toggleFilter,
      disableFilter: this.disableFilter,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <FlatList
            data={this.state.currentData}
            contentContainerStyle={[styles.scrollContainer, {
              backgroundColor: theme.overlay,
              opacity: opacityValue(this.state.toggleFilter),
            }]}
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
          onOutsidePress={() => { this.disableFilter(); }}
          duration={styles.dropdownOpenSpeed}
          direction="right"
          data={this.state.categories}
          toggleFilter={this.state.toggleFilter}
          onFilterItemPress={this.onFilterItemPress}
        />
      </SafeAreaView>

    );
  }
}