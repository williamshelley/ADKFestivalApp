import React, { Component } from 'react';
import { SafeAreaView, FlatList, View } from 'react-native';
import IconButton from '../components/IconButton';
import DropdownFilter from '../components/DropdownFilter';
import EventCard from '../components/EventCard';
import styles, { filterIcon, drawerIcon, theme, opacityValue } from '../styles';
import scheduleParams from '../helper-functions/schedule_params';
import { notNull } from '../helper-functions/helpers';

const NUM_COLUMNS = 2;
const fetchLocation = true ? 'http://127.0.0.1:5000/' : null;

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
    fetch(fetchLocation, {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      })
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
          let day = scheduleParams.DAYS[i % scheduleParams.DAYS.length];
          let numHours = scheduleParams.END_HOUR - scheduleParams.START_HOUR;
          let startHour = scheduleParams.START_HOUR + (i % numHours);
          let endHour = startHour + 1;
          let location = scheduleParams.LOCATIONS[i % scheduleParams.LOCATIONS.length];
          let storageKey = location;

          ALL_DATA.push({
            title: responseJson.titles[i],
            category: responseJson.categories[i],
            source: responseJson.sources[i],
            description: responseJson.descriptions[i],
            id: responseJson.id_list[i],


            location: location,
            storageKey: storageKey,
            date: {
              day: day,
              month: 2,
              year: scheduleParams.YEAR,
              startTime: startHour, //military time
              endTime: endHour,
            },
          })
        }
        this.setState({ categories: CATEGORIES, allData: ALL_DATA, currentData: ALL_DATA });
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

  disableFilter = () => {
    this.setState({ toggleFilter: false });
  }

  onFilterItemPress = (item) => {
    this.setState({ toggleFilter: !this.state.toggleFilter, title: item.category, currentData: this.setCurrentDisplay(item.category) });
    this.props.navigation.setParams({ headerTitle: item.category });
  }

  componentDidMount() {
    if (notNull(fetchLocation)){
      this.fetchData();
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
            contentContainerStyle={[styles.scrollContainer,{
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