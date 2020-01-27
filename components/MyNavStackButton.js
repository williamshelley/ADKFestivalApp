import React,{Component} from 'react';
import {SafeAreaView} from 'react-native';
import MyButton from './MyButton';
import styles from '../styles';

export default class MyNavStackButton extends Component{
    render = props =>{
        return(      
        <SafeAreaView>
            <MyButton
            style={styles.roundButton}
            onPress={()=>{this.props.navigation.navigate(this.props.target, {data: this.props.data});}}
            imageStyle={styles.roundButton}
            />
        </SafeAreaView>);
    }
}

