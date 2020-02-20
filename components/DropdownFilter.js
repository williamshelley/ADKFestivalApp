import React from 'react';
import { SafeAreaView, FlatList, ImageBackground, Animated, View } from 'react-native';
import DrawerItem from './DrawerItem';
import styles from '../styles';
import SpringEffect from './SpringEffect';

/**
 * Dropdown filter
 * props:
 *  onFilterItemPress = { function }
 *  data = { array }
 *  toggleFilter = { boolean }
 */
export default class DropdownFilter extends React.Component {
    onFilterItemPress = (item) => {
        this.props.onFilterItemPress?.(item);
    }

    render() {
        let height = styles.windowHeight / 2;
        return (
            <SpringEffect duration={500} toggle={this.props.toggleFilter}>

                <SafeAreaView
                    style={styles.categoryPicker}>

                    <ImageBackground
                        source={require("../images/swan.jpg")}
                        style={[styles.container, {
                            height: height,
                            flexDirection: "row",
                        }]}>

                        <FlatList
                            showsVerticalScrollIndicator={true}
                            indicatorStyle="white"
                            data={this.props.data}
                            contentContainerStyle={{ flex: 0, alignItems: "center", justifyContent: "center", padding: 10 }}
                            numColumns={1}
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