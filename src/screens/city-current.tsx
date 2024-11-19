import React from 'react';
import { View, ScrollView, StyleSheet, Text, useWindowDimensions, RefreshControl } from 'react-native';
import { CurrentWeatherCard } from '../components/Forecast/current-weather-card';
import { DayForecastCard } from '../components/Forecast/day-forecast-card';
import { WeekForecastCard } from '../components/Forecast/week-forecast-card';
import { ComplementInfoCard } from '../components/Forecast/complement-info-card';
import { useGet7DaysDailyWeatherQuery, useGet5DaysDailyWeatherQuery, useGet24hWeatherQuery, HourlyWeatherForecastResponse, DailyWeatherForecastResponse } from '../store/slices/weatherMapApiSlice';
import { City } from '../store/storage';
import { useSelector } from 'react-redux';
import { AppState } from '../store/configureStore';

interface CityWeatherProps {
    city: City
}

export const WeatherScreen = (props: CityWeatherProps) => {
    let currentUnit = useSelector((state: AppState) => state.settings.currentUnit);
    let dailyWeatherForecast = useGet7DaysDailyWeatherQuery({lat: props.city.lat, lon: props.city.lon, units:currentUnit});
    let next24hWeatherForecast = useGet24hWeatherQuery({lat: props.city.lat, lon: props.city.lon, units:currentUnit});

    let dimensions = useWindowDimensions();

    let refreshing = false;
    if (dailyWeatherForecast.isLoading || next24hWeatherForecast.isLoading) {
        refreshing = true;
    }

    const onRefresh = React.useCallback(() => {
        dailyWeatherForecast.refetch();
        next24hWeatherForecast.refetch();
    }, [dailyWeatherForecast, next24hWeatherForecast]);

    const isLoading = dailyWeatherForecast.isLoading || next24hWeatherForecast.isLoading;
    const isError = dailyWeatherForecast.error || next24hWeatherForecast.error;

    return (
        <ScrollView 
        style={{...styles.container, width: dimensions.width, height: dimensions.height}}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
            {isLoading && <Text>Loading...</Text>}
            {isError && <Text>Error</Text>}
            {!isLoading && !isError && 
            <View style={styles.container}>
                <CurrentWeatherCard
                    forecast={next24hWeatherForecast.data?.list[0]!}
                    city={props.city}
                />
                <DayForecastCard
                    forecasts={next24hWeatherForecast.data!}
                />
                <WeekForecastCard forecasts={dailyWeatherForecast.data!} />
                <ComplementInfoCard
                    forecast={next24hWeatherForecast.data?.list[0]!}
                />
            </View>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
});

export default WeatherScreen;