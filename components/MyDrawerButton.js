import React,{Component} from 'react';
import { SafeAreaView, Image } from 'react-native';
import MyButton from './MyButton';
import styles from '../styles';

const sidebarIcon = require('../images/white_list.png');

export default class MyDrawerButton extends Component{
    render = props =>{
        return(
        <SafeAreaView style={styles.navBar}>
            <MyButton
            style={[this.props.style, styles.roundDrawerBtn, {justifyContent:'center'}]}
            onPress={()=>{this.props.navigation.toggleDrawer();}}
            source={sidebarIcon}
            imageStyle={styles.icon}
            />
        </SafeAreaView>);
    }
}