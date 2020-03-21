import React from 'react';
import { Animated } from 'react-native';
import { screenWidth } from '../styles';

/**
 * Spring Animation Effect Horizontal
 * props:
 *  toggleFilter = { boolean }
 *  duration = { int } determines duration of animation
 *  direction = { string = left } determines direction of animation
 */
export default class SpringEffect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            effectValue: new Animated.Value(0),
            fadeValue: new Animated.Value(0),
            showing: true,
        }
    }

    animate = (duration, toggle) => {
        let target = !toggle ? 0 : 1;
        Animated.timing(this.state.fadeValue, {
            toValue: target,
            duration: duration,
        }).start();
        Animated.timing(this.state.effectValue, {
            toValue: target,
            duration: duration,
        }).start();
    }

    render() {
        let direction = (this.props.direction == "right") ? 1 : -1;
        this.animate(this.props.duration, this.props.toggleFilter);
        return (
            <Animated.View
                style={[this.props.style, {
                    opacity: this.state.fadeValue,
                    transform: [{
                            translateX: this.state.effectValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [screenWidth * direction, 0]
                            })
                        }],
                }]}>
                {this.props.children}
            </Animated.View>
        );
    }
}