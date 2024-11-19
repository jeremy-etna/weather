import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useStoreDispatch, AppState } from '../../store/configureStore';
import { HourlyForecastDataList } from '../../store/slices/weatherMapApiSlice';
import { styles } from './complement-info-card-styles';


interface ComplementInfoCardProps {
    forecast: HourlyForecastDataList,
}

function getWindDirectionFromAngle(angle: number) {
    if (angle >= 337.5 || angle < 22.5) {
        return 'North';
    } else if (angle >= 22.5 && angle < 67.5) {
        return 'North East';
    } else if (angle >= 67.5 && angle < 112.5) {
        return 'East';
    } else if (angle >= 112.5 && angle < 157.5) {
        return 'South East';
    } else if (angle >= 157.5 && angle < 202.5) {
        return 'South';
    } else if (angle >= 202.5 && angle < 247.5) {
        return 'South West';
    } else if (angle >= 247.5 && angle < 292.5) {
        return 'West';
    } else if (angle >= 292.5 && angle < 337.5) {
        return 'North West';
    }
}

export const ComplementInfoCard: React.FC<ComplementInfoCardProps> = ({
    forecast,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Feels like:</Text>
                <Text style={styles.infoValue}>{forecast.main.feels_like}°</Text>
            </View>
            <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Humidity:</Text>
                <Text style={styles.infoValue}>{forecast.main.humidity}%</Text>
            </View>
            <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Pressure:</Text>
                <Text style={styles.infoValue}>{forecast.main.pressure} hPa</Text>
            </View>
            <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Wind Speed:</Text>
                <Text style={styles.infoValue}>{forecast.wind.speed} m/s</Text>
            </View>
            <View style={styles.infoGroup}>
                <Text style={styles.infoLabel}>Wind Direction:</Text>
                <Text style={styles.infoValue}>{getWindDirectionFromAngle(forecast.wind.deg)}</Text>
            </View>
        </View>
    );
};

export default ComplementInfoCard;
