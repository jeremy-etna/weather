import AsyncStorage from '@react-native-async-storage/async-storage';
import CityList from '../screens/city-list';

export type City = {
    name: string;
    country: string;
    state: string;
    lat: number;
    lon: number;
};

export type Config = {
    unit: string;
    currentIndex: number;
};

export type SavedData = {
    config: Config;
    cities: City[];
}

export async function getSavedData(): Promise<SavedData> {
    let savedCities = await getSavedCities();
    let savedConfig = await getSavedConfig();

    if (savedCities && savedConfig) {
        return {
            cities: savedCities,
            config: savedConfig
        };
    }

    return {
        cities: [],
        config: {
            unit: 'metric',
            currentIndex: 0
        }
    };
}

export async function getSavedCities(): Promise<City[]> {
  let savedCities = await AsyncStorage.getItem('savedCities');

    if (savedCities) {
        return JSON.parse(savedCities);
    }

    return [];
}

export async function addCityToSavedList(city: City) {
    let savedCities = await getSavedCities();

    if (savedCities.some(storedCity => storedCity.name === city.name &&
        storedCity.country === city.country &&
        storedCity.lat === city.lat &&
        storedCity.lon === city.lon &&
        storedCity.state === city.state)
        ) {
        return;
    }

    savedCities.push(city);
    return AsyncStorage.setItem('savedCities', JSON.stringify(savedCities));
}

export async function removeCityFromSavedList(city: City) {
    let savedCities = await getSavedCities();

    let foundIndex = savedCities.findIndex((c: City) =>
    c.name === city.name
    && c.country === city.country
    && c.lat === city.lat
    && c.lon === city.lon
    && c.state === city.state
    );

    if (foundIndex > -1) {
        savedCities = savedCities.filter((c: City) => 
        (c.name !== city.name) && 
        (c.country !== city.country) && 
        (c.lat !== city.lat) && 
        (c.lon !== city.lon) &&
        (c.state !== city.state));
    }

    return AsyncStorage.setItem('savedCities', JSON.stringify(savedCities));
}

export async function isCitySaved(city: City) {
    let savedCities = await getSavedCities();

    if (savedCities.includes(city)) {
        return true;
    }

    return false;
}

export async function getSavedConfig(): Promise<Config> {
    let config = await AsyncStorage.getItem('config');

    if (config) {
        return JSON.parse(config);
    }

    return {
        unit: 'metric',
        currentIndex: 0
    };
}

export async function saveCurrentUnit(unit: string) {
    let config = await getSavedConfig();

    config.unit = unit;

    return AsyncStorage.setItem('config', JSON.stringify(config));
}

export async function saveCurrentIndex(index: number) {
    let config = await getSavedConfig();

    config.currentIndex = index;

    return AsyncStorage.setItem('config', JSON.stringify(config));
}