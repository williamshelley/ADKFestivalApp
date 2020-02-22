import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView } from 'react-native';
import DropdownFilter from '../components/DropdownFilter';
import IconButton from '../components/IconButton';
import styles, { filterIcon, opacityValue, theme } from '../styles';
import AsynchStorage from '@react-native-community/async-storage';
import ScheduleItem from '../components/ScheduleItem';
import scheduleParams, {
    prepareDropdownFilter,
    prepareBlankData,
    prepareSidebar
} from '../helper-functions/schedule_params';
import { storeData, emptyStorageItem } from '../helper-functions/storage_functions';
import { notNull } from '../helper-functions/helpers';

const LOCATION_DATA = scheduleParams.LOCATIONS;
const HEADER_DATA = scheduleParams.DAYS;
const START_HOUR = scheduleParams.START_HOUR;
const END_HOUR = scheduleParams.END_HOUR;

export default class MasterSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            sidebarData: null,
            dropdownData: null,
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
                    source={filterIcon}
                >
                </IconButton>
            ),
        };
    }

    updateData = (targetKey, defaultData) => {
        AsynchStorage.getItem(targetKey).then((data) => {
            if (data == null || data == undefined) {
                storeData(targetKey, defaultData, defaultData);
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

    synchScroll = (event) => {
        this.refs.synch.setNativeProps({
            contentOffset: {
                y: event.nativeEvent.contentOffset.y,
            }
        })
    }

    toggleFilter = () => {
        this.setState({ toggleFilter: !this.state.toggleFilter });
    };

    disableFilter = () => {
        this.setState({ toggleFilter: false });
    }

    onFilterItemPress = (item) => {
        this.setCurrentDisplay(item.category);
        this.toggleFilter();
    }

    cleanScheduleItem = (item) => {
        if (item.row >= 0 && item.col >= 0) {
            let DATA = this.state.data;
            let index = item.row * HEADER_DATA.length + item.col + HEADER_DATA.length;
            let id = DATA[index].id;
            DATA[index] = emptyStorageItem({ col: item.col, row: item.row });
            DATA[index].id = id;
            storeData(this.state.currentKey, DATA, this.state.data);
            this.setState({ data: DATA });
        }
    }

    componentDidMount() {
        let SIDEBAR_DATA = prepareSidebar(START_HOUR, END_HOUR);
        let DROPDOWN_DATA = prepareDropdownFilter(LOCATION_DATA);
        let DATA = prepareBlankData(HEADER_DATA, SIDEBAR_DATA, this.state.currentKey);
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

    render() {
        if (notNull(this.state.data)) {
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.bigWhiteText}>{this.state.currentKey} Schedule</Text>
                    <View style={[styles.horizontalContainer, {
                        backgroundColor: theme.overlay,
                        opacity: opacityValue(this.state.toggleFilter),
                    }]}>
                        <FlatList
                            ref="synch"
                            data={this.state.sidebarData}
                            contentContainerStyle={styles.scrollContainer}
                            numColumns={1}
                            contentOffset={{ x: 0 }}
                            renderItem={({ item }) =>
                                <ScheduleItem
                                    navigation={this.props.navigation}
                                    style={styles.sidebarSectionContainer}
                                    item={item}
                                />
                            }
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                        />
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            horizontal={true}>
                            <FlatList
                                data={this.state.data}
                                contentContainerStyle={styles.scrollContainer}
                                numColumns={HEADER_DATA.length}
                                renderItem={({ item }) =>
                                    <ScheduleItem
                                        navigation={this.props.navigation}
                                        style={styles.sectionContainer}
                                        item={item}
                                        onDeletePress={() => { this.cleanScheduleItem(item); }}
                                    />
                                }
                                keyExtractor={item => item.id}
                                stickyHeaderIndices={[0]}
                                onScroll={event => this.synchScroll(event)}
                            />
                        </ScrollView>
                    </View>
                    <DropdownFilter
                        onOutsidePress={() => { this.disableFilter(); }}
                        duration={styles.dropdownOpenSpeed}
                        direction="right"
                        data={this.state.dropdownData}
                        toggleFilter={this.state.toggleFilter}
                        onFilterItemPress={this.onFilterItemPress}
                    />
                </SafeAreaView>
            );
        }
        else {
            return null;
        }
    }
}