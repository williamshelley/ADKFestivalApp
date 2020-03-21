import React from 'react';
import { View, SectionList, Text, Image } from "react-native";
import { styles, centered, screenWidth, theme } from "../styles";
import { getItem, SCHEDULE_KEY } from '../utils/data-funcs';
import { notNull } from '../utils/helper-funcs';
import ScheduleListItem from '../components/ScheduleListItem';
import { _venue_name_img_separator_ } from '../utils/architecture';


export default class ListView extends React.Component {
    constructor(props) {
        super(props)

        this._isMounted = false;

        this.state = {
            sections: [],
        }
    }

    updateSchedule = () => {
        getItem(SCHEDULE_KEY, this.setDataCallback);
    }

    setDataCallback = (data) => {
        const parsed = JSON.parse(data);
        const useData = notNull(parsed) ? parsed : [];
        const sections = this.props.route.params.sections;
        let sectionArr = []
        sections.map((item) => {
            console.log(item)
            sectionArr.push({
                category: item,
                data: useData,
            })
        });
        this._isMounted && this.setState({ sections: sectionArr });
    }

    componentDidMount = () => {
        if (this.state.sections.length <= 0) {
            getItem(SCHEDULE_KEY, this.setDataCallback);
        }
        this._isMounted = true;
        this.props.navigation.addListener('focus', async () => {
            getItem(SCHEDULE_KEY, this.setDataCallback);
        });
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render = () => {
        const params = this.props.route.params;
        if (notNull(this.state.sections) && this.state.sections.length > 0) {
            return (
                <View style={[styles.container, {backgroundColor: theme.loadingColor}]}>
                    <SectionList
                        contentContainerStyle={[styles.eventCardContainer]}
                        showsVerticalScrollIndicator={false}
                        sections={this.state.sections}
                        keyExtractor={({ category }, index) => {
                            return category + String(index);
                        }}
                        renderItem={({ section: { data, category }, index }) => {
                            return (
                                <ScheduleListItem key={category + String(index)} tab={params.tab}
                                    rmOnPress={this.updateSchedule} section={category}
                                    data={data[index]} navigation={this.props.navigation} />
                            )
                        }}
                        renderSectionHeader={({ section: { category } }) => (
                            <View style={{ flexDirection:"row",justifyContent: "center", 
                                width: screenWidth * 0.95, backgroundColor: theme.button, 
                                margin: 5, marginBottom:0, borderRadius: 5 }}>
                                <Text style={{ flex:1,textAlign: "center", textAlignVertical: "center",
                                 margin: 5, fontSize: 20, color: theme.buttonAccent }}>
                                     {category.split(_venue_name_img_separator_)[0]}</Text>
                                <Image style={{flex:1}} 
                                    imageStyle={{resizeMode:"contain"}} 
                                    source={{
                                        uri:category.split(_venue_name_img_separator_)[1]}}/>
                            </View>
                        )} />
                </View>
            );
        } else return (
            <View style={[styles.container, centered]}>
                <Text style={{ fontSize: 35, color: "white" }}>Empty</Text>
            </View>
        );
    }
}