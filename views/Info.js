import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import AsynchStorage from '@react-native-community/async-storage';

storeData = (targetKey, data) => {
    let DATA = (data != null && data != undefined) ? data : defaultData;
    AsynchStorage.setItem(targetKey, JSON.stringify(DATA));
}

updateData = (targetKey, defaultData) => {
    AsynchStorage.getItem(targetKey).then((data) => {
        if (data != null && data != undefined) {
            this.storeData(targetKey, defaultData, defaultData);
        }
    });
}

class InfoSchedule extends Component {
    render() {
        let source = this.props.navigation.getParam('source', 'Bad Image');
        let scheduleInfo = this.props.navigation.getParam('scheduleInfo', 
        {
            date: "MM/DD/YYYY",
            month: "Month",
            day: "Week Day",
            startHour: "Start Hour",
            endHour: "End Hour",
            location: "Location",
        });
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "flex-start" }]}>
                <Image style={styles.infoImgView} source={{ uri: source }} />

                <View style={[styles.container, { flex: 0, flexDirection: "row", }]}>
                    <View style={[styles.imgTitle, { flex: 1, flexDirection: "column" }]}>
                        <Text style={{ flex: 1, flexDirection: "row", 
                            color:"white", fontSize:10,
                            textAlign: "left", paddingLeft: 10, 
                            }}>
                                {scheduleInfo.day} {scheduleInfo.date}
                        </Text>
                        <Text style={{ flex: 1, flexDirection: "column", 
                            color:"white", fontSize:10,
                            textAlign: "left", paddingLeft: 10, 
                            }}>
                                {scheduleInfo.startHour} - {scheduleInfo.endHour}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.addScheduleBtn, { flex: 1, flexDirection: "row" }]}
                        onPress={() => console.log("pressed add button")}
                    >
                        <View style={[styles.addScheduleBtn, { flex: 1, flexDirection: "row", paddingRight:10 }]}>
                            <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "center"}]}>Add Event</Text>
                            <Image style={[styles.icon,{flex:0.1,paddingRight:10}]} source={require("../images/white_addSchedule.png")} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={[styles.imgTitle, { flex: 0, flexDirection: "row" }]}>
                    <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "left", paddingLeft: 10, }]}>{scheduleInfo.location}</Text>
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
            <SafeAreaView style={[styles.container, { justifyContent: "flex-start" }]}>
                <Image style={styles.infoImgView} source={{ uri: source }} />

                <View style={styles.descriptionView}>
                    <ScrollView style={styles.descriptionView}>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </ScrollView>
                </View>
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