import React from 'react';
import { FlatList, ImageBackground } from 'react-native';
import DrawerItem from './DrawerItem';
import styles from '../styles';
import SpringEffect from './SpringEffect';
import OutsidePressContainer from './OutsidePressContainer'

const inidcatorColor = "white";
const backgroundImg = require("../images/swan.jpg");

/**
 * Dropdown filter
 * props:
 *  data = { array }
 *  onFilterItemPress = { function }
 *  toggleFilter = { boolean }
 *  duration = { int } determines duration of animation
 *  numColumns = { int = 1}
 *  direction = { string = left } determines direction of animation
 */
export default DropdownFilter = (props) => (
    <SpringEffect
        duration={props.duration}
        toggle={props.toggleFilter}
        direction={props.direction}>
        <OutsidePressContainer onPress={() => { props.onOutsidePress() }} />
        <ImageBackground
            source={backgroundImg}
            style={styles.dropdownFilter}>
            <FlatList
                showsVerticalScrollIndicator={true}
                indicatorStyle={inidcatorColor}
                data={props.data}
                contentContainerStyle={styles.dropdownFlatlist}
                numColumns={props.numColumns}
                renderItem={({ item }) =>
                    <DrawerItem
                        title={item.category}
                        onPress={() => { props.onFilterItemPress(item); }}
                    />
                }
                keyExtractor={item => item.id}
            />
        </ImageBackground>
    </SpringEffect>
);