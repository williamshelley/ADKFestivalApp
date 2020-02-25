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
    prepareSidebar,
    getIndex
} from '../helper-functions/schedule_params';
import { storeData, emptyStorageItem, storeItem } from '../helper-functions/storage_functions';
import { notNull, isNull } from '../helper-functions/helpers';

const LOCATION_DATA = scheduleParams.LOCATIONS;
const HEADER_DATA = scheduleParams.DAYS;
const START_HOUR = scheduleParams.START_HOUR;
const END_HOUR = scheduleParams.END_HOUR;

const CLEAR_STORAGE = false;

export default class MasterSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            sidebarData: null,
            dropdownData: null,
            blankData: null,
            toggleFilter: false,
            currentKey: LOCATION_DATA[0],
        };

        CLEAR_STORAGE ? AsynchStorage.clear() : null;
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: () => (
                <IconButton
                    onPress={() => { params.toggleFilter(); }}
                    source={filterIcon} />
            ),
        };
    }

    updateData = (targetKey, defaultData) => {
        AsynchStorage.getItem(targetKey).then((data) => {
            if (isNull(data)) {
                storeData(targetKey, defaultData, defaultData);
            }
            let DATA = notNull(data) ? JSON.parse(data) : defaultData;
            this.setState({
                toggleFilter: false,
                data: DATA, currentKey: targetKey, headerData: HEADER_DATA
            });
        });
    }

    synchScroll = (event) => {
        this.refs.synch.setNativeProps({
            contentOffset: {
                y: event.nativeEvent.contentOffset.y,
            }
        });
    }

    toggleFilter = () => {
        this.setState({ toggleFilter: !this.state.toggleFilter });
    }

    disableFilter = () => {
        if (this.state.toggleFilter) {
            this.setState({ toggleFilter: false });
        }
    }

    onFilterItemPress = (item) => {
        this.updateData(item.category, this.state.blankData);
    }

    cleanScheduleItem = (item) => {
        let DATA = this.state.data;
        let index = getIndex({ xcol: item.col, yrow: item.row });
        storeItem(DATA, this.state.data, emptyStorageItem({ item: item }), index);
        this.setState({ data: DATA });
    }

    componentDidMount() {
        let SIDEBAR_DATA = prepareSidebar(START_HOUR, END_HOUR);
        let DROPDOWN_DATA = prepareDropdownFilter(LOCATION_DATA);
        let DATA = prepareBlankData(HEADER_DATA, SIDEBAR_DATA, this.state.currentKey);

        this.updateData(LOCATION_DATA[0], DATA);

        this.setState({
            dropdownData: DROPDOWN_DATA,
            sidebarData: SIDEBAR_DATA,
            blankData: DATA,
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