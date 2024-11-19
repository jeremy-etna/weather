import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, Image } from 'react-native';
import {ForecastProps} from '../../../App';

function getHourFromTimestamp(time: string) {
  const date = new Date(time);
  return date.getHours().toString() + "h";
}

function getIconUrl(icon: string) {
  return `http://openweathermap.org/img/w/${icon}.png`;
}

export default function Day24HourlyForecast(props: any): JSX.Element {
    const dimensions = useWindowDimensions();

    const forecasts = props.route.params.forecasts;

    return (
        <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        style={{...styles.card, width: dimensions.width}}
      >
            <View style={{display: 'flex', flexDirection: 'row'}}>
        {forecasts.map((item: any, index: any) => {
            return(
                <View key={index} style={styles.item}>
                <Text style={styles.time}>{getHourFromTimestamp(item.dt_txt)}</Text>
                <Text style={styles.temperature}>{Math.round(item.main.temp)}°</Text>
                <Image style={styles.icon} source={{ uri: getIconUrl(item.weather[0].icon) }}/>
              </View>
            )

        })}
              </View>
      </ScrollView>
    );
};

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,

    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    maxWidth: 325,
  },
  item: {
    alignItems: 'center',
    marginHorizontal: 8,
    display: 'flex'
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 80,
    height: 80,
},
});

