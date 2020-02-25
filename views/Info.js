import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AsynchStorage from '@react-native-community/async-storage';
import scheduleParams, { 
    prepareBlankData, 
    prepareSidebar, 
    BLANK_DATA } from '../helper-functions/schedule_params';
import {
    storeData,
    storeItem,
    convertFromMilitaryTime,
} from '../helper-functions/storage_functions';
import { notNull, isNull } from '../helper-functions/helpers';

class InfoSchedule extends Component {
    constructor(props) {
        super(props);

        this.item = this.state = {
            data: this.props.navigation.getParam('data', null),
            inSchedule: false,
            col: null,
            row: null,
        };
    }

    addItemToSchedule = (item) => {
        AsynchStorage.getItem(this.state.data.storageKey).then((data) => {
            let index = item.row * scheduleParams.DAYS.length + item.col + scheduleParams.DAYS.length;
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
                    onPress={() => { this.addItemToSchedule(this.state.data); }}
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
        AsynchStorage.getItem(this.state.data.storageKey).then((data) => {
            if (notNull(data)) {
                var DATA = JSON.parse(data);
                let index = this.state.data.row * scheduleParams.DAYS.length + this.state.data.col + scheduleParams.DAYS.length;
                let item = DATA[index];
                if (isNull(item.title)) {
                    this.setState({ inSchedule: false });
                }
                else {
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
                            {this.state.data.date.day}
                        </Text>
                        <Text style={{
                            flex: 1, flexDirection: "column",
                            color: "white", fontSize: 16,
                            textAlign: "left", paddingLeft: 10,
                        }}>
                            {convertFromMilitaryTime(this.state.data.date.startTime)}-{convertFromMilitaryTime(this.state.data.date.endTime)}
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