import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import { notNull } from '../utils/helper-funcs';
import { styles, clear, theme } from '../styles';

/**
 * Button with icon size and image
 * props:
 *  onPress = { function }
 *  source = { string }
 */
export default IconButton = ({ onPress, source, style, text, imageStyle }) => {
    const useStyle = notNull(style) ? style : styles.stackHeaderIcon;
    const textPresent = notNull(text);
    const textDim = textPresent ? 35 : 0;
    const textHeight = textPresent ? 18 : 0;

    const iconPresent = notNull(source);
    const iconDim = iconPresent ? "100%" : 0;
    return (
        <TouchableOpacity
            style={[useStyle, {margin:20}]}
            onPress={onPress}>
            <View style={{ alignItems:"center", backgroundColor: clear, width: textDim, height:textHeight }}>
                <Text style={{ color: theme.iconTint, textAlign: "center", textAlignVertical: "center" }}>{text}</Text>
            </View>
            <Image
                style={[{tintColor: theme.iconTint, width: iconDim, height: iconDim}, imageStyle]}
                source={source}
            />
        </TouchableOpacity>
    );
}