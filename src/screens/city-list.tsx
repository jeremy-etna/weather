import React, { useState, CSSProperties } from 'react';
import { View, FlatList, Button, TextInput, Text, Keyboard, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import CityListElement from '../components/city-list-element';
import { useSelector } from 'react-redux';
import { AppState, citiesActions, useSearchCityQuery, useStoreDispatch, CityResult } from '../store/configureStore';
import Icon from "react-native-vector-icons/Entypo"
import { City } from '../store/storage';
import { useNavigation } from '@react-navigation/native';

const CityList = () => {
  let dispatch = useStoreDispatch();
  let navigation = useNavigation();
  const [city, setCity] = useState('');

  const citiesList = useSelector((state: AppState) => state.cities.cities);
  const loadingState = useSelector((state: AppState) => state.cities.state);

  let searchResult = useSearchCityQuery({city: city}, { skip: city.length < 3 })

  const setSearchCityName = (cityName: string) => {
    setCity(cityName);
  };

  const addCityToList = (city: CityResult) => {
    console.log(city);
    let cityData = {
      name: city.name,
      state: city.state,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    };
    dispatch(citiesActions.addCity(cityData));
    setCity('');
    Keyboard.dismiss();
  };

  const handleCityRemoval = (city: City) => {
    dispatch(citiesActions.setCurrentIndex(0));
    dispatch(citiesActions.removeCity(city));
  }

  const goToCity = (index: number) => {
    navigation.goBack();
    dispatch(citiesActions.setCurrentIndex(index));
  }

  const generateCityLabel = (city: string, state?: string, country?: string) => {
    let label = city;
    if (state) {
      label += `, ${state}`;
    }
    if (country) {
      label += `, ${country}`;
    }
    return label;
  }

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Rechercher..."
            value={city}
            onChangeText={setSearchCityName}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {city.length > 3 &&
          <FlatList
            data={searchResult.data}
            style={{ flex: 1}}
            renderItem={({ item, index }) => 
              <TouchableOpacity onPress={() => addCityToList(item)} style={styles.container}>
                <Text style={styles.cityName}>{generateCityLabel(item.name, item.state, item.country)}</Text>
              </TouchableOpacity>
            }
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
          />
          }
      {loadingState === 'loading' && <Text>Chargement...</Text>}
      {loadingState === 'succeeded' && city.length < 3 &&
      <FlatList
        data={citiesList}
        style={{ flex: 1}}
        renderItem={({ item, index }) => 
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <CityListElement city={item} onPress={() => goToCity(index)}/>
            <Icon.Button style={{alignSelf: 'flex-end', paddingLeft: 15, height: 50}} 
            name="cross" 
            backgroundColor="#fe6464" 
            size={20} 
            onPress={() => handleCityRemoval(item)}/>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
      }
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
      marginLeft: 10,
      fontSize: 18,
  },
  submitButton: {
    width: 50,
    height: 50,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  } as StyleProp<TextStyle>,
}

export default CityList;
