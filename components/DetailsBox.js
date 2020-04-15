import React from 'react';
import { View, Text, Linking, FlatList } from 'react-native';
import { styles, theme, centered, screenWidth } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import AddButton from './AddButton';
import { addToSchedule, rmFromSchedule, itemInSchedule } from '../utils/data-funcs';
import PushNotification from '../utils/notification-services';
import { getFormattedStartDate, isNull, notNull, formatDateForDetails, formatDate } from '../utils/helper-funcs';

/**
 * Information section (below image) on Date Details page
 * props:
 *  id: { string } -> id for each item in async storage
 *  date: { string } -> date of event (MM/DD/YYYY hh:mm AM||PM)
 *  location { string } -> location of event
 */
export default class DetailsBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inSchedule: false,
            inScheduleArray: Array(JSON.parse(this.props.data.time_and_locations).length).fill(false),
        }
    }


    setButtonState = (data) => {
        let time_and_locations = JSON.parse(data.time_and_locations);
        let inScheduleArray = Array(time_and_locations.length);
        time_and_locations.map(async (item, index) => {
            await itemInSchedule(this.props.id + ":" + index, (value) => {
                inScheduleArray[index] = value;
            });
            if (index == time_and_locations.length - 1) {
                this.setState({ inScheduleArray: inScheduleArray });
            }
        });
    }

    componentDidMount = () => {
        this.setButtonState(this.props.data);
    }

    render = () => {
        const { id, date, data, location, title, videoLink } = this.props;

        return (
            <View style={style.wrapper}>
                <ScrollView contentContainerStyle={style.scroll}>
                    <Text style={style.title}>{title}</Text>
                    <View style={style.buttonsList}>
                        {
                            JSON.parse(data.time_and_locations).map((item, index) => {
                                let inSchedule = this.state.inScheduleArray[index];
                                let displayStartTime = formatDateForDetails(item.time);

                                let searchLocation = "";
                                item.location.split("").map((char) => {
                                    if (char == " ") {
                                        searchLocation += "+";
                                    } else {
                                        searchLocation += char
                                    }
                                })
                                return (
                                    <View key={index} style={style.buttonItem}>
                                        <AddButton
                                            style={[!inSchedule ? style.inScheduleButton : style.notInScheduleButton, style.scheduleButton]}
                                            text={!inSchedule ?
                                                "Add " + displayStartTime + " to schedule"
                                                : "Remove " + displayStartTime + " from schedule"}
                                            onPress={() => {
                                                if (!inSchedule) {
                                                    PushNotification.localNotificationSchedule({
                                                        userInfo: { id: id },
                                                        id: parseInt(id),
                                                        message: title + " is happening soon!",
                                                        date: new Date(formatDate(item.time.split(" to ")[0])),
                                                    });

                                                    addToSchedule(id + ":" + index, (boolValue) => { });
                                                    let arr = this.state.inScheduleArray;
                                                    arr[index] = true;
                                                    this.setState({ inScheduleArray: arr })
                                                } else {
                                                    rmFromSchedule(id + ":" + index, (boolValue) => { });
                                                    let arr = this.state.inScheduleArray;
                                                    arr[index] = false;
                                                    this.setState({ inScheduleArray: arr })
                                                }
                                            }} />
                                        <AddButton style={[!inSchedule ? style.inScheduleLocation : style.notInScheduleLocation, style.locationButton]} text={"Find " + item.location} onPress={() => {
                                            Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + searchLocation + "%2C+Glenn+Falls+%2C+NY");
                                        }} />

                                    </View>
                                )
                            })
                        }
                    </View>
                    {

                        (notNull(videoLink) && videoLink != "") ? (<AddButton text={"Trailer"} onPress={() => {
                            Linking.openURL(videoLink);
                        }} />) : null
                    }

                </ScrollView>
            </View>
        );
    }
}

const style = {
    title: {
        color: theme.buttonAccent,
        fontSize: 25, textAlign: "center",
        textAlignVertical: "center",
    },
    info: {
        color: theme.buttonAccent,
        fontSize: 15, textAlign: "center",
        textAlignVertical: "center",
    },
    wrapper: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: theme.accent,
    },
    scroll: {
        margin: 0,
    },
    buttonsList: {
        flexDirection: "column",
    },
    buttonItem: {
        flexDirection: "row",
    },
    title: {
        color: theme.buttonAccent,
        fontSize: 30,
        textAlign: "center",
        textAlignVertical: "center",
        marginVertical: 10,
    },
    text: {
        color: theme.buttonAccent,
    },
    inScheduleButton: {
        backgroundColor: theme.button,
    },
    notInScheduleButton: {
        backgroundColor: "rgba(150,0,0,1)",
    },
    inScheduleLocation: {
        backgroundColor: "steelblue",
    },
    notInScheduleLocation: {
        backgroundColor: "rgba(100,0,0,1)",
    },
    scheduleButton: {
        width: screenWidth * 0.67,
    },
    locationButton: {
        width: screenWidth * 0.33,
    }
};