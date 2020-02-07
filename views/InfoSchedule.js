import React,{Component} from 'react';
import {SafeAreaView,View,Text,Image,YellowBox,TouchableOpacity} from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyScheduleButton from '../components/MyScheduleButton';
import { ScrollView } from 'react-native-gesture-handler';

YellowBox.ignoreWarnings(["Warning: Failed prop type: Invalid prop `source` supplied to `Image`."]);

export default class InfoSchedule extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam("title","InfoSchedule"),
            headerTitleStyle: styles.headerText,
            headerStyle: styles.headerBar,
            headerRight: () => (
                <MyScheduleButton navigation={navigation} target="Schedule"/>
            ),
        };
    };

    render(){
        
        let title = this.props.navigation.getParam('title', 'Bad Title');
        let source = this.props.navigation.getParam('source', 'Bad Image');
        let description = this.props.navigation.getParam("description", "Bad Description");
        return(
            <SafeAreaView title={title} style={[styles.testScreenView, {backgroundColor:'gray'}]}>
                <Image style={styles.infoImgView} source={{uri: source}}/>
                <View style={styles.descriptionView}>
                    <ScrollView style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    };
}