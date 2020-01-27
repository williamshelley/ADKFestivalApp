import React, {Component} from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default class MyButton extends Component{
    render(){
        return (
            <TouchableOpacity 
                style={[this.props.style, {alignItems:'center', justifyContent:'center', borderRadius: 30}]}
                onPress={this.props.onPress}>
                <Text style={[this.props.textStyle, {alignSelf:'center', justifyContent:'center'}]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}