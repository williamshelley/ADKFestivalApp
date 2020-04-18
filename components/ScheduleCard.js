import React from 'react';
import EventCard from '../components/EventCard';
import { notNull, formatDate } from '../utils/helper-funcs';
import { styles, quarterHourHeight, theme } from '../styles';
import { rmFromSchedule, getItem } from '../utils/data-funcs';
import { _week_ } from '../utils/architecture';

const rmIcon = require("../images/rm-icon.png");
const TARGET = "Details";

export default class ScheduleCard extends EventCard {
    constructor(props) {
        super(props);
        const item = notNull(this.props.data.item) ? this.props.data.item : this.props.item;
        const id = notNull(item) ? item : this.props.data;
        this._isMounted = false;
        this.state = {
            data: [],
            id: id,
            height: 0,
            yPos: 0,
        }
    }

    isCorrectTab = (dateStr) => {
        if (notNull(dateStr)){
            let date = new Date(formatDate(dateStr));
            let day = date.getUTCDay();
            return this.props.tab == _week_[day];
        }
        return false
    }

    isCorrectColumn = (location) => {
        if (notNull(location)){
            return this.props.column == location;
        }
        return false;
    }

    stateCallback = (data) => {
        const parsed = JSON.parse(data)
        const time_and_locs = JSON.parse(parsed.time_and_locations);
        const time_loc_json = time_and_locs[this.props.dateIndex];
        const startTime = time_loc_json.time.split(" to ")[0];
        const endTime = time_loc_json.time.split(" to ")[1];
        let correctTab = this.isCorrectTab(startTime);
        let correctCol = this.isCorrectColumn(time_loc_json.location);
        let shouldRender = correctTab && correctCol;

        let startDate = new Date(formatDate(startTime));
        let endDate = new Date(formatDate(endTime));
        
        let startY = startDate.getUTCHours()*quarterHourHeight + startDate.getUTCMinutes();
        let endY = endDate.getUTCHours()*quarterHourHeight + endDate.getUTCMinutes();
        this._isMounted && this.setState({ 
            data: parsed, 
            shouldRender: shouldRender,
            height: endY-startY,
            yPos: startY,
         })
    }

    componentDidMount = async () => {
        this._isMounted = true;
        await getItem(this.state.id, this.stateCallback);
    }
    componentWillUnmount(){
        this._isMounted = false;
    }

    render = () => {
        const props = this.props;
        const data = this.state.data;
        const rmIconStyle = notNull(props.rmOnPress) && notNull(data) ? styles.rmIcon : { width: 0, height: 0 };
        if (this.state.shouldRender) {
            return (
                <EventCard category={props.tab} data={props.data}
                    rmOnPress={props.rmOnPress} navigation={props.navigation} target={TARGET}
                    imageStyle={{resizeMode: "contain"}}
                    style={[styles.scheduleItem, {
                        backgroundColor: theme.accent,
                        position: "absolute",
                        top: this.state.yPos,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        marginLeft:2,
                        height: this.state.height,
                    }]}>
                    <IconButton style={[rmIconStyle,{alignSelf:"flex-end", justifyContent:"flex-start"}]} source={rmIcon}
                        onPress={() => { rmFromSchedule(this.state.id + ":" + this.props.dateIndex, props.rmOnPress) }} />
                </EventCard>
            );
        } else {
            return null
        }
    }
}