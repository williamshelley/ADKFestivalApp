import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AsynchStorage from '@react-native-community/async-storage';
import scheduleParams from '../helper-functions/scheduleParams';
import { 
    storeData, 
    convertFromMilitaryTime, 
    storageItem 
} from '../helper-functions/storageFunctions';

class InfoSchedule extends Component {
    constructor(props) {
        super(props);

        this.item = this.state = {
            title: this.props.navigation.getParam('title', 'Bad Title'),
            source: this.props.navigation.getParam('source', null),
            location: this.props.navigation.getParam('location', "Bad Location"),
            description: this.props.navigation.getParam('description', 'Bad Description'),
            storageKey: this.props.navigation.getParam('location', ''),
            date: this.props.navigation.getParam('date', {
                day: "Bad Day",
                month: "Bad Month",
                year: "Bad Year",
                startTime: "Bad Start",
                endTime: "Bad End",
            }),
            inSchedule: false,
            col: null,
            row: null,
        };
    }

    addItemToSchedule = (item) => {
        AsynchStorage.getItem(this.state.storageKey).then((data) => {
            if (data != null && data != undefined) {
                if (item.row >= 0 && item.col >= 0) {
                    var DATA = JSON.parse(data);
                    let index = item.row * scheduleParams.DAYS.length + item.col + scheduleParams.DAYS.length;
                    let id = DATA[index].id;
                    DATA[index] = item;
                    DATA[index].id = id;
                    storeData(this.state.storageKey, DATA, data);
                    this.setState({ inSchedule: true });
                    return DATA;
                }
            }
        });
    }

    getColRow = () => {
        let column = null;
        for (var i = 0; i < scheduleParams.DAYS.length; i++) {
            if (this.state.date.day == scheduleParams.DAYS[i]) {
                column = i;
            }
        }
        let row = Math.abs(this.state.date.startTime - scheduleParams.START_HOUR);
        return [column, row];
    }

    addButton = () => {
        if (!this.state.inSchedule) {
            return (
                <TouchableOpacity
                    style={[styles.addScheduleBtn, { height: "50%", flex: 1, flexDirection: "row" }]}
                    onPress={() => {
                        let xy = this.getColRow()
                        this.addItemToSchedule(storageItem({
                            title: this.state.title,
                            source: this.state.source,
                            description: this.state.description,
                            location: this.state.location,
                            date: this.state.date,
                            row: this.state.row,
                            col: this.state.col,
                            storageKey: this.state.storageKey,
                        }));
                    }}
                >
                    <View style={[styles.addScheduleBtn, { flex: 1, flexDirection: "row", paddingRight: 10 }]}>
                        <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "center" }]}>Add Event</Text>
                        <Image style={[styles.icon, { flex: 0.1, paddingRight: 10 }]} source={require("../images/white_addSchedule.png")} />
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    }

    componentDidMount() {
        let xy = this.getColRow();
        this.setState({ col: xy[0], row: xy[1] });
        AsynchStorage.getItem(this.state.storageKey).then((data) => {
            if (data != null && data != undefined) {
                if (this.state.col >= 0 && this.state.row >= 0) {
                    var DATA = JSON.parse(data);
                    let index = this.state.row * scheduleParams.DAYS.length + this.state.col + scheduleParams.DAYS.length;
                    let item = DATA[index];
                    if (item.title == "" || item.title == null || item.title == undefined) {
                        this.setState({ inSchedule: false });
                    }
                    else {
                        this.setState({ inSchedule: true });
                    }
                }
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "flex-start" }]}>
                <Image style={styles.infoImgView} source={{ uri: this.state.source }} />

                <View style={[styles.container, { flex: 1, flexDirection: "row", }]}>
                    <View style={[styles.imgTitle, { flex: 1, flexDirection: "column", height: "100%" }]}>
                        <Text style={{
                            flex: 1, flexDirection: "column",
                            color: "white", fontSize: 20,
                            textAlign: "left", paddingLeft: 10,
                        }}>
                            {this.state.date.day}
                        </Text>
                        <Text style={{
                            flex: 1, flexDirection: "column",
                            color: "white", fontSize: 16,
                            textAlign: "left", paddingLeft: 10,
                        }}>
                            {convertFromMilitaryTime(this.state.date.startTime)}-{convertFromMilitaryTime(this.state.date.endTime)}
                        </Text>
                    </View>
                    <this.addButton />
                </View>

                <View style={[styles.imgTitle, { flex: 1, height: "100%", flexDirection: "row" }]}>
                    <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "center", paddingLeft: 10, }]}>{this.state.location}</Text>
                </View>

            </SafeAreaView>
        );
    };
}

class InfoAbout extends Component {
    render() {
        let source = this.props.navigation.getParam('source', 'Bad Image');
        let description = this.props.navigation.getParam("description", "Bad Description");
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
                <Image style={styles.infoImgView} source={{ uri: source }} />
                <ScrollView contentStyle={styles.descriptionView}>
                    <Text style={styles.descriptionText}>{description}</Text>
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