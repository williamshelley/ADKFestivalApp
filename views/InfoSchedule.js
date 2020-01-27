import React,{Component} from 'react';
import {SafeAreaView,View,Text} from 'react-native';

import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import { TapGestureHandler } from 'react-native-gesture-handler';

export default class InfoSchedule extends Component{
    static navigationOptions = {
        drawerLabel:"InfoSchedule",
        title:"InfoSchedule",
    };
    render(){
        let data = JSON.stringify(this.props.navigation.getParam('data', 'Bad Data'));
        return(
            <SafeAreaView title="Info Schedule" style={[styles.testScreenView, {backgroundColor:'gray'}]}>
                <View style={styles.infoAbout}>
                    <Text style={styles.bigWhiteText}>{data}</Text>
                </View>
            </SafeAreaView>
        );
    };
}
