import React from 'react';
import { Text,View } from 'react-native';
import { styles, theme, screenWidth } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Add/Remove items from schedule button (used on Details page)
 *  onPress: { function }
 *  text: { string } -> main text displayed by button
 */
export default AddButton = ({ onPress, text, style, children, textStyle }) => (
    <TouchableOpacity
        style={[container, style]}
        onPress={onPress}>
            <Text style={[defaultTextStyle, textStyle]}>{text}</Text>
            {children}
    </TouchableOpacity>
);

const container = {
    borderBottomWidth: 2,
    borderColor: "black",
    backgroundColor: theme.button,
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    height:75,
}


const defaultTextStyle = {
    color: theme.buttonAccent,
    textAlign: "center",
    textAlignVertical: "center",
}