import React from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { styles } from '../styles';
import { isNull, notNull } from '../utils/helper-funcs';
import { getItem } from '../utils/data-funcs';
import { _week_ } from '../utils/architecture';

const emptyImage = require("../images/empty.png");

/**
 * Front page event card (based on website)
 * props:
 *  navigation = { navigation }
 *  data = { item }
 *  target = { string } -> it is the destination navigated to
 *  style = { properties } -> defaults to styles.eventItems
 */
export default class EventCard extends React.Component {
    constructor(props) {
        super(props);
        const item = notNull(this.props.data.item) ? this.props.data.item : this.props.item;
        const id = notNull(item) ? item : this.props.data;
        this.state = {
            data: null,
            id: id,
        }
    }

    stateCallback = (data) => {
        this.setState({ data: JSON.parse(data) })
    }
    componentDidMount = () => {
        getItem(this.state.id, this.stateCallback);
    }

    render = () => {
        const props = this.props;
        const data = this.state.data;
        const imgSource = isNull(data) || isNull(data.image) ? emptyImage : { uri: data.image };
        const title = isNull(data) ? "" : data.title;

        if (notNull(this.state.id)) {
            const useStyle = isNull(props.style) ? styles.eventCard : props.style;
            const imageStyle = isNull(props.imageStyle) ? styles.eventCardImage : props.imageStyle;
            return (
                <TouchableOpacity
                    style={useStyle}
                    onPress={() => {
                        if (notNull(props.target)) {
                            props.navigation.navigate(props.target, { id: this.state.id });
                        }
                    }}>
                    <ImageBackground style={[styles.eventCardImage, props.backgroundStyle]}
                        imageStyle={imageStyle} source={imgSource}>
                        <View style={styles.eventCardCorner}>
                            {props.children}
                        </View>
                        <Text style={[styles.eventCardText, props.textStyle]}>
                            {title}
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }
        return null;
    };
}