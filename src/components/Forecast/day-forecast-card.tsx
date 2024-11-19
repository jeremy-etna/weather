import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from './day-forecast-card-styles';
import { HourlyWeatherForecastResponse } from '../../store/slices/weatherMapApiSlice';
import { useNavigation } from '@react-navigation/native';

function getHourFromTimestamp(time: string, timezone: number) {
  let date = new Date(time);
  date.setSeconds(date.getSeconds() + timezone);
  return date.getHours() + ':00';
}

type DayForecastCardProps = {
  forecasts: HourlyWeatherForecastResponse;
}

function getIconUrl(icon: string) {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

export const DayForecastCard: React.FC<DayForecastCardProps> = ({ forecasts }) => {
  let dimensions = useWindowDimensions()
  const navigation = useNavigation();

  return(
    <View style={{...styles.card}}>
      <Text style={{...styles.cardText}}>24h hourly forecast</Text>

        <FlatList

          horizontal
          showsHorizontalScrollIndicator={false}
          data={forecasts.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
              return(
                <View style={styles.item}>
                  <Text style={styles.temperature}>{Math.round(item.main.temp)}°</Text>
                  <Image style={styles.icon} source={{ uri: getIconUrl(item.weather[0].icon) }} />
                  <Text style={styles.time}>{getHourFromTimestamp(item.dt_txt, forecasts.city.timezone)}</Text>
                </View>
              )
          }}/>

      </View>
  );
}

export default DayForecastCard;

/*
        <TouchableOpacity onPress={() => {navigation.navigate('Daily24HourlyForecast', {forecasts: forecasts})}}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
      {forecasts.map((item, index) => {
        if(index < 4)
          return(
              <View key={index} style={styles.item}>
              <Text style={styles.time}>{getHourFromTimestamp(item.dt_txt)}</Text>
              <Text style={styles.temperature}>{Math.round(item.main.temp)}°</Text>
              <Text style={styles.weatherCondition}>{item.weather[0].main}</Text>
            </View>
          )
        if(index == 4)
          return(
            <View key={index} style={styles.item}>
              <Text style={styles.time}>...</Text>
              <Text style={styles.temperature}>...</Text>
              <Text style={styles.weatherCondition}>...</Text>
            </View>
          )
      })}
            </View>
        </TouchableOpacity>
*/