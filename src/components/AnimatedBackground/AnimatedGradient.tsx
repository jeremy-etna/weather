import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
} from 'react-native';
import { AppState, HourlyWeatherForecastResponse, useGet24hWeatherQuery } from '../../store/configureStore';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedGradientTransition from './AnimatedGradientTransition';

type TimePeriods = 'Dusk' | 'Night' | 'Dawn' | 'Day';
type WeatherTypes = 'Clear' | 'Clouds' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Drizzle' | 'Mist' | 'Smoke' | 'Haze' | 'Dust' | 'Fog' | 'Sand' | 'Ash' | 'Squall' | 'Tornado';

const colorByWeather = {
    1: ["#0071d1", "#2878d3", "#377fd5", "#4286d8", "#4b8cda", "#5391dc", "#5b97de", "#619ce0", "#67a1e2", "#6da6e4"], //Day Clear
    2: ["#4f88dc", "#6b98e2", "#80a7e7", "#91b4ed", "#acbfeb", "#c2caea", "#d6d4e8", "#e1d2db", "#ebd0cc", "#f4cebc"], //Dawn Cloudy
    3: ["#207ce4", "#5696e5", "#72abe7", "#88bee8", "#b6c5d6", "#d9ccc2", "#f6d2ac", "#f8c89a", "#fabd86", "#fcb26d"], //Dawn clear
    4: ["#021760", "#142f6d", "#1c3d79", "#214883", "#26518d", "#2a5996", "#2e609e", "#3167a6", "#346dad", "#3773b4"], //Night clear
    5: ["#577db8", "#5f83ba", "#6788bd", "#6e8ebf", "#7593c2", "#7b97c4", "#809cc6", "#86a0c9", "#8ba5cb", "#90a9cd"], //Day Mist
    6: ["#5f8bcd", "#769cd7", "#89abe0", "#99b8e9", "#b0c2e9", "#c4cbe8", "#d6d4e8", "#e1d2db", "#ebd0cc", "#f4cebc"], //Dawn Cloudy
    7: ["#3c7cd4", "#6a8fd3", "#87a0d1", "#9eafd0", "#bfb8c1", "#dbc1af", "#f3c99c", "#f4bf8b", "#f6b477", "#f7a85e"], //Dawn clear
    8: ["#2c3a60", "#314165", "#35476a", "#394c6e", "#3c5172", "#3f5676", "#435a7a", "#465e7e", "#486282", "#4b6685"], //Night Cloudy
    9: ["#8fa3c0", "#8fa3be", "#8ea2bd", "#8ea2bb", "#8ea1ba", "#8da1b8", "#8da0b6", "#8da0b4", "#8c9fb3", "#8c9fb1"], //Day Cloudy
    10: ["#414c57", "#424d58", "#434d59", "#434e5a", "#444e5b", "#454f5c", "#464f5c", "#47505d", "#47505e", "#48515f"], //Day thunderstorm
    11: ["#9bacbf", "#96a7b9", "#92a1b2", "#8d9cac", "#8896a5", "#82909d", "#7c8995", "#76828d", "#707b84", "#69737a"], //Day Snow
    12: ["#4b5f85", "#495d82", "#465a7f", "#43577c", "#405578", "#3d5275", "#3a4f71", "#374c6e", "#33486a", "#2f4566"], //Night Snow
    13: ["#949494", "#8e8e8e", "#888888", "#828282", "#7b7b7b", "#747373", "#6d6b6b", "#646262", "#5b5858", "#504d4d"], //Day sand
    14: ["#565d66", "#545b64", "#515861", "#4e555f", "#4b535c", "#49505a", "#454d57", "#424a54", "#3f4651", "#3b434e"],
    15: ["#556782", "#5a6c85", "#5f7088", "#64758a", "#69798d", "#6d7d8f", "#718092", "#758494", "#788897", "#7c8b99"],
    16: ["#3a4b65", "#3c4c65", "#3d4e65", "#3f4f64", "#415064", "#425164", "#445364", "#455463", "#475563", "#485663"],
    17: ["#98a2bc", "#9aa3bc", "#9ba5bd", "#9da6bd", "#9fa7bd", "#a1a8be", "#a2a9be", "#a4abbe", "#a5acbf", "#a7adbf"],
    18: ["#6989ba", "#708ebc", "#7793bf", "#7d98c1", "#839cc3", "#89a1c5", "#8ea5c8", "#93a9ca", "#98adcc", "#9db1ce"],
    19: ["#79889f", "#7c8ba3", "#808fa7", "#8392aa", "#8695ae", "#8998b2", "#8c9bb5", "#8f9eb8", "#92a1bc", "#95a4bf"],
    20: ["#b99d79", "#b29774", "#ab916e", "#a48a68", "#9c8362", "#947c5b", "#8b7453", "#826b4b", "#786141", "#6c5635"],
    21: ["#8b939c", "#8f969d", "#93989e", "#969b9f", "#9a9da1", "#9da0a2", "#a0a2a3", "#a4a4a4", "#a7a7a5", "#aaa9a6"], //Day sand
    22: ["#75a0e0", "#79a3e1", "#7da5e1", "#81a8e2", "#85aae2", "#89ade3", "#8cafe3", "#8fb1e4", "#93b4e4", "#96b6e5"], //Day clear
};

//Function to convert an array of string hex colors to an array of rgb colors
function hexToRgb(hex: string[]): string[] {
    const rgb = [];
    for (let i = 0; i < hex.length; i++) {
        const c = hex[i].substring(1);      // strip #
        const rgbColor = parseInt(c, 16);   // convert rrggbb to decimal
        const r = (rgbColor >> 16) & 0xff;  // extract red
        const g = (rgbColor >> 8) & 0xff;  // extract green
        const b = (rgbColor >> 0) & 0xff;  // extract blue
        rgb.push("rgb(" + r + "," + g + "," + b + ")");
    }
    return rgb;
}

function lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        B = ((num >> 8) & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}

function getGradientFromWeatherDay(weather: WeatherTypes): string[] {
    switch (weather) {
        case "Clear": return colorByWeather[1];
        case "Clouds": return colorByWeather[9];
        case "Rain": return colorByWeather[9];
        case "Snow": return colorByWeather[11];
        case "Thunderstorm": return colorByWeather[10];
        default: return ["#ffffff", "#ffffff"];
    }
}

function getGradientFromWeatherNight(weather: WeatherTypes): string[] {
    switch (weather) {
        case "Clear": return colorByWeather[4];
        case "Clouds": return colorByWeather[8];
        case "Rain": return colorByWeather[8];
        case "Snow": return colorByWeather[12];
        case "Thunderstorm": return colorByWeather[8];
        default: return ["#ffffff", "#ffffff"];
    }
}

function getGradientFromWeatherDusk(weather: WeatherTypes): string[] {
    switch (weather) {
        case "Clear": return colorByWeather[3];
        case "Clouds": return colorByWeather[2];
        case "Rain": return colorByWeather[2];
        case "Snow": return colorByWeather[2];
        default: return ["#ffffff", "#ffffff"];
    }
}

function getBackgroundColors(time: TimePeriods, weather: WeatherTypes): string[] {
    switch(time){
        case "Day":
            return getGradientFromWeatherDay(weather);
        case "Night":
            return getGradientFromWeatherNight(weather);
        case "Dusk":
            return getGradientFromWeatherDusk(weather);
        case "Dawn":
            return getGradientFromWeatherDusk(weather);
    }
}

function getTimePeriodFromTimestamp(timestamp: number, duskStamp: number, dawnStamp: number): TimePeriods {
    let date = new Date(timestamp * 1000);
    let hours = date.getHours();

    let duskDate = new Date(duskStamp * 1000);
    let duskHours = duskDate.getHours();

    let dawnDate = new Date(dawnStamp * 1000);
    let dawnHours = dawnDate.getHours();

    console.log("Dusk: " + duskHours + " Dawn: " + dawnHours + " Current: " + hours)

    //If time is within one hour of dusk or dawn, then it is considered to be dusk or dawn
    if (hours >= duskHours - 1 && hours <= duskHours + 1) {
        return "Dusk";
    }
    else if (hours >= dawnHours - 1 && hours <= dawnHours + 1) {
        return "Dawn";
    }
    else if (hours >= dawnHours + 1 && hours <= duskHours - 1) {
        return "Day";
    }
    else {
        return "Night";
    }
}

type AnimatedGradientProps = {
    lat?: number;
    lon?: number;
    currentUnit: string;
    children?: React.ReactNode;
    mockGradient?: boolean
}

export default function AnimatedGradient(props: AnimatedGradientProps): JSX.Element {
    let colors = useRef(hexToRgb(getBackgroundColors("Day", "Clear")));

    let currentWeather = useRef("Clear" as WeatherTypes);
    let currentTime = useRef("Day" as TimePeriods);

    let latitude = props.lat? props.lat : 0;
    let longitude = props.lon? props.lon : 0;

    let next24hWeatherForecast = useGet24hWeatherQuery({lat: latitude, lon: longitude, units: props.currentUnit});

    if(next24hWeatherForecast.isSuccess && !props.mockGradient) {
        currentWeather.current = next24hWeatherForecast.data?.list[0].weather[0].main! as WeatherTypes;
        currentTime.current = getTimePeriodFromTimestamp(
            next24hWeatherForecast.data?.list[0].dt! + next24hWeatherForecast.data?.city.timezone!,
            next24hWeatherForecast.data?.city.sunset! + next24hWeatherForecast.data?.city.timezone!,
            next24hWeatherForecast.data?.city.sunrise! + next24hWeatherForecast.data?.city.timezone!);

        colors.current = hexToRgb(getBackgroundColors(currentTime.current, currentWeather.current));
    } 
    else {
        colors.current = hexToRgb(getBackgroundColors("Day", "Clear"));
    }

    return (
        <View style={styles.linearGradient}>
            <AnimatedGradientTransition
                colors={colors.current} 
                animation={{toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: false}}
                style={styles.linearGradient}
                useAngle={true}
                angle={135}
                angleCenter={
                    {
                        x: 0.5,
                        y: 0.5,
                    }
                }>
                {props.children}
            </AnimatedGradientTransition>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        display: 'flex',
    },
});