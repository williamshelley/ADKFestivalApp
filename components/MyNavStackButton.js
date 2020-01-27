import React,{Component} from 'react';
import {
    SafeAreaView,
} from 'react-native';
import MyButton from './MyButton';
import styles from '../styles';

export default class MyNavStackButton extends Component{
    render = props =>{
        return(      
        <SafeAreaView>
            <MyButton
            style={styles.roundButton}
            title={this.props.title}
            textStyle={styles.bigWhiteText}
            onPress={()=>{this.props.navigation.navigate(this.props.target, {data: this.props.data});}}
            />
        </SafeAreaView>);
    }
}

