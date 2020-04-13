import React from 'react';
import { View, Text, FlatList } from "react-native";
import { styles, centered, theme } from "../styles";
import { getItem, SCHEDULE_KEY, sortIDsByDate } from '../utils/data-funcs';
import { notNull } from '../utils/helper-funcs';
import ScheduleListItem from '../components/ScheduleListItem';
import { _venue_name_img_separator_ } from '../utils/architecture';


export default class ListView extends React.Component {
    constructor(props) {
        super(props)

        this._isMounted = false;

        this.state = {
            data: [],
            sorted: [],
        }
    }

    updateSchedule = () => {
        getItem(SCHEDULE_KEY, this.setDataCallback);
    }

    setDataCallback = (data) => {
        const parsed = JSON.parse(data);
        const useData = notNull(parsed) ? parsed : [];
        sortIDsByDate(useData, (sorted)=>{
            this._isMounted && this.setState({ data: sorted });
        });
    }

    componentDidMount = () => {
        if (this.state.data.length <= 0) {
            getItem(SCHEDULE_KEY, this.setDataCallback);
        }
        this._isMounted = true;
        this.props.navigation.addListener('focus', () => {
            getItem(SCHEDULE_KEY, this.setDataCallback);
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => {
        const params = this.props.route.params;
        if (notNull(this.state.data) && this.state.data.length > 0) {
            return (
                <View style={[styles.container, {backgroundColor: theme.loadingColor}]}>
                    <FlatList
                        contentContainerStyle={[styles.eventCardContainer]}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={(item, index)=>{
                            return String(item.key) + String(index) + String(index*Math.random());
                        }}
                        renderItem={({ item, index }) => {
                            return <ScheduleListItem key={index + String(item)} tab={params.tab}
                            rmOnPress={this.updateSchedule} data={item.split(":")[0]} dateIndex={item.split(":")[1]}
                            navigation={this.props.navigation} />
                        }}
/>
                </View>
            );
        } else {
            return (
            <View style={[styles.container, centered, {backgroundColor: theme.loadingColor}]}>
                <Text style={{ fontSize: 35, color: "white" }}>Nothng scheduled</Text>
            </View>
        );
    }
    }
}