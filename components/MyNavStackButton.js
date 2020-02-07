import React,{Component} from 'react';
import {SafeAreaView} from 'react-native';
import MyButton from './MyButton';
import styles from '../styles';

export default class MyNavStackButton extends Component{
    render(){
        console.log(this.props.source, ": nav button");
        return(      
        <SafeAreaView>
            <MyButton
            style={styles.headerBtn}
            onPress={()=>{
                this.props.navigation.navigate(
                    this.props.target, 
                    {   
                        title: this.props.title, 
                        data: this.props.data, 
                        source: this.props.source},{title:this.props.eventName});
                    }}
            imageStyle={styles.headerBtn}
            />
        </SafeAreaView>);
    }
}
