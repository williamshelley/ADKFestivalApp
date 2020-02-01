import React, { Component } from 'react';
import { SafeAreaView, FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  Item = ({ navigation, title, data, source, description }) => {
    if (title != null) {
      return (
        <TouchableOpacity
          style={[styles.eventItems, { alignItems: "center", justifyContent: "center" }]}
          onPress={() => navigation.navigate("InfoSchedule", {
            title: title,
            data: data,
            source: source,
            description: description
          })}>
          <Image style={[styles.eventItems]} source={{ uri: source }} />
          <View style={styles.imgTextWrapper, [{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-start', alignItems: 'center' }]}>
            <Text style={styles.imgText}>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("title", "Bad Title"),
      headerLeft: () => (
        <MyDrawerButton navigation={navigation} />
      ),
    }
  };

  render() {
    let data = this.props.navigation.getParam("data", null);
    let title = this.props.navigation.getParam("title", null);
    
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
        <FlatList
          data={data}
          contentContainerStyle={{ flex: 0 }}
          numColumns={2}
          renderItem={({ item }) => <this.Item
            navigation={this.props.navigation}
            title={item.title}
            data={item.data}
            source={item.source}
            description={item.description} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}