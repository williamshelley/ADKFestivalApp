import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

/**
 * Button with icon size and image
 * props:
 *  onPress = { function }
 *  source = { string }
 */
export default IconButton = ({ onPress, source }) => {
    return (
        <TouchableOpacity
            style={styles.icon}
            onPress={onPress}>
            <Image
                style={styles.icon}
                source={source}
            ></Image>
        </TouchableOpacity>
    );
}