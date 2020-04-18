import React from 'react';
import { View } from "react-native";
import { styles } from "../styles";
import { sort, getItem, CATEGORY_STORAGE } from '../utils/data-funcs';
import { FlatList } from 'react-native-gesture-handler';
import EventCard from '../components/EventCard';
import DropdownFilter from '../components/DropdownFilter';

const STACKNAV_TARGET = "Details";
const INITIAL_PAGE = "Headliner";
const NUM_COLUMNS = 2;

const filterIcon = require("../images/filterIcon.png");

/**
 * Home page for events, can sort by category (potentially add search capability)
 * props:
 *  navigation { navigation }
 */
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        
        this._isMounted = false;

        this.state = {
            data: [],
            categories: [],
            filterVisible: false,
            currentPage: INITIAL_PAGE,

        }
    }

    sortPage = (targetPage) => {
        sort(targetPage, (keys)=>{
            this._isMounted && this.setState({ filterVisible: false, data: keys, currentPage: targetPage })
        });
    }

    componentDidMount = () => {
        this._isMounted = true;
        getItem(CATEGORY_STORAGE, (data) => {
            sort(INITIAL_PAGE, (keys) => {
                this._isMounted && this.setState({ data: keys, categories: JSON.parse(data) });
            });
        });
    };

    componentWillUnmount(){
        this._isMounted = false;
    }

    render = () => {
        const navigation = this.props.navigation;
        navigation.setOptions({
            headerTitle: this.state.currentPage,
            headerRight: () => (
            <IconButton 
                text={this.state.filterVisible ? "Close" : null}
                source={this.state.filterVisible ? null : filterIcon}
                onPress={() => {
                    this.setState({ filterVisible: !this.state.filterVisible })
                }} />
            )
        });
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.eventCardContainer}
                    data={this.state.data}
                    numColumns={NUM_COLUMNS}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <EventCard
                            navigation={this.props.navigation}
                            target={STACKNAV_TARGET}
                            data={item} />)} />
                <DropdownFilter data={this.state.categories} isVisible={this.state.filterVisible} 
                    onItemPress={this.sortPage}/>
            </View>
        );
    }
}