import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { notNull } from '../helper-functions/helpers';

/**
 * Button with icon size and image
 * props:
 *  onPress = { function }
 *  source = { string }
 */
export default IconButton = ({ onPress, source, style }) => {
    let useStyle =  notNull(style) ? style : styles.icon;
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