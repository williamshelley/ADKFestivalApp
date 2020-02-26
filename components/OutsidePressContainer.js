import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styles from '../styles';

/**
 * Background view that will close extended items (ie drawer navigator or sidebar filter)
 * props:
 *  onPress: { function }
 *  children: accepts nested views
 */
export default OutsidePressContainer = (props) => (
    <TouchableWithoutFeedback
        style={styles.container}
        onPress={props.onPress}>
        <View style={{
            position:"absolute",
            top:0,bottom:0,left:0,right:0,
        }}>
            {props.children}
        </View>
    </TouchableWithoutFeedback>
);