import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

/**
 * Drawer Navigator Item
 * props:
 *  title = { string }
 *  onPress = { function }
 */
export default DrawerItem = ({ title, onPress }) => (
    <TouchableOpacity
        style={styles.drawerItem}
        onPress={onPress}>
        <Text style={styles.drawerItemText}>{title}</Text>
    </TouchableOpacity>
);