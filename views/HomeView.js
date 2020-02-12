import React, { Component } from 'react';
import {
  Platform,
  UIManager,
  ImageBackground,
  SafeAreaView, FlatList,
  Image, TouchableOpacity,
  View, Text, LayoutAnimation,
} from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';

const NUM_COLUMNS = 2;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      categories: null,
      allData: null,
      homeData: null,
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
        <MyDrawerButton navigation={navigation} />
      ),
      headerRight: () => (
        <SafeAreaView style={styles.navBar}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              params.toggleFilter();
            }}>

            <Image style={styles.headerBtn} source={require("../images/white_filter.png")} />

          </TouchableOpacity>
        </SafeAreaView>
      ),
    }
  };

  fetchData = () => {
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
              id: responseJson.id_list[i]+responseJson.categories[i],
              category: responseJson.categories[i],
            });
          }
        }
        this.setState({ categories: DATA, allData: ALL_DATA, homeData: ALL_DATA });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  setHomeData = (nextTitle) => {
    console.log("next screen title: ", nextTitle);
    let HOME_DATA = []
    for (var i = 0; i < this.state.allData.length; i++) {
      if (this.state.allData[i].category == nextTitle) {
        HOME_DATA.push(this.state.allData[i]);
      }
    }
    this.setState({ homeData: HOME_DATA });
    return HOME_DATA;
  }

  CategoryButton = ({ navigation, title }) => {
    if (title != null) {
      return (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => {
            this.setState({ title: title, homeData: this.setHomeData(title) });
            this.toggleFilter();
            navigation.setParams({ headerTitle: title });
          }}>
          <Text style={styles.medWhiteText}>{title}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  toggleFilter = () => {
    this.setState({ toggleFilter: !this.state.toggleFilter });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  Filter = () => {
    if (this.state.toggleFilter) {
      return (
        <SafeAreaView style={styles.categoryPicker}>
          {
            <FlatList
              data={this.state.categories}
              contentContainerStyle={{ flex: 0, justifyContent: "flex-start" }}
              numColumns={1}
              renderItem={({ item }) => <this.CategoryButton
                navigation={this.props.navigation}
                title={item.category} />}
              keyExtractor={item => item.id}
            />
          }
        </SafeAreaView>
      );
    }
    else {
      return null;
    }
  }

  EventItem = ({ navigation, title, source, description }) => {
    if (title != null) {
      return (
        <TouchableOpacity
          style={[styles.eventItems, { alignItems: "center", justifyContent: "center" }]}
          onPress={() => navigation.navigate("InfoSchedule", {
            title: title,
            source: source,
            description: description
          })}>
          <Image style={[styles.eventItems]} source={{ uri: source }} />
          <View style={styles.imgTextWrapper}>
            <Text style={styles.imgText}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  FilterBtn = () => {
    return (
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => {
          this.setState({ toggleFilter: !this.state.toggleFilter });
        }}>

        <Image style={styles.headerBtn} source={require("../images/white_filter.png")} />

      </TouchableOpacity>
    );
  }

  componentDidMount() {
    this.fetchData();
    this.props.navigation.setParams({
      toggleFilter: this.toggleFilter
    });
  }

  render() {
    let data = this.state.homeData;
    if (data != null) {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={require("../images/swan.jpg")} style={styles.container}></ImageBackground>
          <this.Filter />
          
          <FlatList
            data={data}
            contentContainerStyle={{ flex: 0 }}
            numColumns={NUM_COLUMNS}
            renderItem={({ item }) => <this.EventItem
              navigation={this.props.navigation}
              title={item.title}
              source={item.source}
              description={item.description} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      );
    }
    else {
      return null;
    }
  }
}