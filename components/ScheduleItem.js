import React from 'react';
import styles from '../styles';
import EventCard from './EventCard';
import IconButton from './IconButton';
import { notNull, isNull } from '../helper-functions/helpers';

const targetScreen = "InfoSchedule";
const rmImage = require("../images/circleX.png");

/**
 * Item in Schedule View (has a sidebar that is always visible and scrolls vertically, 
 * has sticky headers for flatlist)
 * props:
 *  navigaiton = { props.navigation }
 *  style = { properties }
 *  item = { data } must have all requirements for EventCard
 *  onDeletePress = { function } onPress action taken when delete icon pressed
 */
export default ScheduleItem = ({ navigation, style, item, onDeletePress }) => {
    let useStyle = styles.sectionContainer;
    let rmIconStyle = styles.miniIcon;
    let specialStyle = false;
    useStyle = notNull(style) ? style : useStyle;
    if (item.row < 0 && item.col >= 0) {
        useStyle = styles.headerSectionContainer;
        specialStyle = true;
    }
    else if (item.row < 0 && item.col < 0) {
        useStyle = styles.cornerSectionConteiner;
        specialStyle = true;
    }
    specialStyle = (useStyle == styles.sidebarSectionContainer) || specialStyle;
    rmIconStyle = specialStyle || isNull(item.title) ? { width: 0, height: 0 } : rmIconStyle;
    let target = (useStyle != styles.sectionContainer || isNull(item.title)) ? null : targetScreen;
    return (
        <EventCard
            navigation={navigation}
            style={useStyle}
            data={item}
            target={target}>
            <IconButton
                style={rmIconStyle}
                onPress={onDeletePress}
                source={rmImage}
            />
        </EventCard>
    );
};