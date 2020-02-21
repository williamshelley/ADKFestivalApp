import React, { Component } from 'react';
import {
    SafeAreaView,
    View, Text, FlatList,
    ScrollView,
} from 'react-native';
import DropdownFilter from '../components/DropdownFilter';
import IconButton from '../components/IconButton';
import styles from '../styles';
import AsynchStorage from '@react-native-community/async-storage';
import ScheduleItem from '../components/ScheduleItem';

const HEADER_DATA = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const START_HOUR = 7;
const END_HOUR = 20;
const LOCATION_DATA = ["New York", "Florida", "Colorado", "Narnia"];

export default class MasterSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            sidebarData: null,
            dropdownData: null,
            yScrollPos: 0,
            toggleFilter: false,
            currentKey: LOCATION_DATA[0],
        };
        //AsynchStorage.clear();
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
            id: "-2",
            hour: -1, row: -1,
            day: -2, col: -2,
        }];
        let SIDEBAR = this.createHourList(startHour, endHour);
        for (var i = 0; i < SIDEBAR.length; i++) {
            let thisday = -1;
            SIDEBAR_DATA.push({
                category: SIDEBAR[i],
                title: SIDEBAR[i],
                hour: i, row: i,
                day: thisday, col: thisday,
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

    prepareBlankData(headerData, sidebarData) {
        let DATA = [];
        for (var i = 0; i < headerData.length; i++) {
            let thishour = -1;
            DATA.push({
                title: headerData[i],
                hour: thishour, row: thishour,
                day: i, col: i,
                id: headerData[i] + String(i + Math.random() * Math.random()),
            });
        }

        for (var i = 0; i < (sidebarData.length) * (headerData.length) - headerData.length; i++) {
            let thishour = Math.trunc(i / headerData.length);
            let thisday = i % headerData.length;
            let title = "";
            DATA.push({
                title: title,
                hour: thishour, row: thishour,
                day: thisday, col: thisday,
                id: title + String(i * Math.random() * Math.random()),
            });
        }
        return DATA;
    }

    storeData = (targetKey, data, defaultData) => {
        let DATA = (data != null && data != undefined) ? data : defaultData;
        AsynchStorage.setItem(targetKey, JSON.stringify(DATA));
    }

    updateData = (targetKey, defaultData) => {
        AsynchStorage.getItem(targetKey).then((data) => {
            if (data == null || data == undefined) {
                this.storeData(targetKey, defaultData, defaultData);
            }
            let DATA = (data != null && data != undefined) ? JSON.parse(data) : defaultData;
            this.setState({ data: DATA });
        });
    }

    setCurrentDisplay = (nextPage, defaultData) => {
        this.updateData(nextPage, defaultData);

        this.setState({
            currentKey: nextPage,
            headerData: HEADER_DATA,
        });
    }

    componentDidMount() {
        let SIDEBAR_DATA = this.prepareSidebar(START_HOUR, END_HOUR);
        let DROPDOWN_DATA = this.prepareDropdownFilter(LOCATION_DATA);
        let DATA = this.prepareBlankData(HEADER_DATA, SIDEBAR_DATA);
        for (var i = 1; i < LOCATION_DATA.length; i++) {
            this.setCurrentDisplay(LOCATION_DATA[i], DATA);
        }
        this.setCurrentDisplay(LOCATION_DATA[0], DATA);

        this.setState({
            dropdownData: DROPDOWN_DATA,
            sidebarData: SIDEBAR_DATA,
        });

        this.props.navigation.setParams({
            toggleFilter: this.toggleFilter
        });
    }

    onScheduleItemPress = (item) => {
        let xy = this.getColRow(item);
        this.changeItem(xy[0], xy[1], {
            title: this.state.currentKey + " " + String(xy),
            hour: item.hour, row: item.row,
            day: item.day, col: item.col,
        });
    }

    getColRow = (item) => {
        return [item.day, item.hour];
    }

    changeItem = (xcol, yrow, newElement, shouldSetState = true) => {
        if (yrow >= 0 && xcol >= 0) {
            let DATA = this.state.data;
            let index = yrow * HEADER_DATA.length + xcol + HEADER_DATA.length;
            let id = DATA[index].id;
            DATA[index] = newElement;
            DATA[index].id = id;
            if (shouldSetState) {
                this.storeData(this.state.currentKey, DATA, this.state.data);
                this.setState({ data: DATA });
            }
            return DATA;
        }
        return null;
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
        this.setCurrentDisplay(item.category);
        this.toggleFilter();
    }

    render() {
        return (
            <SafeAreaView style={[styles.container]}>
                <Text style={[styles.bigWhiteText, { color: "white" }]}>{this.state.currentKey} Schedule</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <FlatList
                        data={this.state.sidebarData}
                        contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                        numColumns={1}
                        contentOffset={{ x: 0, y: this.state.yScrollPos }}
                        renderItem={({ item }) =>
                            <ScheduleItem
                                style={styles.sidebarSectionContainer}
                                onPress={() => { this.onScheduleItemPress(item) }}
                                item={item}
                            />}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}/>
                    <ScrollView
                        contentContainerStyle={{ flexDirection: "column", flex: 0 }}
                        horizontal={true}>
                        <FlatList
                            data={this.state.data}
                            contentContainerStyle={{ flex: 0, flexDirection: "column" }}
                            numColumns={HEADER_DATA.length}
                            renderItem={({ item }) =>
                                <ScheduleItem
                                    style={styles.sectionContainer}
                                    onPress={() => { this.onScheduleItemPress(item) }}
                                    item={item}
                                />
                            }
                            keyExtractor={item => item.id}
                            stickyHeaderIndices={[0]}
                            onScroll={event => this.synchScroll(event)}/>
                    </ScrollView>
                </View>
                <DropdownFilter
                    duration={250}
                    direction="right"
                    data={this.state.dropdownData}
                    toggleFilter={this.state.toggleFilter}
                    onFilterItemPress={this.onFilterItemPress}
                />
            </SafeAreaView>
        );
    }
}

