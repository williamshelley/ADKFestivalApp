import React from 'react';
import { Text,View } from 'react-native';
import { styles } from '../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Add/Remove items from schedule button (used on Details page)
 *  onPress: { function }
 *  text: { string } -> main text displayed by button
 */
export default AddButton = ({ onPress, text }) => (
    <TouchableOpacity
        style={[styles.addButtonContainer,{flexDirection:"row"}]}
        onPress={onPress}>
        <View style={{flex:1}}>
            <Text style={styles.addButtonText}>{text}</Text>
        </View>
    </TouchableOpacity>
);