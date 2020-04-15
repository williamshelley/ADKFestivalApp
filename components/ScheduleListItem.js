import React from 'react';
import { View, Text } from 'react-native';
import { notNull, parseDate, parseTime, parseDateFromArr, arrayifyDate, getDatePosition, getFormattedStartDate, formatDate, getStartTime, getEndTime } from '../utils/helper-funcs';
import { rmFromSchedule, getItem } from '../utils/data-funcs';
import { _week_, _venue_name_img_separator_ } from '../utils/architecture';
import { styles, theme, screenWidth } from '../styles';
import IconButton from './IconButton';
import EventCard from '../components/EventCard';

const rmIcon = require("../images/rm-icon.png");
const TARGET = "Details";

export default class ScheduleListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            id: this.props.data,
            shouldRender: false,
            numPerDay: 0,
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

    stateCallback = (data) => {
        const parsed = JSON.parse(data)
        let shouldRender = this.isCorrectTab(JSON.parse(parsed.time_and_locations)[this.props.dateIndex].time);
        this._isMounted && this.setState({ data: parsed, shouldRender: shouldRender})
    }

    componentDidMount = () => {
        this._isMounted = true;
        getItem(this.state.id, this.stateCallback);
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => {
        const props = this.props;
        let data = this.state.data;
        let time = ""
        if (notNull(data) ){
            let time_and_loc = data.time_and_locations
            if (notNull(time_and_loc)){
                time = JSON.parse(time_and_loc)[this.props.dateIndex].time
            }
        }
        const rmIconStyle = notNull(props.rmOnPress) && notNull(this.state.data) ? styles.rmIcon : { width: 0, height: 0 };
        const height = 100;
        if (this.state.shouldRender && time != "") {
            return (
                <View style={[props.style, 
                { width: screenWidth - 10, flexDirection: "row", height: height, margin: 5}]}>
                    <View style={[styles.eventCard, { justifyContent: "center", borderRadius: 0, 
                            borderWidth: 0, flex: 1, height:height,backgroundColor: theme.lightOverlay}]}>
                        <Text style={[styles.detailsDateText]}>{getStartTime(time)}</Text>
                        <Text style={[styles.detailsDateText, { margin: 0 }]}>to</Text>
                        <Text style={[styles.detailsDateText]}>{getEndTime(time)}</Text>
                    </View>
                    <EventCard style={{ flex: 3,height:height, alignItems: "center",  
                        backgroundColor: theme.overlay}}
                        textStyle={{alignSelf:"center"}}
                        backgroundStyle={{borderRadius: 0, borderWidth: 0}}
                        imageStyle={{ resizeMode: "contain" }} data={this.state.id}
                        navigation={props.navigation} target={TARGET}>
                        <IconButton style={[rmIconStyle, { alignSelf: "center", top:"-100%"}]} 
                            source={rmIcon}
                            onPress={() => { 
                                rmFromSchedule(this.state.id + ":" + this.props.dateIndex, props.rmOnPress) }} />
                    </EventCard>
                </View>
            );
        } else return null;

    }
}