import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const ContextContainer = ({ children }) => {
  const [woudbineSavedList, setWoudbineSavedList] = useState([]);

  const saveWoudbineLocation = async location => {
    try {
      const stored = await AsyncStorage.getItem('woudbinelocs');
      let places = stored !== null ? JSON.parse(stored) : [];

      const updatedPlaces = [...places, location];

      await AsyncStorage.setItem('woudbinelocs', JSON.stringify(updatedPlaces));
    } catch (e) {
      console.error('e', e);
    }
  };

  const getWoudbineLocation = async () => {
    try {
      const savedData = await AsyncStorage.getItem('woudbinelocs');

      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setWoudbineSavedList(parsed);
      }
    } catch (error) {
      console.log('e', error);
    }
  };

  const delWoudbineLocation = async selPlc => {
    const jsonSvdValue = await AsyncStorage.getItem('woudbinelocs');
    let data = jsonSvdValue != null ? JSON.parse(jsonSvdValue) : [];

    const filtered = data.filter(
      item => item.woudbinelid !== selPlc.woudbinelid,
    );

    setWoudbineSavedList(filtered);
    await AsyncStorage.setItem('woudbinelocs', JSON.stringify(filtered));
  };

  const value = {
    saveWoudbineLocation,
    getWoudbineLocation,
    delWoudbineLocation,
    woudbineSavedList,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
