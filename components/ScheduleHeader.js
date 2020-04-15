import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { styles } from '../styles';

export default ScheduleHeader = ({ data, style, images}) => (
    <View style={[style, styles.scheduleHeader, {flexDirection:"row"}]}>
            {data.map((item, index) => (
                <ImageBackground key={index} style={styles.scheduleHeaderItem} source={{uri: images[index]}}>
                    <Text style={styles.scheduleHeaderText}>{item}</Text>
                </ImageBackground>
            ))}
    </View>
);