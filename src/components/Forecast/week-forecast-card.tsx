import React from 'react';
import { View, Text, StyleSheet, FlatList, GestureResponderEvent, Image } from 'react-native';
import { DailyWeatherForecastResponse } from '../../store/slices/weatherMapApiSlice';
import {styles} from './week-forecast-card-styles';

const WeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayFromTimestamp(time: number, timezone: number) {
  const date = new Date(time * 1000);
  return WeekDays[date.getDay()] + '.'; 
}

function getIconUrl(icon: string) {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

type WeekForecastCardProps = {
  forecasts: DailyWeatherForecastResponse;
}

export const WeekForecastCard: React.FC<WeekForecastCardProps> = ({ forecasts }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>7 days forecast</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 600,
        }}>
          {forecasts.list.map((item, index) => {
            return(
          <View key={item.dt} style={styles.item}>
            <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
              <Image style={styles.icon} source={{ uri: getIconUrl(item.weather[0].icon) }} />
              <Text style={styles.day}>{getDayFromTimestamp(item.dt, forecasts.city.timezone)} </Text>
              <Text style={styles.weatherCondition}>{item.weather[0].main}</Text>
            </View>
            <Text style={styles.temperature}>{Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°</Text>
          </View>
            )
          })}
      </View>
    </View>
);

export default WeekForecastCard;
