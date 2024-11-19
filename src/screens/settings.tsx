import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AppState, useStoreDispatch, setCurrentUnit, AvailableUnits } from '../store/configureStore';
import { useSelector } from 'react-redux';

let langList = [
    {label: 'Celsius', value: 'metric'},
    {label: 'Fahrenheit', value: 'imperial'}
  ];

export default function ParametersScreen(props: any): JSX.Element {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    let dispatch = useStoreDispatch();

    const currentUnit = useSelector((state: AppState) => state.settings.currentUnit);
  
    const setUnit = (item: {label: string, value: string}) => {
        dispatch(setCurrentUnit(item.value as AvailableUnits));
    }
  
    return (
      <>
        <View 
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 15,
          paddingRight: insets.right + 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Temperature unit</Text>
          <View style={{width: 125}}>
          <Dropdown
          data={langList}
          labelField="label"
          valueField="value"
          placeholder="Select unit"
          value={currentUnit} 
          onChange={setUnit}
          containerStyle={{display: 'flex', flexDirection: 'column', alignContent: 'flex-end', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 0}}
          itemTextStyle={{color: 'black'}}
          itemContainerStyle={{backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 0}}
          selectedTextStyle={{color: 'white'}}
          
          />
          </View>
        </View>
      </>
    );
  }