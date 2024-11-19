import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState, useGet24hWeatherQuery } from '../store/configureStore';
import { City } from '../store/storage';
import { styles } from './city-list-element-styles';

interface CityListElementProps {
    city: City;
    onPress: () => void;
}

export const CityListElement: React.FC<CityListElementProps> = ({
    city,
    onPress,
}) => {
    let currentUnit = useSelector((state: AppState) => state.settings.currentUnit);
    let next24hWeatherForecast = useGet24hWeatherQuery({lat: city.lat, lon: city.lon, units:currentUnit});

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {next24hWeatherForecast.isLoading &&
                <Text style={styles.cityName}>{city.name}</Text>
            }
            {next24hWeatherForecast.data && 
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                    <Text style={styles.cityName}>{city.name}</Text>
                    <Text style={styles.temperatureDetails}>
                        {Math.round(next24hWeatherForecast.data.list[0].main.temp_max)}° / {Math.round(next24hWeatherForecast.data.list[0].main.temp_min)}°
                    </Text>
                </View>
                <Text style={styles.temperature}>
                    {Math.round(next24hWeatherForecast.data.list[0].main.temp)}°
                </Text>
                
            </View>
            }
        </TouchableOpacity>
    );
};

export default CityListElement;
