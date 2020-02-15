import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

/**
 * Drawer Navigator Item
 * props:
 *  title = { string }
 *  onPress = { function }
 */
export default DrawerItem = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={onPress}>
            <Text style={styles.medWhiteText}>{title}</Text>
        </TouchableOpacity>
    );
};