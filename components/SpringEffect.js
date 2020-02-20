import React from 'react';
import { Animated, View } from 'react-native';

export default class SpringEffect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            effectValue: new Animated.Value(0),
            showing: true,
        }
    }

    animate = (duration, toggle) => {
        let target = !toggle ? 0 : 1;
        Animated.timing(this.state.effectValue, {
            toValue: target,
            duration: duration,
        }).start();
    }

    render() {
        this.animate(this.props.duration, this.props.toggle);
        return (
            <View style={{
                position: "absolute", top: 0, bottom: 0, justifyContent: "flex-start"
            }}>
                <Animated.View
                    style={{
                        position: "absolute",
                        alignItems: "center",
                        transform: [
                            {
                                translateX: this.state.effectValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [600, 0]
                                })
                            }
                        ],
                    }}
                >
                    {this.props.children}
                </Animated.View>
            </View>
        );
    }
}