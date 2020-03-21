import React from 'react';
import { View, Text, Linking } from 'react-native';
import { styles, theme, centered } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import AddButton from './AddButton';
import { addToSchedule, rmFromSchedule, itemInSchedule } from '../utils/data-funcs';
import PushNotification from  '../utils/notification-services';
import { getFormattedStartDate } from '../utils/helper-funcs';

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
        }
    }
    setButtonState = (inSchedule) => {
        this.setState({ inSchedule: inSchedule });
    }

    componentDidMount = async () => {
        await itemInSchedule(this.props.id, this.setButtonState);
    }

    render = () => {
        const { id, date, location, title } = this.props;
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
                    <View style={[centered, styles.addButtonContainer, {flex: 0.5, backgroundColor: theme.accent}]}>
                        <Text style={style.title}>{title}</Text>
                        <Text style={style.info}>{date}</Text>
                    <Text style={style.info}>{location}</Text>
                    </View>

                    <AddButton text={this.state.inSchedule ? "Remove from schedule" : "Add to schedule"} onPress={() => {
                        if (!this.state.inSchedule){
                            PushNotification.localNotificationSchedule({
                                userInfo:{id: id},
                                id: parseInt(id),
                                message: title + " is happening soon!",
                                date: new Date(getFormattedStartDate(date)),
                            });
                            addToSchedule(id, this.setButtonState);
                        } else {
                            rmFromSchedule(id, this.setButtonState);
                        }
                    }} />
                    <AddButton text={"Directions"} onPress={()=>{
                        Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + searchLocation + "%2C+Glenn+Falls+%2C+NY");
                    }}/>
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