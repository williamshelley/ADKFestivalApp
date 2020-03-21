import React from 'react';
import { View, Text, ImageBackground } from "react-native";
import { styles, centered, theme } from "../styles";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SpringEffect from './SpringEffect';

const dropdownSource = require("../images/empty.png");

export const DropdownItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.dropdownFilterItem}
        onPress={() => { onPress(item) }}>
        <Text style={styles.dropdownFilterItemText}>{item}</Text>
    </TouchableOpacity>
);

export default class DropdownFilter extends React.Component {
    componentDidMount = () => {
        this.props.data.map((item) => {
            console.log(item);
        })
    }
    render = () => {
        return (
            <SpringEffect style={styles.dropdownFilter} toggleFilter={this.props.isVisible}
                duration={250} direction="right">
                <ImageBackground style={[centered, { width: "100%", height: "100%" }]} source={dropdownSource}>
                    <View style={{height: "8%",width:"100%", backgroundColor: theme.button}}>
                        <Text style={styles.addButtonText}>Genre</Text>
                    </View>
                    <FlatList data={this.props.data}
                        keyExtractor={(item) => item}
                        contentContainerStyle={{ flexGrow: 1 }}
                        renderItem={({ item }) => (<DropdownItem item={item} onPress={this.props.onItemPress}/>)} />
                </ImageBackground>
            </SpringEffect>
        );
    }
}