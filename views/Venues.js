import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Image, Linking } from 'react-native';
import { styles, theme, screenWidth, screenHeight } from '../styles';
import { SPONSOR_STORAGE, LOCATION_STORAGE } from '../utils/data-funcs';
import { getItem } from '../utils/data-funcs';
import AddButton from '../components/AddButton';
import { _venue_name_img_separator_ } from '../utils/architecture';

export default class Venues extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        getItem(LOCATION_STORAGE, (data) => {
            const parsed = JSON.parse(data);
            this.setState({ data: parsed });
        });
    }

    render = () => (
        <View style={[styles.container, { backgroundColor: theme.sponsorPage }]}>
            <FlatList
                data={this.state.data} keyExtractor={(index) => String(index)}
                contentContainerStyle={style.contentContainer}
                renderItem={({ item }) => (
                    <View style={style.itemContainer}>
                        <AddButton style={style.item} 
                        textStyle={{color:theme.buttonAccent, marginVertical:5}}
                        text={item.split(_venue_name_img_separator_)[0]} onPress={() => {
                            let searchLocation = "";
                            item.split(_venue_name_img_separator_)[0].split("").map((char) => {
                                if (char == " ") {
                                    searchLocation += "+";
                                } else {
                                    searchLocation += char
                                }
                            })
                            Linking.openURL("https://www.google.com/maps/search/?api=1&query=" + searchLocation + "%2C+Glenn+Falls+%2C+NY");
                        }}>

                            <Image style={style.locationImg}
                                imageStyle={null}
                                source={{ uri: item.split(_venue_name_img_separator_)[1] }}>
                            </Image>
                        </AddButton>
                    </View>
                )} />
        </View>
    )
}

const style = {
    contentContainer: {
        flexGrow: 1,
        backgroundColor: theme.accent,
        paddingTop: 20,
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: "row",
        width: screenWidth,
        alignItems: "center",
        justifyContent: "center",
    },
    item: {
        //width:screenWidth,
        width: "100%",
        borderRadius: 15,
        height: screenHeight / 5,
        backgroundColor: theme.overlay,
        marginBottom: 5,
        padding: 15,
    },
    locationImg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 30,
        marginBottom: 5,
    }
}