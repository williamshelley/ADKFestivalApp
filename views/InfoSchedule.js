import React,{Component} from 'react';
import {SafeAreaView,View,Text,Image,YellowBox} from 'react-native';

import styles from '../styles';

YellowBox.ignoreWarnings(["Warning: Failed prop type: Invalid prop `source` supplied to `Image`."]);
export default class InfoSchedule extends Component{
    static navigationOptions = ({navigation}) => {
        return {
            drawerLabel:"InfoSchedule",
            headerTitle: navigation.state.routeName,
        };
    };
    render(){
        
        let data = JSON.stringify(this.props.navigation.getParam('data', 'Bad Data'));
        let title = JSON.stringify(this.props.navigation.getParam('title', 'Bad Title'));
        let imgurl = JSON.stringify(this.props.navigation.getParam('imgurl', 'Bad Image'));
        imgurl = imgurl.substring(1,imgurl.length-1); //removes the quotation marks
        return(
            <SafeAreaView title={title} style={[styles.testScreenView, {backgroundColor:'gray'}]}>
                <Image style={styles.infoImage} source={{uri: imgurl}}/>
                <View style={styles.infoAbout}>
                    <Text style={styles.bigWhiteText}>{data}</Text>
                </View>
            </SafeAreaView>
        );
    };
}