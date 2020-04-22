import React from 'react';
import { styles, weekDays, theme } from "../styles";
import { getItem } from '../utils/data-funcs';
import { notNull } from '../utils/helper-funcs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { LOCATION_STORAGE } from '../utils/data-funcs';
import ColumnView from './ScheduleColumnView';
import ListView from './ScheduleListView';

const listIcon = require("../images/listIcon.png");
const scheduleIcon = require("../images/scheduleIcon.png");

const Tab = createMaterialTopTabNavigator();

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            data: [],
            locations: [],
            listView: true,
        }
    }

    setDataCallback = async (data) => {
        const parsed = JSON.parse(data);
        const useData = notNull(parsed) ? parsed : [];
        this._isMounted && this.setState({ data: useData, week: weekDays });
    }

    componentDidMount = () => {
        this._isMounted = true;
        getItem(LOCATION_STORAGE, this.setDataCallback);
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => {
        const navigation = this.props.navigation;
        navigation.setOptions({
            /*
            headerRight: () => (
            <IconButton 
                text={this.state.listView ? null : null}
                source={this.state.listView ? scheduleIcon : listIcon}
                onPress={() => { this.setState({ listView: !this.state.listView });}} />
            )
            */
        });

        if (notNull(this.state.data) && this.state.data.length > 0) {
            return (
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: theme.mainText,
                        inactiveTintColor: theme.offText,
                        indicatorStyle: styles.detailsTabIndicator,
                        style: styles.scheduleTabBar,
                        tabStyle: {
                            borderWidth: 0.25,
                        },
                        labelStyle: {
                            fontSize: 10,
                        },
                    }}>
                    {
                        this.state.week.map((name) => {
                            const component = this.state.listView ? ListView : ColumnView;
                            return (
                            <Tab.Screen key={name} name={name} component={component}
                                initialParams={{ tab: name, sections: this.state.data }} />
                        )})
                    }
                </Tab.Navigator>

            );
        } else return null;
    }
}