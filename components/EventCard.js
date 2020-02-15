import React from 'react';
import {TouchableOpacity,Image,View,Text} from 'react-native';
import styles from '../styles';

/**
 * Front page event card
 * props:
 *  navigation = { navigation }
 *  data = { array }
 *  target = { string } -> it is the destination navigated to
 */
export default EventCard = ({ navigation, data, target }) => {
    return (
        <TouchableOpacity
            style={[styles.eventItems, { alignItems: "center", justifyContent: "center" }]}
            onPress={() => navigation.navigate(target, {
                title: data.title,
                source: data.source,
                description: data.description
            })}>
            <Image style={[styles.eventItems]} source={{ uri: data.source }} />
            <View style={styles.imgTextWrapper}>
                <Text style={styles.imgText}>{data.title}</Text>
            </View>
        </TouchableOpacity>
    );
};