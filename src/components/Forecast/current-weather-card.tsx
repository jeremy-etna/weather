import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/configureStore';
import { HourlyForecastDataList } from '../../store/slices/weatherMapApiSlice';
import { City } from '../../store/storage';
import { styles } from './current-weather-card-styles';


type CurrentWeatherCardProps = {
    forecast: HourlyForecastDataList,
    city: City
};

function getIconUrl(icon: string) {
    return `http://openweathermap.org/img/w/${icon}.png`;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
    forecast,
    city
}) => {
    let dimensions = useWindowDimensions();
    let currentUnit = useSelector((state: AppState) => state.settings.currentUnit);

    return (
        <View style={{...styles.container}}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={{ uri: getIconUrl(forecast.weather[0].icon) }} />
                <Text style={styles.temperature}>{Math.round(forecast.main.temp)}°</Text>
                <Text style={styles.unit}>{currentUnit == 'metric' ? 'C' : 'F'}</Text>
            </View>
            <Text style={styles.weatherCondition}>
                {forecast.weather[0].main} {Math.round(forecast.main.temp_max)}°/{Math.round(forecast.main.temp_min)}°
            </Text>
        </View>
    );
};
