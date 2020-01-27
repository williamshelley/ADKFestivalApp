import React,{Component} from 'react';
import {
    SafeAreaView,
} from 'react-native';
import MyButton from './MyButton';
import styles from '../styles';

export default class MyDrawerButton extends Component{
    render = props =>{
        return(      
        <SafeAreaView style={styles.navBar}>
            <MyButton
            style={styles.roundDrawerBtn}
            title="Toggle Drawer"
            textStyle={styles.statBarWhiteText}
            onPress={()=>{this.props.navigation.toggleDrawer();}}
            />
        </SafeAreaView>);
    }
}