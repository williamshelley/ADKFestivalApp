import React,{Component} from 'react';
import {SafeAreaView} from 'react-native';

import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyNavStackButton from '../components/MyNavStackButton';
import InfoSchedule from './InfoSchedule';

const eventData = "Placeholder Data";

export default class HomeView extends Component{
    static navigationOptions= ({navigation}) => {
      return {
        drawerLabel:"Main",
        title:"Main",
        headerLeft: ()=>(
          <MyDrawerButton navigation= {navigation}/>
        ),
      }
    };
    render(){
      return(
        <SafeAreaView style={[styles.screenView,{backgroundColor:"powderblue", alignItems:'center',justifyContent:'center'}]}>
            <MyNavStackButton data={eventData} title= "To Info Schedule" navigation={this.props.navigation} target="InfoSchedule"/>
        </SafeAreaView>
      );
    }
  }