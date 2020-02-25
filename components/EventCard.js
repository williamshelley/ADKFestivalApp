import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles, { emptyImage } from '../styles';
import { isNull, notNull } from '../helper-functions/helpers';

/**
 * Front page event card
 * props:
 *  navigation = { navigation }
 *  data = { properties }
 *  target = { string } -> it is the destination navigated to
 *  style = { properties } -> defaults to styles.eventItems
 */
export default EventCard = (props) => {
    let data = props.data;
    let useStyle = isNull(props.style) ? styles.eventItems : props.style
    let imgSource = isNull(data.source) ? emptyImage : { uri: data.source };
    return (
        <TouchableOpacity
            style={useStyle}
            onPress={() => {
                if (notNull(props.target)) {
                    props.navigation.navigate(props.target, { data: data });
                }
            }}>
            <Image style={useStyle} source={imgSource} />
            <View style={styles.imgTextWrapper}>
                <View style={styles.topRightCornerContainer}>
                    {props.children}
                </View>
                <Text style={styles.imgText}>
                    {data.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};