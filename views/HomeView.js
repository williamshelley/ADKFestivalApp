import React, { Component } from 'react';
import { SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyButton from '../components/MyButton';

const SCREEN_DATA = {
  HeadlinersBG: "red",
  FeaturesBG: "green",
  ShortsBG: "blue",
}

const HEADLINERS_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    source: require('../images/eye.jpg'),
    data: "First Item",
    imgurl: "https://www.adkfilmfestival.org/wp-content/uploads/2019/09/Greener-Grass-e1567895065836-481x410.jpg",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'B',
    source: require('../images/eye.jpg'),
    data: "B",
    imgurl: "https://www.adkfilmfestival.org/wp-content/uploads/2019/09/Badhaai-Ho-higher-res-481x410.jpg",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'C',
    source: require('../images/eye.jpg'),
    data: "C",
    imgurl: "https://www.adkfilmfestival.org/wp-content/uploads/2019/09/Badhaai-Ho-higher-res-481x410.jpg",
  },
];

const SHORTS_DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    source: require('../images/person.jpg'),
    data: "Second Item",
    imgurl: "https://www.adkfilmfestival.org/wp-content/uploads/2019/08/500-e1567536042951-481x410.jpg",
  },
];

const FEATURES_DATA = [

  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    source: require('../images/swan.jpg'),
    data: "Third Item",
    imgurl: "https://www.adkfilmfestival.org/wp-content/uploads/2019/09/camp-wedding-2-481x410.jpeg",
  },
];

function Item({ source, imgurl, navigation, data }) {
  return (
    <TouchableOpacity
      style={[styles.eventItems, { alignItems: "center", justifyContent: "center" }]}
      onPress={() => navigation.navigate("InfoSchedule", { imgurl: imgurl, data: data, source: source })}>
      <Image style={styles.eventItems} source={{ uri: imgurl }} />
    </TouchableOpacity>
  );
}

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      printStr: "Print this",
      data: [],
    }

  }

  getData() {
    
    fetch('http://127.0.0.1:5000/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {console.log(responseJson);})
      .catch((error) => {console.error(error);});
      
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <MyDrawerButton navigation={navigation} />
      ),
    }
  };

  currentScreen = "gray";

  setCurrentScreen(data, bgColor) {
    this.currentScreen = bgColor;
    this.setState({ data: data })
  }

  renderScene() {
    route = this.props.navigation.state.routeName;
    switch (route) {
      case "Headliners":
        this.setCurrentScreen(HEADLINERS_DATA, SCREEN_DATA.HeadlinersBG);
        break;
      case "Features":
        this.setCurrentScreen(FEATURES_DATA, SCREEN_DATA.FeaturesBG);
        break;
      case "Shorts":
        this.setCurrentScreen(SHORTS_DATA, SCREEN_DATA.ShortsBG);
        break;
    };
  }
  UNSAFE_componentWillMount() {
    this.renderScene();
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: this.currentScreen }]}>
        <MyButton style={styles.roundButton} onPress={()=>(this.getData())}></MyButton>
        <FlatList
          data={this.state.data}
          contentContainerStyle={{ flex: 2 }}
          numColumns={2}
          renderItem={({ item }) => <Item
            navigation={this.props.navigation}
            data={item.data}
            imgurl={item.imgurl} />}
          keyExtractor={item => item.id}
        />

      </SafeAreaView>
    );
  }
}