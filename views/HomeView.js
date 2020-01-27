import React,{Component} from 'react';
import {SafeAreaView, View, FlatList, Text, Image} from 'react-native';

import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyNavStackButton from '../components/MyNavStackButton';

const eventData = "Placeholder Data";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    source: require('../images/eye.jpg'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    source: require('../images/person.jpg'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    source: require('../images/swan.jpg'),
  },
];

function Item({ source, title }) {
  return (
    <View style={[styles.eventItems, {alignItems:"center", justifyContent:"center"}]}>
      <Image style={styles.eventItems} source={source}/>
    </View>
  );
}

export default class HomeView extends Component{
    static navigationOptions = ({navigation}) => {
      return {
        drawerLabel:"Main",
        title:"Main",
        headerLeft: ()=>(
          <MyDrawerButton navigation={navigation}/>
        ),
      }
    };
    
    render(){
      return(
        <SafeAreaView style={[styles.container,{backgroundColor:"powderblue"}]}>
            <MyNavStackButton data={eventData} navigation={this.props.navigation} target="InfoSchedule"/>
            <FlatList
            data={DATA}
            contentContainerStyle={{flex:2}}
            numColumns={2}
            renderItem={({ item }) => <Item source={item.source} title={item.title} />}
            keyExtractor={item => item.id}
            />

        </SafeAreaView>
      );
    }
  }