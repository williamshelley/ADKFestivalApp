import React from 'react';
import { View } from "react-native";
import { styles, screenWidth, screenHeight } from "../styles";
import { sort, getItem, CATEGORY_STORAGE } from '../utils/data-funcs';
import { FlatList } from 'react-native-gesture-handler';
import EventCard from '../components/EventCard';
import DropdownFilter from '../components/DropdownFilter';

const STACKNAV_TARGET = "Details";
const INITIAL_PAGE = "Special Event";
const NUM_COLUMNS = 1;

/**
 * Home page for events, can sort by category (potentially add search capability)
 * props:
 *  navigation { navigation }
 */
export default class SpecialEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            categories: [],
        }
    }

    componentDidMount = () => {
        getItem(CATEGORY_STORAGE, (data) => {
            sort(INITIAL_PAGE, (keys) => {
                this.setState({ data: keys, categories: JSON.parse(data) });
            });
        });
    };

    render = () => {
        const navigation = this.props.navigation;
        navigation.setOptions({
            headerTitle: "Special Events",
        });
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={[styles.eventCardContainer, {
                        paddingTop: 10,
                        paddingBottom: 20,
                    }]}
                    data={this.state.data}
                    numColumns={NUM_COLUMNS}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <EventCard
                            style={event}
                            navigation={this.props.navigation}
                            target={STACKNAV_TARGET}
                            data={item} />)} />
                <DropdownFilter data={this.state.categories} isVisible={this.state.filterVisible} 
                    onItemPress={this.sortPage}/>
            </View>
        );
    }
}

const event = {
    width: screenWidth,
    height: screenHeight / 5,
    padding: 10,
};