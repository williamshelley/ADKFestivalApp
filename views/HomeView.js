import React, { Component } from 'react';
import { SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';

export default class HomeView extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      data: null,
    }
  }

  static navigationOptions = {
    title: "title",
    headerTitle: "title",
  };

  Item = ({ navigation, title, data, source }) => {
    return (
      <TouchableOpacity
        style={[styles.eventItems, { alignItems: "center", justifyContent: "center" }]}
        onPress={() => navigation.navigate("InfoSchedule", { title:title, data: data, source: source })}>
        <Image style={styles.eventItems} source={{ uri: source }} />
      </TouchableOpacity>
    );
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <MyDrawerButton navigation={navigation} />
      ),
    }
  };

  componentDidMount(){
      fetch('http://127.0.0.1:5000/', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((responseJson) => {
          let DATA = [];
          for(var i = 0; i < responseJson.sources.length; i++){
            DATA.push({
              id: responseJson.titles[i],
              title: responseJson.titles[i],
              data: responseJson.titles[i],
              source: responseJson.sources[i],
              category: responseJson.category,
            })
          }
          this.setState({data: DATA})

      })
      .catch((error) => {
          console.error(error);
      });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
        <FlatList
          data={this.state.data}
          contentContainerStyle={{ flex: 0 }}
          numColumns={2}
          renderItem={({ item }) => <this.Item
            navigation={this.props.navigation}
            title={item.title}
            data={item.data}
            source={item.source} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}