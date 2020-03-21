import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * Information section (below iamage) for Description Details page
 * props:
 *  content: { string } -> description
 */
export default DescriptionBox = ({ content }) => (
    <View style={styles.detailsTextWrapper}>
        <ScrollView contentContainerStyle={styles.detailsTextScroll}>
            <Text style={styles.detailsText}>{content}</Text>
        </ScrollView>
    </View>
);