/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';

import {
  StatusBar,
  View,
  StyleSheet,
  Text,
} from 'react-native';


import { AppState, citiesActions, store, useStoreDispatch, setInnerScrollEnabled, setInnerScrollDisabled, HourlyForecastDataList } from './src/store/configureStore';
import { Provider, useSelector } from 'react-redux';
import AnimatedBackground from './src/components/AnimatedBackground/AnimatedBackground';
import WeatherScreen from './src/screens/city-current';
import CityList from './src/screens/city-list';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import { City } from './src/store/storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ParametersScreen from './src/screens/settings';
import Day24HourlyForecast from './src/screens/forecast/24h-hourly-forecast';
import Icon from "react-native-vector-icons/Entypo"
import PagerView from 'react-native-pager-view';
import PaginationDot from 'react-native-animated-pagination-dot'

export type AppRootParamList = {
  Home: undefined;
  Settings: undefined;
  Daily24HourlyForecast: {
    forecasts: HourlyForecastDataList[];
  }
  Cities: undefined;
};

// This registers which makes navigation fully type-safe.
// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

function CitiesWeatherCards(props: any): JSX.Element {
  const dispatch = useStoreDispatch();

  const citiesList = useSelector((state: AppState) => state.cities.cities);
  const loadingState = useSelector((state: AppState) => state.cities.state);

  const currentCity = useSelector((state: AppState) => state.cities.currentIndex).valueOf();

  const changeActivePage = (event: any) => {
    dispatch(citiesActions.setCurrentIndex(event.nativeEvent.position));
  }

  return (
    <>
      {loadingState === 'loading' && <Text>Loading...</Text>}
      {loadingState === 'failed' && <Text>Error</Text>}
      {loadingState === 'succeeded' && 
      <View style={{flex: 1}}>
        <HomeHeaderTitle/>
        <PagerView orientation={'horizontal'} style={{flex: 1}} initialPage={currentCity} scrollEnabled={true} onPageSelected={changeActivePage}>
          {citiesList.map((city: City) => {
            return (
              <View key={city.name+','+city.country} style={{flex: 1}}>
                <WeatherScreen city={city} />
              </View>
            )
          })}
        </PagerView>
        </View>
      }
      </>
  );
}

function HomeHeaderTitle(props: any): JSX.Element {
  const citiesList = useSelector((state: AppState) => state.cities.cities);
  const currentCity = useSelector((state: AppState) => state.cities.currentIndex);
  const loadingState = useSelector((state: AppState) => state.cities.state);
  const navigation = useNavigation();

  if(loadingState != "succeeded") return (<></>);

  const currentCityName = citiesList[currentCity] ? citiesList[currentCity].name : '';

  return (
    <View style={{flex: 1, flexDirection: 'row', paddingTop: 40, maxHeight: 80}}>
        <Icon.Button 
                name="plus" 
                size={25} 
                color="white" 
                backgroundColor={'transparent'} 
                iconStyle={{}}
                suppressHighlighting={true}
                underlayColor={'rgba(255, 255, 255, 0.1)'}
                onPress={() => navigation.navigate('Cities')}
        />
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{currentCityName}</Text>
          <PaginationDot maxPage={citiesList.length} curPage={currentCity} activeDotColor={'white'}/>
      </View>
        <Icon.Button 
                name="dots-three-vertical" 
                size={25} color="white" 
                backgroundColor={'transparent'} 
                iconStyle={{}}
                suppressHighlighting={true}
                underlayColor={'rgba(255, 255, 255, 0.1)'}
                onPress={() => navigation.navigate('Settings')}
        />
    </View>
  )
}

function ScreenNavigator(props: any): JSX.Element {
  const navigation = useNavigation();

  return (
    <>
    <Stack.Navigator
      screenOptions={{
        title: '',
        headerStyle: {
          backgroundColor: 'transparent',
      }
      }}
      initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={CitiesWeatherCards}
        options={{
          headerShown: false,
        }}/>
      <Stack.Screen 
      name="Settings"
      component={ParametersScreen}
      options={{headerShown: true, title: "Settings", headerShadowVisible: false}} />
      <Stack.Screen
        name="Daily24HourlyForecast"
        component={Day24HourlyForecast}
        options={{headerShown: true, title: "24h Forecast", headerShadowVisible: false}} />
      <Stack.Screen
      name={'Cities'}
      component={CityList}
      options={{headerShown: true, title: "Cities", headerShadowVisible: false}} />
    </Stack.Navigator>
    </>
  );
};

const Stack = createNativeStackNavigator();
export type ForecastProps = NativeStackScreenProps<AppRootParamList, 'Daily24HourlyForecast'>

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <AnimatedBackground>
        <SafeAreaProvider>

          <NavigationContainer theme={MyTheme}>
            <ScreenNavigator />
          </NavigationContainer>

      </SafeAreaProvider>
      </AnimatedBackground>
    </Provider>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});

export default App;
