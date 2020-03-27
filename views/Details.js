import React from 'react';
import { View, ImageBackground } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { styles, theme } from "../styles";
import { getItem } from '../utils/data-funcs';
import { notNull } from '../utils/helper-funcs';
import DescriptionBox from '../components/DescriptionBox';
import DetailsBox from '../components/DetailsBox';

const Tab = createMaterialTopTabNavigator();

/**
 * Container for Details page (Date or Description should be children)
 * props:
 *  image: { url }
 *  children: { React.Component }
 */
export const Container = (props) => (
    <View style={styles.detailsContainer}>
        <ImageBackground
            style={styles.detailsImage}
            source={{ uri: props.image }} />
        {props.children}
    </View>
);

/**
 * Component storing date, location, and allows adding/removing items from schedule
 * props:
 *  data: { _data_ } -> data retrieved from storage using id
 *  id: { string }
 */
export const Date = ({ route: {params: { data, id }} }) => (
    <Container image={data.image}>
        <DetailsBox id={id} date={data.date} location={data.location} title={data.title} videoLink={data.video_link}/>
    </Container>
);

/**
 * Component storing description of event
 * props:
 *  data: { _data_ }
 */
export const Description = ({ route: {params: { data }}}) => (
    <Container image={data.image}>
        <DescriptionBox content={data.description} />
    </Container>
);

/**
 * Tab navigator holding Description and Date pages
 * props:
 *  id: { string } -> id for event item in storage
 */
export default class Details extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            id: this.props.route.params.id,
        };
    }

    setData = (data) => {
        this.setState({ data: JSON.parse(data) });
    }

    componentDidMount = async () => {
        await getItem(this.state.id, this.setData);
    }

    render = () => {
        if (notNull(this.state.data)) {
            return (
                <Tab.Navigator 
                    tabBarOptions={{
                        activeTintColor: theme.mainText,
                        inactiveTintColor: theme.offText,
                        indicatorStyle: styles.detailsTabIndicator,
                        style: styles.detailsTabBar,
                        tabStyle:{
                            borderWidth:0.5,
                        }
                    }}>
                    <Tab.Screen name="Date" component={Date} 
                    initialParams={{ id: this.state.id, data: this.state.data }} />
                    <Tab.Screen name="Description" component={Description} 
                    initialParams={{ id: this.state.id, data: this.state.data }} />
                </Tab.Navigator>
            );
        }
        return null;
    }
}