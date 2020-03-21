import React from 'react';
import EventCard from '../components/EventCard';
import { notNull, parseDate } from '../utils/helper-funcs';
import { styles, quarterHourHeight } from '../styles';
import { rmFromSchedule, getItem } from '../utils/data-funcs';
import { _week_ } from '../utils/architecture';

const rmIcon = require("../images/rm-icon.png");
const TARGET = "Details";

export default class ScheduleCard extends EventCard {
    constructor(props) {
        super(props);
        const item = notNull(this.props.data.item) ? this.props.data.item : this.props.item;
        const id = notNull(item) ? item : this.props.data;
        this.state = {
            data: [],
            id: id,
        }
    }

    stateCallback = (data) => {
        this.setState({ data: JSON.parse(data) })
    }

    componentDidMount = async () => {
        await getItem(this.state.id, this.stateCallback);
    }

    getItemStatus = (data) => {
        const props = this.props;
        const category = notNull(props.tab) ? props.tab : null;

        parsedDate = parseDate(data, props.tab);
        
        return {
            correctColumn: parsedDate.day == category,
            itemHeight: Math.abs(quarterHourHeight * parsedDate.durationInQuarters),
            itemPosition: quarterHourHeight * parsedDate.startInQuarters,
        };
    }

    isCorrectSection = (data) => {
        const location = notNull(this.props.column) ? this.props.column : null;
        const useLocation = notNull(data) && notNull(data.location) ? this.state.data.location : null;
        return location == useLocation;
    }

    render = () => {
        const props = this.props;
        const data = this.state.data;
        const rmIconStyle = notNull(props.rmOnPress) && notNull(data) ? styles.rmIcon : { width: 0, height: 0 };
        const item = this.getItemStatus(data);
        const r = String(Math.random() * 255);
        const g = String(Math.random() * 255);
        const b = String(Math.random() * 255);
        if (item.correctColumn && this.isCorrectSection(data)) {
            return (
                <EventCard category={props.tab} data={props.data}
                    rmOnPress={props.rmOnPress} navigation={props.navigation} target={TARGET}
                    imageStyle={{resizeMode: "contain"}}
                    style={[styles.scheduleItem, {
                        backgroundColor: "rgba("+r+","+g+","+b+",1)",
                        position: "absolute",
                        top: item.itemPosition,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        marginLeft:2,
                        height: item.itemHeight,
                    }]}>
                    <IconButton style={[rmIconStyle,{alignSelf:"flex-end", justifyContent:"flex-start"}]} source={rmIcon}
                        onPress={() => { rmFromSchedule(this.state.id, props.rmOnPress) }} />
                </EventCard>
            );
        } else {
            return null
        }
    }
}