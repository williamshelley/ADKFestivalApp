import React, { Component } from 'react';
import {
    SafeAreaView, Image,
    View, Text, FlatList,
    TouchableOpacity,
    SectionList,
    ScrollView
} from 'react-native';
import styles from '../styles';
import MyScheduleButton from '../components/MyScheduleButton';
import { isThisTypeNode } from 'typescript';

const NUM_SIDEBAR_ITEMS = 20;
const NUM_HEADER_ITEMS = 6;

export default class Schedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            headerData: null,
            sidebarData: null,
            stickyHeaderIndices: null,
            stickySidebarIndices: null,
            yScrollPos: 0,
            xScrollPos: 0,
        };
    }

    componentDidMount() {
        this.fetchScheduleData();

    }

    fetchScheduleData = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1/posts', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let DATA = [];
                let SIDEBAR_DATA = [{
                    title:"",
                    id:"-1",
                }];
                let numSidebarItems = responseJson.length / NUM_HEADER_ITEMS;
                for (var i = 0; i < numSidebarItems; i++) {
                    SIDEBAR_DATA.push({
                        title: "Place " + String(i),
                        id: "Place " + String(i),
                    })
                }
                for (var i = 0; i < NUM_HEADER_ITEMS; i++) {
                    DATA.push({
                        userId: "Time " + String(i+1),
                        id: "Time " + String(i+1) + "$$$Schedule$$$2",
                        title: "Time " + String(i+1),
                        data: ["Time " + String(i+1), "Time " + String(i+1) + " Body"],
                    })
                }

                for (var i = 0; i < responseJson.length; i++) {
                    DATA.push({
                        userId: responseJson[i].userId,
                        id: String(responseJson[i].id) + "$$$Schedule$$$",
                        title: responseJson[i].title,
                        data: [responseJson[i].userId, responseJson[i].body],
                    })
                }
                this.setState({
                    data: DATA,
                    sidebarData: SIDEBAR_DATA,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "",
            headerTitleStyle: styles.headerText,
            headerStyle: styles.headerBar,
        };
    };

    SchedItem = ({ title, style }) => {
        let useStyle = styles.sectionContainer;
        if (style != null) {
            useStyle = style;
        }
        if (title != null) {
            return (
                <View style={[useStyle, { alignItems: "center", alignSelf: "center", justifyContent: "center" }]}>
                    <Text style={styles.sectionData}>{title}</Text>
                </View>
            );
        }
        else {
            return null;
        }
    };

    synchScroll = (event) => {
        this.setState({
            yScrollPos: event.nativeEvent.contentOffset.y,
        })
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <Text style={[styles.bigWhiteText, { color: "white" }]}>Schedule</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <FlatList
                        data={this.state.sidebarData}
                        contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                        numColumns={1}
                        contentOffset={{ x: 0, y: this.state.yScrollPos }}
                        renderItem={({ item }) =>
                            <this.SchedItem title={item.title} style={styles.sidebarSectionContainer} 
                        />}
                        keyExtractor={item => item.id}
                    >

                    </FlatList>
                    <ScrollView
                        contentContainerStyle={{ flexDirection: "column", flex: 0 }}
                        horizontal={true}
                    >
                        <FlatList
                            data={this.state.data}
                            contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                            numColumns={NUM_HEADER_ITEMS}
                            renderItem={({ item }) => <this.SchedItem 
                                title={item.title} 
                                style={styles.sectionContainer} 
                            />}
                            keyExtractor={item => item.id}
                            stickyHeaderIndices={[0]}
                            onScroll={event => this.synchScroll(event)}
                        />

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}