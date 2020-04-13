import React from 'react';
import { View, Text, Linking, FlatList } from 'react-native';
import { styles, theme, centered } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import AddButton from './AddButton';
import { addToSchedule, rmFromSchedule, itemInSchedule } from '../utils/data-funcs';
import PushNotification from  '../utils/notification-services';
import { getFormattedStartDate, isNull, notNull, formatDateForDetails, formatDate } from '../utils/helper-funcs';

/**
 * Information section (below image) on Date Details page
 * props:
 *  id: { string } -> id for each item in async storage
 *  date: { string } -> date of event (MM/DD/YYYY hh:mm AM||PM)
 *  location { string } -> location of event
 */
export default class DetailsBox extends React.Component {
    constructor(props){
        super(props)
        this.state={
            inSchedule: false,
            inScheduleArray: Array(JSON.parse(this.props.data.time_and_locations).length).fill(false),
        }
    }


    setButtonState = (data) => {
        let time_and_locations = JSON.parse(data.time_and_locations);
        let inScheduleArray = Array(time_and_locations.length);
        time_and_locations.map( async (item, index)=>{
            await itemInSchedule(this.props.id + ":" + index, (value)=>{
                inScheduleArray[index] = value;
            });
            if (index == time_and_locations.length - 1){
                this.setState({inScheduleArray: inScheduleArray});
            }
        });
    }

    componentDidMount =  () => {
         this.setButtonState(this.props.data);
    }

    render = () => {
        const { id, date, data, location, title, videoLink } = this.props;
        const numDates = date.split(",").length;
        let searchLocation = "";
        location.split("").map((char)=>{
            if (char == " "){
                searchLocation += "+";
            } else{
                searchLocation += char
            }
        })
        return (
            <View style={styles.detailsDateWrapper}>
                <ScrollView contentContainerStyle={styles.detailsTextScroll}>
                    <View style={[centered, styles.addButtonContainer, {flex: 0.5 * numDates, backgroundColor: theme.accent}]}>
                        <Text style={[style.title, {marginVertical: "5%"}]}>{title}</Text>
                        {
                            JSON.parse(data.time_and_locations).map((item, index)=>{
                                let inSchedule = this.state.inScheduleArray[index];
                                return <AddButton key={index} 
                                    text={!inSchedule ? 
                                            "Add " + item.time + " at " + item.location 
                                            : "Remove from schedule"} 
                                    onPress={()=>{
                                        if (!inSchedule){
                                            PushNotification.localNotificationSchedule({
                                                userInfo:{id: id},
                                                id: parseInt(id),
                                                message: title + " is happening soon!",
                                                date: new Date(formatDate(item.time.split(" to ")[0])),
                                            });
                                        
                                        addToSchedule(id + ":" + index, (boolValue)=>{});
                                        let arr = this.state.inScheduleArray;
                                        arr[index] = true;
                                        this.setState({inScheduleArray: arr})
                                    } else {
                                        rmFromSchedule(id + ":" + index, (boolValue)=>{});
                                        let arr = this.state.inScheduleArray;
                                        arr[index] = false;
                                        this.setState({inScheduleArray: arr})
                                    }
                                }}/>
                            })
                        }
                    </View>
                    {
                        (notNull(videoLink) && videoLink != "") ? (<AddButton text={"Trailer"} onPress={()=>{
                            Linking.openURL(videoLink);
                        }}/>) : null
                    }

                </ScrollView>
            </View>
        );
    }
}

const style={
    title:{ color: theme.buttonAccent, 
        fontSize: 25, textAlign: "center", 
        textAlignVertical: "center" },
    info:{ color: theme.buttonAccent, 
        fontSize: 15, textAlign: "center", 
        textAlignVertical: "center" },
};