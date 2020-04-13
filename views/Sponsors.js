import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, Linking } from 'react-native';
import { styles, theme, screenWidth, screenHeight } from '../styles';
import { SPONSOR_STORAGE } from '../utils/data-funcs';
import { getItem } from '../utils/data-funcs';
import AddButton from '../components/AddButton';

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
                data={this.state.data} keyExtractor={(index) => String(index)}
                contentContainerStyle={[styles.eventCardContainer,{flexGrow:1}]}
                renderItem={({ item }) => (
                    <View style={{
                        width: screenWidth,
                    }}>
                    <AddButton style={{
                        height:screenHeight * 0.08,
                        backgroundColor: theme.overlay,
                    }}text={item[0]} onPress={()=>{
                        Linking.openURL(item[1]);
                    }}/>
                    </View>
                )} />
        </View>
    )

} 