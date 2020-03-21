import React from 'react';
import { View, Text } from 'react-native';
import { notNull, parseDate, parseTime } from '../utils/helper-funcs';
import { rmFromSchedule, getItem } from '../utils/data-funcs';
import { _week_, _venue_name_img_separator_ } from '../utils/architecture';
import { styles, theme, clear } from '../styles';
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
        }
    }

    isCorrectSection = (data) => {
        const props = this.props;
        parsedDate = parseDate(data, props.tab);
        let correctTab = false;
        let correctSection = false;
        const section = props.section.split(_venue_name_img_separator_)
        const sectionName = section[0]
        if (notNull(data)) {
            const itemStatus = parseDate(data, props.tab);
            correctTab = props.tab == itemStatus.day;
            correctSection = sectionName == data.location;
        }
        return correctTab && correctSection;
    }

    stateCallback = (data) => {
        const parsed = JSON.parse(data)
        const shouldRender = this.isCorrectSection(parsed);
        this.setState({ data: parsed, shouldRender: shouldRender})
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
            return (
                <View style={[props.style, 
                { width: "100%", flexDirection: "row", height: height, margin: 5}]}>
                    <View style={[styles.eventCard, { justifyContent: "center", borderRadius: 0, 
                            borderWidth: 0, flex: 1, height:height,backgroundColor: theme.lightOverlay}]}>
                        <Text style={[styles.detailsDateText]}>{parseTime(date.split(" to ")[0])}</Text>
                        <Text style={[styles.detailsDateText, { margin: 0 }]}>to</Text>
                        <Text style={[styles.detailsDateText]}>{parseTime(date.split(" to ")[1])}</Text>
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