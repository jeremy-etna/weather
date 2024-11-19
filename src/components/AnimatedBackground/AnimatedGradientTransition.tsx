import React, { Component } from 'react';
import {
    Animated,
    Easing,
} from 'react-native';
import _ from 'lodash';

import NativeLinearGradient, {LinearGradientProps} from 'react-native-linear-gradient';

class LinearGradient extends Component<LinearGradientProps> {
    generateColorsArray(props: any) {
        const propsKeys = Object.keys(props);
        const colorsArray: string[] = [];

        propsKeys.forEach((key) => {
            if (key.indexOf('animatedColor') !== -1
                && props[key]
                && typeof props[key] === 'string') {
                colorsArray.push(props[key]);
            }
        });

        return colorsArray;
    }

    render() {
        const {
            children,
            ...props
        } = this.props;
        const colorsArray = this.generateColorsArray(props);
        const nativeLinearProps = _.omit(props, Object.keys(colorsArray));

        return (
            <NativeLinearGradient
                { ...nativeLinearProps }
                colors={ colorsArray }
            >
                { children }
            </NativeLinearGradient>
        );
    }

}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type AnimatedGradientTransitionProps = {
    colors: any[],
    animation: TimingParameters,
    style: any,
    useAngle: boolean,
    angle: number,
    angleCenter: any,
    children?: React.ReactNode,
};

type AnimatedGradientTransitionState = {
    colors: any[],
    prevColors: any[],
    animatedColors: any[],
};

type TimingParameters = {
    toValue: number,
    duration: number,
    easing: any,
    useNativeDriver: boolean,
};

class AnimatedGradientTransition extends Component<AnimatedGradientTransitionProps, AnimatedGradientTransitionState> {
    constructor(props: AnimatedGradientTransitionProps) {
        super(props);

        this.state = {
            colors: props.colors,
            prevColors: props.colors,
            animatedColors: props.colors.map(() => new Animated.Value(0)),
        };
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const keys = [
            'colors',
        ];

        const mutableProps = _.pick(nextProps, keys);
        const stateToCompare = _.pick(prevState, keys);
        let animatedColors = prevState.animatedColors;

        animatedColors = AnimatedGradientTransition.animateGradientTransition(
            animatedColors,
            mutableProps.colors,
            prevState.colors,
            nextProps.animation,
        );

        if (!_.isEqual(mutableProps, stateToCompare)) {
            return {
                ...mutableProps,
                animatedColors,
                prevColors: prevState.colors,
            };
        }

        return null;
    }

    static animateGradientTransition(animatedColors: Animated.Value[], curColors: string[], prevColors: string[], animation: TimingParameters) {

        if (!_.isEqual(prevColors, curColors)) {

            if (animatedColors.length !== curColors.length) {
                animatedColors = curColors.map(() => new Animated.Value(0));
            } 
            else {
                animatedColors.forEach((animatedColor: any) => animatedColor.setValue(0));
            }

            Animated.parallel(
                animatedColors.map((animatedColor) => {
                    return Animated.timing(
                        animatedColor,
                        {
                            toValue: animation.toValue,
                            duration: animation.duration,
                            easing: animation.easing,
                            useNativeDriver: animation.useNativeDriver,
                        }
                    );
                })
            ).start();
        }

        return animatedColors;
    }

    getColorSafely(colors: string[], index: number) {
        if (colors[index]) {
            return colors[index];
        }

        return colors.slice(-1)[0];
    }

    getInterpolatedColors() {
        const {
            colors,
            prevColors,
            animatedColors,
        } = this.state;

        return animatedColors.map((animatedColor: any, index: any) => {
            return animatedColor.interpolate({
                inputRange: [0, 1],
                outputRange: [
                    this.getColorSafely(prevColors, index),
                    this.getColorSafely(colors, index),
                ],
                
            });
        });
    }

    generateColorsProps(interpolatedColors: any) {
        let props = {};

        interpolatedColors.forEach((interpolateColor: any, index: any) => {
            const key = `animatedColor${index}`;

            props = _.merge(
                props, {[key]: interpolateColor}
            );

            return {
                [key]: interpolateColor,
            };
        });

        return props;
    }

    render() {
        const {
            children,
            ...props
        } = this.props;
        const interpolatedColors = this.getInterpolatedColors();
        const animatedColorsProps = this.generateColorsProps(interpolatedColors);

        return (
            <AnimatedLinearGradient
                { ...props }
                { ...animatedColorsProps }
            >
                { children }
            </AnimatedLinearGradient>
        );
    }

}

export default AnimatedGradientTransition;