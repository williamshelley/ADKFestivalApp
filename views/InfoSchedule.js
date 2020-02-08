import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, YellowBox, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles';
import MyDrawerButton from '../components/MyDrawerButton';
import MyScheduleButton from '../components/MyScheduleButton';
import { ScrollView } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { useHeaderHeight } from 'react-navigation-stack';
import { isThisTypeNode } from 'typescript';

YellowBox.ignoreWarnings(["Warning: Failed prop type: Invalid prop `source` supplied to `Image`."]);

class InfoSchedule extends Component {
    render() {
        let source = this.props.navigation.getParam('source', 'Bad Image');
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "flex-start" }]}>
                <Image style={styles.infoImgView} source={{ uri: source }} />

                <View style={[styles.container, { flex: 0, flexDirection: "row", }]}>
                    <View style={[styles.imgTitle, { flex: 1, flexDirection: "row" }]}>
                        <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "left", paddingLeft: 10, }]}>Left</Text>
                    </View>

                    <View style={[styles.imgTitle, { flex: 1, flexDirection: "row" }]}>
                        <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "right", paddingRight: 10, }]}>Right</Text>
                    </View>
                </View>

                <View style={[styles.imgTitle, { flex: 0, flexDirection: "row" }]}>
                    <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "left", paddingLeft: 10, }]}>Left</Text>
                </View>

                <View style={[styles.imgTitle, { flex: 0, flexDirection: "row" }]}>
                    <Text style={[styles.medWhiteText, { flex: 1, flexDirection: "row", textAlign: "left", paddingLeft: 10, }]}>Left</Text>
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

export default createAppContainer(TabNavigator);