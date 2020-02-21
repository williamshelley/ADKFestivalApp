import React from 'react';
import { SafeAreaView, FlatList, ImageBackground, Animated, View } from 'react-native';
import DrawerItem from './DrawerItem';
import styles from '../styles';
import SpringEffect from './SpringEffect';

const inidcatorColor = "white";

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
export default class DropdownFilter extends React.Component {
    onFilterItemPress = (item) => {
        this.props.onFilterItemPress?.(item);
    }

    render() {
        return (
            <SpringEffect
                duration={this.props.duration}
                toggle={this.props.toggleFilter}
                direction={this.props.direction}
            >
                <SafeAreaView
                    style={styles.categoryPicker}>
                    <ImageBackground
                        source={require("../images/swan.jpg")}
                        style={styles.container}>
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            indicatorStyle={inidcatorColor}
                            data={this.props.data}
                            contentContainerStyle={styles.dropdownFlatlist}
                            numColumns={this.props.numColumns}
                            renderItem={({ item }) =>
                                <DrawerItem
                                    title={item.category}
                                    onPress={() => { this.onFilterItemPress(item); }}
                                />
                            }
                            keyExtractor={item => item.id}
                        />
                    </ImageBackground>
                </SafeAreaView>
            </SpringEffect>


        );
    }
}