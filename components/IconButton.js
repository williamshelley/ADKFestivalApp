import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

/**
 * Button with icon size and image
 * props:
 *  onPress = { function }
 *  source = { string }
 */
export default IconButton = ({ onPress, source, style }) => {
    let useStyle = (style != null && style != undefined) ? style : styles.icon;
    return (
        <TouchableOpacity
            style={useStyle}
            onPress={onPress}>
            <Image
                style={useStyle}
                source={source}
            ></Image>
        </TouchableOpacity>
    );
}