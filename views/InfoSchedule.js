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
        data = data.substring(1,data.length-1); //removes the quotation marks
        let title = JSON.stringify(this.props.navigation.getParam('title', 'Bad Title'));
        title = title.substring(1,title.length-1); //removes the quotation marks
        let source = JSON.stringify(this.props.navigation.getParam('source', 'Bad Image'));
        source = source.substring(1,source.length-1); //removes the quotation marks
        return(
            <SafeAreaView title={title} style={[styles.testScreenView, {backgroundColor:'gray'}]}>
                <Image style={styles.infoImage} source={{uri: source}}/>
                <View style={styles.infoAbout}>
                    <Text style={[styles.bigWhiteText, {color:"black"}]}>{data}</Text>
                </View>
            </SafeAreaView>
        );
    };
}