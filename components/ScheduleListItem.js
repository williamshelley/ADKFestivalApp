import React from 'react';
import { View, Text } from 'react-native';
import { notNull, parseDate, parseTime, parseDateFromArr, arrayifyDate, getDatePosition, getFormattedStartDate } from '../utils/helper-funcs';
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

    isCorrectSection = (data) => {
        const props = this.props;
        parsedDate = parseDate(data, props.tab);
        let correctTab = false;
        let numPerDay = 0;
        let indices = [];
        if (notNull(data)) {
            const dateArr = arrayifyDate(data);
            dateArr.map((timeStr, index)=>{
                let status = getDatePosition(timeStr);
                if (props.tab == status.day){
                    indices.push(index);
                    numPerDay++;
                }
            });
            correctTab = numPerDay > 0;
        }
        return {correctTab: correctTab, numPerDay: numPerDay, dateIndices: indices};
    }

    stateCallback = (data) => {
        const parsed = JSON.parse(data)
        this.setState({ data: parsed, shouldRender: true})
    }

    componentDidMount = async () => {
        await getItem(this.state.id, this.stateCallback);
    }

    render = () => {
        const props = this.props;
        
        const rmIconStyle = notNull(props.rmOnPress) && notNull(this.state.data) ? styles.rmIcon : { width: 0, height: 0 };
        const height = 100;
        if (this.state.shouldRender) {
            const date = this.state.data.date;
            const dateArr = date.split(",")
            let time = parseDateFromArr(dateArr, props.dateIndex);

            return (
                <View style={[props.style, 
                { width: screenWidth - 10, flexDirection: "row", height: height, margin: 5}]}>
                    <View style={[styles.eventCard, { justifyContent: "center", borderRadius: 0, 
                            borderWidth: 0, flex: 1, height:height,backgroundColor: theme.lightOverlay}]}>
                        <Text style={[styles.detailsDateText]}>{parseTime(time[0])}</Text>
                        <Text style={[styles.detailsDateText, { margin: 0 }]}>to</Text>
                        <Text style={[styles.detailsDateText]}>{parseTime(time[1])}</Text>
                    </View>
                    <EventCard style={{ flex: 3,height:height, alignItems: "center",  
                        backgroundColor: theme.overlay}}
                        textStyle={{alignSelf:"center"}}
                        backgroundStyle={{borderRadius: 0, borderWidth: 0}}
                        imageStyle={{ resizeMode: "contain" }} data={this.state.id}
                        navigation={props.navigation} target={TARGET}>
                        <IconButton style={[rmIconStyle, { alignSelf: "center", top:"-100%"}]} 
                            source={rmIcon}
                            onPress={() => { rmFromSchedule(this.state.id, props.rmOnPress) }} />
                    </EventCard>
                </View>
            );
        } else return null;

    }
}