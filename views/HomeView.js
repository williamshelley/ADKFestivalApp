import React,{Component} from 'react';
import {SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';

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
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'B',
    source: require('../images/eye.jpg'),
    data: "B",
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'C',
    source: require('../images/eye.jpg'),
    data: "C",
  },
];

const SHORTS_DATA = [
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    source: require('../images/person.jpg'),
    data: "Second Item",
  },
];

const FEATURES_DATA = [

  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    source: require('../images/swan.jpg'),
    data: "Third Item",
  },
];

function Item({ source, title, navigation, data }) {
  return (
    <TouchableOpacity 
      style={[styles.eventItems, {alignItems:"center", justifyContent:"center"}]}
      onPress={()=>navigation.navigate("InfoSchedule", {title: '../images/eye.jpg', data: data, source: source})}>
      <Image style={styles.eventItems} source={source}/>
    </TouchableOpacity>
  );
}

export default class HomeView extends Component{
    constructor(props){
      super(props);
      this.state = {
        printStr: "Print this",
        data: [],
      }
      
    }

    static navigationOptions = ({navigation}) => {
      return {
        headerLeft: ()=>(
          <MyDrawerButton navigation={navigation}/>
        ),
      }
    };

    currentScreen = "gray";

    setCurrentScreen(data, bgColor){
      this.currentScreen = bgColor;
      this.setState({data: data})
    }

    renderScene(){
      route = this.props.navigation.state.routeName;
      switch (route){
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
    UNSAFE_componentWillMount(){
      this.renderScene();
    }

    render(){
      return(
        <SafeAreaView style={[styles.container,{backgroundColor:this.currentScreen}]}>
            <FlatList
            data={this.state.data}
            contentContainerStyle={{flex:2}}
            numColumns={2}
            renderItem={({ item }) => <Item 
                                    source={item.source} 
                                    title={item.title} 
                                    navigation={this.props.navigation}
                                    data={item.data}/>}
            keyExtractor={item => item.id}
            />

        </SafeAreaView>
      );
    }
  }