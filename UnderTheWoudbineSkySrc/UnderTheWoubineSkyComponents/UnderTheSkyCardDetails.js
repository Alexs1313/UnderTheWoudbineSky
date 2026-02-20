import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { useStore } from '../UnderTheWoubineSkyStore/underTheSkyContext';
import UnderTheSkyPressable from './UnderTheSkyPressable';

const UnderTheSkyCardDetails = ({ location }) => {
  const [isOpenedMap, setIsOpenedMap] = useState(false);
  const [toggleWoudbineIcn, setToggleWoudbineIcn] = useState(false);
  const { saveWoudbineLocation, getWoudbineLocation, delWoudbineLocation } =
    useStore();

  useFocusEffect(
    useCallback(() => {
      renderWoudbineLocations(location);
      getWoudbineLocation();
    }, []),
  );

  const toggleWoudbineSaved = selectedPlace => {
    if (toggleWoudbineIcn)
      delWoudbineLocation(selectedPlace), setToggleWoudbineIcn(false);
    else saveWoudbineLocation(selectedPlace), setToggleWoudbineIcn(true);
  };

  const renderWoudbineLocations = async item => {
    const jsonSavedValue = await AsyncStorage.getItem('woudbinelocs');
    const favoritesList = JSON.parse(jsonSavedValue);

    if (favoritesList != null) {
      let data = favoritesList.find(
        fav => fav.woudbinelid === item.woudbinelid,
      );

      return data == null
        ? setToggleWoudbineIcn(false)
        : setToggleWoudbineIcn(true);
    }
  };

  const shareWoudbinePlaceDetails = async () => {
    try {
      await Share.share({
        message: `${location.woudbinettl}
${location.woudbinelat}, ${location.woudbinelon}
${location.woudbinedescr}
        `,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={[styles.woudbinecnt, isOpenedMap && { paddingBottom: 0 }]}>
      <ImageBackground
        source={location.woudbineimg}
        style={styles.woudbinewlccont}
      >
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.woudbinecntwrppr}>
            <View style={{ width: '80%' }}>
              <Text style={[styles.woudbinelbltxt, { marginBottom: 4 }]}>
                {location.woudbinettl}
              </Text>
              <Text style={styles.woudbinedesctxt}>
                {location.woudbinelat}° N {location.woudbinelon}° W
              </Text>
            </View>
            {toggleWoudbineIcn ? (
              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => toggleWoudbineSaved(location)}
              >
                <Image
                  source={require('../../assets/images/woudbineliked.png')}
                />
              </UnderTheSkyPressable>
            ) : (
              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => toggleWoudbineSaved(location)}
              >
                <Image
                  source={require('../../assets/images/woudbinelike.png')}
                />
              </UnderTheSkyPressable>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>

      {isOpenedMap ? (
        <View style={styles.woudbinemapcnt}>
          <MapView
            userInterfaceStyle="dark"
            style={{ flex: 1 }}
            provider="default"
            initialRegion={{
              latitude: location.woudbinelat,
              longitude: location.woudbinelon,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.woudbinelat,
                longitude: location.woudbinelon,
              }}
            >
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../../assets/images/woudbinemark.png')}
                />
              ) : null}
            </Marker>
          </MapView>
          <UnderTheSkyPressable
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              bottom: 21,
              alignSelf: 'center',
            }}
            onPress={() => setIsOpenedMap(false)}
          >
            <ImageBackground
              source={require('../../assets/images/woudbinebtshr.png')}
              style={styles.woudbinwrp}
            >
              <Text style={styles.woudbinebtntxt}>Close map</Text>
            </ImageBackground>
          </UnderTheSkyPressable>
          <LinearGradient
            colors={['#000000', '#00000000']}
            style={styles.woudbinegrd}
          />
        </View>
      ) : (
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={[styles.woudbinedescrtxt]}>
            {location.woudbinedescr}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <UnderTheSkyPressable
              activeOpacity={0.8}
              onPress={shareWoudbinePlaceDetails}
            >
              <ImageBackground
                source={require('../../assets/images/woudbinebtshr.png')}
                style={styles.woudbinwrp}
              >
                <Image
                  source={require('../../assets/images/woudbineshric.png')}
                />
                <Text style={styles.woudbinebtntxt}>Share place</Text>
              </ImageBackground>
            </UnderTheSkyPressable>

            <UnderTheSkyPressable
              activeOpacity={0.8}
              onPress={() => setIsOpenedMap(true)}
            >
              <ImageBackground
                source={require('../../assets/images/woudbinemap.png')}
                style={{
                  width: 90,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.woudbinebtntxt}>On map</Text>
              </ImageBackground>
            </UnderTheSkyPressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: {
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    borderRadius: 12,
  },
  woudbinewlccont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
    overflow: 'hidden',
    borderRadius: 12,
    height: 267,
  },
  woudbinebtntxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  woudbinewrppr: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 38,
  },
  woudbinecntwrppr: {
    padding: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
    width: '90%',
  },
  woudbinedesctxt: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
  woudbinedescrtxt: {
    color: '#828282',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    marginBottom: 32,
  },
  woudbinwrp: {
    width: 148,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  woudbinemapcnt: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    height: 320,
  },
  woudbinegrd: { width: '100%', height: 170, position: 'absolute', top: 0 },
});

export default UnderTheSkyCardDetails;
