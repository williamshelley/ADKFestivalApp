import React, { Component } from 'react';
import {
    SafeAreaView,
    View, Text, FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import DropdownFilter from '../components/DropdownFilter';
import IconButton from '../components/IconButton';
import styles from '../styles';

const HEADER_DATA = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const START_HOUR = 7;
const END_HOUR = 20;
var LOCATION_DATA = ["New York", "Florida", "Colorado", "Narnia"];


export default class MasterSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            sidebarData: null,
            dropdownData: null,
            headerData: null,
            yScrollPos: 0,
            xScrollPos: 0,
            toggleFilter: false,
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: () => (
                <IconButton
                    onPress={() => { params.toggleFilter(); }}
                    source={require('../images/white_filter.png')}
                >
                </IconButton>
            ),
        };
    }

    createHourList = (startHour, endHour) => {
        let res = [];
        let currentHour = startHour;
        let halfDay = 12;
        let numModifier = 0;
        let a_m = " AM", p_m = " PM";
        let strModifier = a_m;
        while (currentHour < endHour + 1) {
            if (currentHour > halfDay) {
                numModifier = halfDay;
                strModifier = p_m;
            } else if (currentHour == halfDay) {
                strModifier = p_m;
            } else {
                numModifier = 0;
                strModifier = a_m;
            }
            res.push(String(currentHour - numModifier) + strModifier);
            currentHour++;
        }
        return res;
    }

    prepareSidebar(startHour, endHour) {
        let SIDEBAR_DATA = [{
            title: "",
            id: "-1",
            hour: 0,
            day: 0,
        }];
        let SIDEBAR = this.createHourList(startHour, endHour);
        for (var i = 0; i < SIDEBAR.length; i++) {
            SIDEBAR_DATA.push({
                category: SIDEBAR[i],
                title: SIDEBAR[i],
                hour: i,
                day: 0,
                id: "Hour " + String(i),
            });
        }
        return SIDEBAR_DATA;
    }

    prepareDropdownFilter(data) {
        let DROPDOWN_DATA = [];
        for (var i = 0; i < data.length; i++) {
            DROPDOWN_DATA.push({
                category: data[i],
                id: data[i] + String(i * Math.random()),
            })
        }
        return DROPDOWN_DATA;
    }

    prepareCurrentData(headerData, sidebarData, data) {
        let DATA = [];
        for (var i = 0; i < headerData.length; i++) {
            DATA.push({
                title: headerData[i],
                hour: -1,
                day: -1,
                id: headerData[i] + String(i + Math.random() * Math.random()),
            });
        }

        for (var i = 0; i < (sidebarData.length) * (headerData.length) - headerData.length; i++) {
            let hour = Math.trunc(i / headerData.length);
            let day = i % headerData.length;
            let title = "";
            DATA.push({
                title: title,
                hour: hour,
                day: day,
                id: title + String(i * Math.random() * Math.random()),
            });
        }
        return DATA;
    }

    setCurrentDisplay = (nextPage) => {

        let SIDEBAR_DATA = this.prepareSidebar(START_HOUR, END_HOUR)

        let DROPDOWN_DATA = this.prepareDropdownFilter(LOCATION_DATA);

        let DATA = this.prepareCurrentData(HEADER_DATA,SIDEBAR_DATA);

        this.setState({
            data: DATA,
            currentKey: nextPage,
            sidebarData: SIDEBAR_DATA,
            dropdownData: DROPDOWN_DATA,
            headerData: HEADER_DATA,
        })
    }

    componentDidMount() {
        this.setCurrentDisplay(LOCATION_DATA[0]);
        this.props.navigation.setParams({
            toggleFilter: this.toggleFilter
        });

    }

    SchedItem = ({ eventItem, style }) => {
        let useStyle = styles.sectionContainer;
        if (style != null) {
            useStyle = style;
        }
        if (eventItem != null) {
            return (
                <TouchableOpacity
                    style={[useStyle, { alignItems: "center", alignSelf: "center", justifyContent: "center" }]}
                    onPress={() => {
                        let xy = this.getColRow(eventItem);
                        this.changeItem(xy[0], xy[1], {
                            title: this.state.currentKey + " " + String(xy),
                            hour: eventItem.hour,
                            day: eventItem.day,
                        });
                    }}>
                    <View style={[useStyle, { alignItems: "center", alignSelf: "center", justifyContent: "center" }]}>
                        <Text style={styles.sectionData}>{eventItem.title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        else {
            return null;
        }
    };

    getColRow = (item) => {
        return [item.day, item.hour];
    }

    changeItem = (xcol, yrow, newElement) => {
        if (yrow >= 0) {
            let index = yrow * HEADER_DATA.length + xcol + HEADER_DATA.length;
            let id = this.state.data[index].id;
            this.state.data[index] = newElement;
            this.state.data[index].id = id;
            this.setState({ data: this.state.data })
        }
    }

    synchScroll = (event) => {
        this.setState({
            yScrollPos: event.nativeEvent.contentOffset.y,
        });
    }

    toggleFilter = () => {
        this.setState({ toggleFilter: !this.state.toggleFilter });
    };

    onFilterItemPress = (item) => {
        this.state.data = this.state.data;
        this.state.currentKey = item.category;
        this.toggleFilter();
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <Text style={[styles.bigWhiteText, { color: "white" }]}>Schedule</Text>
                <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => {
                        console.log("data:");
                    }}>
                    <View style={styles.roundButton}>
                        <Text style={styles.bigWhiteText}>{this.state.currentKey}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <FlatList
                        data={this.state.sidebarData}
                        contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                        numColumns={1}
                        contentOffset={{ x: 0, y: this.state.yScrollPos }}
                        renderItem={({ item }) => <this.SchedItem
                            eventItem={item}
                            style={styles.sidebarSectionContainer}
                        />}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    >

                    </FlatList>
                    <ScrollView
                        contentContainerStyle={{ flexDirection: "column", flex: 0 }}
                        horizontal={true}
                    >
                        <FlatList
                            data={this.state.data}
                            contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                            numColumns={HEADER_DATA.length}
                            renderItem={({ item }) => <this.SchedItem
                                eventItem={item}
                                style={styles.sectionContainer}
                            />}
                            keyExtractor={item => item.id}
                            stickyHeaderIndices={[0]}
                            onScroll={event => this.synchScroll(event)}
                        />

                    </ScrollView>
                </View>
                <DropdownFilter
                    data={this.state.dropdownData}
                    toggleFilter={this.state.toggleFilter}
                    onFilterItemPress={this.onFilterItemPress}
                />
            </SafeAreaView>
        );
    }
}

