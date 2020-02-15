import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import DrawerItem from './DrawerItem';
import styles from '../styles';

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
        if (this.props.toggleFilter) {
            let height = styles.windowHeight / 2;
            let position = 0; //height / 3
            return (
                <SafeAreaView style={[styles.categoryPicker, {
                    position: "absolute",
                    height: height,
                    top: position,
                    bottom: 0,
                    right: 0, left: 0,
                }]}>
                    {
                        <FlatList
                            showsVerticalScrollIndicator={true}
                            indicatorStyle="white"
                            data={this.props.data}
                            contentContainerStyle={{ flex: 0, justifyContent: "center", padding: 10 }}
                            numColumns={1}
                            renderItem={({ item }) =>
                                <DrawerItem
                                    title={item.category}
                                    onPress={() => { this.onFilterItemPress(item); }}
                                />
                            }
                            keyExtractor={item => item.id}
                        />
                    }
                </SafeAreaView>
            );
        }
        else {
            return null;
        }
    }
}