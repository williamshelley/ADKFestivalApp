import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AsynchStorage from '@react-native-community/async-storage';
import scheduleParams, { BLANK_DATA, getIndex, dateAsString } from '../helper-functions/schedule_params';
import { storeItem, convertFromMilitaryTime, OFFLINE_STORAGE_KEY, retrieveData } from '../helper-functions/storage_functions';
import { notNull, isNull } from '../helper-functions/helpers';
import { scheduleNotification } from '../helper-functions/notification_services';
import { EMPTY_DATA, EMPTY_SCHED_DATA } from '../helper-functions/data';

class InfoSchedule extends Component {
    constructor(props) {
        super(props);

        this.item = this.state = {
            data: this.props.navigation.getParam('data', EMPTY_DATA),
            inSchedule: false,
            col: null,
            row: null,
        };

    }

    addItemToSchedule = (item) => {
        console.log(this.state.data.storageKey);
        scheduleNotification({ message: this.state.data.title, date: Date.now() + (5*1000)});
        AsynchStorage.getItem(this.state.data.storageKey).then((data) => {
            let index = getIndex({ xcol: item.col, yrow: item.row });
            let DATA = null;
            if (notNull(data)) {
                DATA = JSON.parse(data);
            } else if (scheduleParams.LOCATIONS.includes(this.state.data.storageKey)) {
                DATA = BLANK_DATA;
            }
            storeItem(DATA, data, item, index);
        });
        this.setState({ inSchedule: true });
    }

    addButton = () => {
        if (!this.state.inSchedule) {
            return (
                <TouchableOpacity
                    style={[styles.addScheduleBtn, { height: "50%", flex: 1, flexDirection: "row" }]}
                    onPress={() => { this.addItemToSchedule(this.state.data); }}>
                    <View style={[styles.addScheduleBtn, { flex: 1, flexDirection: "row", paddingRight: 10 }]}>
                        <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "center" }]}>Add Event</Text>
                        <Image style={[styles.icon, { flex: 0.1, paddingRight: 10 }]} source={require("../images/white_addSchedule.png")} />
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }

    selfInSchedule = (data) => {
        let index = getIndex({ xcol: this.state.data.col, yrow: this.state.data.row });
        let item = data[index];
        return notNull(item.title) && this.state.data.title == item.title;
    }

    setData = (data) => {
        this.setState({ data: data });
    }

    componentDidMount() {
        //retrieveData(OFFLINE_STORAGE_KEY, )
        AsynchStorage.getItem(this.state.data.storageKey).then((data) => {
            if (notNull(data)) {
                let DATA = JSON.parse(data);
                if (this.selfInSchedule(DATA)) {
                    this.setState({ inSchedule: true });
                }
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "flex-start" }]}>
                <Image style={styles.infoImgView} source={{ uri: this.state.data.source }} />

                <View style={[styles.container, { flex: 1, flexDirection: "row", }]}>
                    <View style={[styles.imgTitle, { flex: 1, flexDirection: "column", height: "100%" }]}>
                        <Text style={{
                            flex: 1, flexDirection: "column",
                            color: "white", fontSize: 20,
                            textAlign: "left", paddingLeft: 10,
                        }}>
                            {this.state.data.date.weekDay}, {this.state.data.date.mm} {this.state.data.date.dd} {this.state.data.date.yyyy}
                        </Text>
                        <Text style={{
                            flex: 1, flexDirection: "column",
                            color: "white", fontSize: 16,
                            textAlign: "left", paddingLeft: 10,
                        }}>
                            {convertFromMilitaryTime(this.state.data.date.hour)}-{convertFromMilitaryTime(this.state.data.date.endTime)}
                        </Text>
                    </View>
                    <this.addButton />
                </View>

                <View style={[styles.imgTitle, { flex: 1, height: "100%", flexDirection: "row" }]}>
                    <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "center", paddingLeft: 10, }]}>{this.state.data.location}</Text>
                </View>
            </SafeAreaView>
        );
    };
}

class InfoAbout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('data', null),
        }
    }
    render() {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
                <Image style={styles.infoImgView} source={{ uri: this.state.data.source }} />
                <ScrollView contentStyle={styles.descriptionView}>
                    <Text style={styles.descriptionText}>{this.state.data.description}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    };
};

const TabNavigator = createMaterialTopTabNavigator({
    Schedule: InfoSchedule,
    About: InfoAbout,
}, {
    tabBarOptions: {
        style: styles.middleTabBar,
    },
}
);

export default TabNavigator;