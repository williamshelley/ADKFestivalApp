import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles, { emptyImage } from '../styles';
import { isNull, notNull } from '../helper-functions/helpers';

/**
 * Front page event card
 * props:
 *  navigation = { navigation }
 *  data = { properties }
 *      title: string,
 *      source: uri/string,
 *      location: string,
 *      date: { properties },
 *          day: string, --> week day
 *          month: int,
 *          year: int,
 *          startTime: int, --> 0-24 hour
 *          endTime: int --> 0-24 ≥ startTime
 *      storageKey: string --> used for async storage
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
                    if (notNull(props.target)){
                        props.navigation.navigate(props.target,
                            {
                                title: data.title,
                                source: data.source,
                                description: data.description,
                                location: data.location,
                                date: data.date,
                                storageKey: data.storageKey,
                            });
                    }
                }
                }>
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