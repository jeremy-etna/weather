import React, { useEffect, useRef } from 'react';
import {
    Animated,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import { useSelector } from 'react-redux';
import { AppState, citiesActions, HourlyWeatherForecastResponse, useGet24hWeatherQuery, useStoreDispatch } from '../../store/configureStore';
import AnimatedGradient from './AnimatedGradient';


export default function AnimatedBackground(props:any): JSX.Element {
    let dispatch = useStoreDispatch();
    let currentUnit = useSelector((state: AppState) => state.settings.currentUnit);
    let citiesData = useSelector((state: AppState) => state.cities.cities);
    let currentIndex = useSelector((state: AppState) => state.cities.currentIndex)
    const loadState = useSelector((state: AppState) => state.cities.state);

    let isValidState = useRef(false);


    useEffect(() => {
      dispatch(citiesActions.initialize());
    }, []);

    isValidState.current = currentIndex < citiesData.length && loadState === "succeeded";
    console.log(currentIndex, citiesData.length, isValidState.current, loadState)
    if(!isValidState.current && loadState === "succeeded") {
        dispatch(citiesActions.setCurrentIndex(0));
        currentIndex = 0;
    }

    return (
        <View style={styles.animatedBackground}>
            {!isValidState.current &&
                <AnimatedGradient
                mockGradient={true}
                currentUnit={currentUnit}>
                    {props.children}
                </AnimatedGradient>
            }
            {isValidState.current &&
            <AnimatedGradient
                lat={citiesData[currentIndex].lat}
                lon={citiesData[currentIndex].lon}
                currentUnit={currentUnit}>
                    {props.children}
            </AnimatedGradient>
            }
            {/* {loadState === "loading" &&
                {...props.children}
            } */}
        </View>
    );
}

const styles = StyleSheet.create({
    animatedBackground: {
        height: '100%',
        width: '100%',
        backgroundColor: 'red'
    },
    linearGradient: {
        flex: 1,
        display: 'flex',
    },
});
