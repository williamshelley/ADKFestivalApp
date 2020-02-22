import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import styles from '../styles';

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
export default class EventCard extends React.Component {
    render() {
        let target = this.props.target;
        let data = this.props.data;
        let useStyle = (this.props.style == null) ? styles.eventItems : this.props.style
        let imgSource = (data.source == null 
                        || data.source == "" 
                        || data.source == undefined) 
                        ? styles.emptySource : { uri: data.source };
        return (
            <TouchableOpacity
                style={useStyle}
                onPress={() => {
                    if (target != null && target != undefined && target != "") {
                        this.props.navigation.navigate(target,
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
                        {this.props.children}
                    </View>
                    <Text style={styles.imgText}>
                        {data.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
};