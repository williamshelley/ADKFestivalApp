import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import styles from '../styles';

export default ScheduleItem = ({ style, onPress, item }) => {
    let useStyle = styles.sectionContainer;
    if (style != null) {
        useStyle = style;
    }
    if (item.row < 0 && item.col >= 0) {
        useStyle = styles.headerSectionContainer;
    }
    else if (item.row < 0 && item.col < 0) {
        useStyle = styles.cornerSectionConteiner;
    }
    return (
        <TouchableOpacity
            style={useStyle}
            onPress={onPress}>
            <Text style={styles.sectionData}>{item.title}</Text>
        </TouchableOpacity>
    );
};