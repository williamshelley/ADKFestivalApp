import React from 'react';
import { View } from "react-native";
import { getItem, SCHEDULE_KEY } from '../utils/data-funcs';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ScheduleHeader from '../components/ScheduleHeader';
import ScheduleCard from '../components/ScheduleCard';
import { styles } from "../styles";
import { notNull } from '../utils/helper-funcs';
import { _venue_name_img_separator_ } from '../utils/architecture';

/**
 * Interactive schedule to keep track of what events user wants to attend
 */
export default class ColumnView extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        const sections = this.props.route.params.sections;
        let sectionNames = [];
        let sectionImages = [];
        sections.map((item)=>{
            let value = item.split(_venue_name_img_separator_)
            sectionNames.push(value[0]);
            sectionImages.push(value[1]);
        })
        
        this.state = {
            data: [],
            tab: this.props.route.params.tab,
            sections: sectionNames,
            sectionImages: sectionImages,
        }
    }

    updateSchedule = () => {
        getItem(SCHEDULE_KEY, this.setDataCallback)
    }

    setDataCallback = (data) => {
        const parsed = JSON.parse(data);
        const useData = notNull(parsed) ? parsed : [];
        this._isMounted && this.setState({ data: useData });
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
        if (this.state.sections.length > 0) {
            return (
                <View style={[styles.container, { flexDirection: "row" }]}>
                    <ScrollView horizontal={true} contentContainerStyle={{ flexGrow: 1 }}>
                        <FlatList
                            ListHeaderComponent={() => (
                                <ScheduleHeader style={styles.scheduleHeader}
                                    data={this.state.sections} 
                                    images={this.state.sectionImages}/>
                            )}
                            stickyHeaderIndices={[0]}
                            showsVerticalScrollIndicator={true}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.sections}
                            numColumns={this.state.sections.length}
                            contentContainerStyle={[styles.eventCardContainer, { alignItems: "flex-start" }]}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <View style={styles.scheduleColumn}>{
                                    this.state.data.map((id) => (<ScheduleCard key={id} column={item}
                                        tab={this.state.tab} data={id.split(":")[0]} rmOnPress={this.updateSchedule} 
                                        dateIndex={id.split(":")[1]}
                                        style={styles.scheduleItem} navigation={this.props.navigation} />))
                                }</View>
                            )} />
                    </ScrollView>
                </View>
            );
        } else return null;
    }
}