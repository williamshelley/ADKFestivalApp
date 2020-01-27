import React, {Component} from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from '../styles';

export default class MyButton extends Component{
    render(){
        return (
            <TouchableOpacity 
                    style={[this.props.style, {alignItems:'center', justifyContent:'center', borderRadius: 30}]}
                    onPress={this.props.onPress}>
                <Image
                    style={this.props.imageStyle}
                    source={this.props.source}
                ></Image>
            </TouchableOpacity>
        );
    }
}