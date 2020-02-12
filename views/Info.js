import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, YellowBox, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

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