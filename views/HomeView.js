import React, { Component } from 'react';
import { SafeAreaView, FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyScheduleButton from '../components/MyScheduleButton';

const NUM_COLUMNS = 2;

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
          },{title:title})}>
          <Image style={[styles.eventItems]} source={{ uri: source }} />
          {
        
          <View style={styles.imgTextWrapper}>
            <Text style={styles.imgText}>{title}</Text>
          </View>
          
          }
        </TouchableOpacity>
      );
    }
    else {
      return null;
    }
  }

  HeaderBtn = () =>{

  };

  static navigationOptions = ({ navigation }) => {
    let headerTitle = navigation.getParam("title", "Home");
    return {
      headerTitle: headerTitle,
      headerTitleStyle: styles.headerText,
      headerStyle:styles.headerBar,
      headerLeft: () => (
        <MyDrawerButton navigation={navigation} />
      ),
      headerRight: () => (
        //<HeaderButtons 
        //<MyDrawerButton navigation={navigation} style={{alignSelf: "center"}}/>
        <MyScheduleButton navigation={navigation} target="Schedule" headerTitle={headerTitle}/>
      ),
    }
  };

  render() {
    let data = this.props.navigation.getParam("data", null);
    if (data != null){
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: "black" }]}>
        <FlatList
          data={data}
          contentContainerStyle={{ flex: 0 }}
          numColumns={NUM_COLUMNS}
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
    else{
      return(
        <SafeAreaView style={[styles.container,{backgroundColor:"powderblue"}]}>

        </SafeAreaView>
      );
    }
  }
}