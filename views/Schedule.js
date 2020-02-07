import React, {Component} from 'react';
import { SafeAreaView, Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from '../styles';
import MyScheduleButton from '../components/MyScheduleButton';

const DATA = [
{
    text: "A",
    id: "123",
},
{
    text: "B",
    id: "456"
},
{
    text: "C",
    id: "789"
},

];

export default class Schedule extends Component{

    static navigationOptions = ({navigation}) => {
        return{
            headerTitle: "",
            headerTitleStyle: styles.headerText,
            headerStyle:styles.headerBar,
        };
    };

    SchedLocation = ({ text }) => {
        if (text != null){
            return(
                <TouchableOpacity 
                        style={styles.roundButton}
                        onPress={()=>console.log("Press " + text)}>
                        <Text style={styles.bigWhiteText}>{text}</Text>
                </TouchableOpacity>
            );
        }
        else{
            return null;
        }
    }

    SchedItem = ({ text }) => {
        if (text != null){
            return(
                <View style = {styles.container}>
                <TouchableOpacity 
                        style={styles.roundButton}
                        onPress={()=>console.log("Pressed " + text)}>
                        <Text style={styles.bigWhiteText}>{text}</Text>
                </TouchableOpacity>
                <View style = {styles.container}>
                    <FlatList
                        data={DATA}
                        contentContainerStyle={{ flex: 0 }}
                        numColumns={1}
                        renderItem={({ item }) => <this.SchedLocation 
                            text={item.text}
                            />}
                        keyExtractor={item=>item.id}/>
                </View>
                </View>
            );
        }
        else{
            return null;
        }
    };

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={[styles.bigWhiteText,{color:"black"}]}>Schedule</Text>
                <FlatList 
                    data={DATA}
                    horizontal={true}
                    contentContainerStyle={{ flex: 0 }}
                    numColumns={1}
                    renderItem={({ item }) => <this.SchedItem
                        text={item.text}
                        />}
                    keyExtractor={item => item.id}/>
            </SafeAreaView>
        );
    }
}