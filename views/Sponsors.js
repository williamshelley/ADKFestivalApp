import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { styles, theme } from '../styles';
import { SPONSOR_STORAGE } from '../utils/data-funcs';
import { getItem } from '../utils/data-funcs';

export default class Sponsors extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data: []
        }
    }

    componentDidMount = () => {
        getItem(SPONSOR_STORAGE, (data)=>{
            const parsed = JSON.parse(data);
            this.setState({ data: parsed });
        });
    }

    render = () => (
        <View style={[styles.container, {backgroundColor: theme.sponsorPage}]}>
            <FlatList 
                data={this.state.data} keyExtractor={(item) => item}
                contentContainerStyle={[styles.eventCardContainer]}
                renderItem={({ item }) => (
                    <View style={[styles.sponsorCard]}>
                        <Text style={styles.sponsorCardText}>{item}</Text>
                    </View>
                )} />
        </View>
    )

} 