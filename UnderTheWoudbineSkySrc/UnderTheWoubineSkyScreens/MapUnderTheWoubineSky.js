import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { woudbinelocs } from '../UnderTheWoubineSkyData/woudbinelocs';
import Woudbinelistcard from '../UnderTheWoubineSkyComponents/UnderTheSkyListCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../UnderTheWoubineSkyStore/underTheSkyContext';
import MapView, { Marker } from 'react-native-maps';

import LinearGradient from 'react-native-linear-gradient';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const MapUnderTheWoubineSky = () => {
  const navigation = useNavigation();
  const { getWoudbineLocation } = useStore();
  const [isVisibleCard, setIsVisibleCard] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const backScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getWoudbineLocation();
    }, []),
  );

  const pressIn = () => {
    Animated.spring(backScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(backScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/woudbineonbg.png')}
      style={styles.woudbinecnt}
    >
      <ScrollView
        contentContainerStyle={styles.woudbinscrollcnt}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <UnderTheSkyReveal delay={0}>
            <View style={styles.woudbinewrppr}>
              <UnderTheSkyPressable
                activeOpacity={1}
                onPressIn={pressIn}
                onPressOut={pressOut}
                onPress={() => navigation.goBack()}
              >
                <Animated.View style={{ transform: [{ scale: backScale }] }}>
                  <Image
                    source={require('../../assets/images/woudbineback.png')}
                  />
                </Animated.View>
              </UnderTheSkyPressable>

              <Text style={styles.woudbinelbltxt}>Interactive map</Text>
            </View>
          </UnderTheSkyReveal>
        </Animated.View>

        <Animated.View
          style={[
            styles.mapContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            },
          ]}
        >
          <UnderTheSkyReveal delay={90} style={{ flex: 1 }}>
          <MapView
            userInterfaceStyle="dark"
            style={{ flex: 1 }}
            provider="default"
            onPress={() => {
              if (isVisibleCard && selectedMarker) {
                setIsVisibleCard(false);
                setSelectedMarker(null);
              }
            }}
            initialRegion={{
              latitude: 49.0833,
              longitude: -119.5667,
              latitudeDelta: 0.6,
              longitudeDelta: 0.6,
            }}
          >
            {woudbinelocs.map(marker => (
              <Marker
                key={marker.woudbinelid}
                coordinate={{
                  latitude: marker.woudbinelat,
                  longitude: marker.woudbinelon,
                }}
                onPress={() => {
                  setSelectedMarker(marker);
                  setIsVisibleCard(true);
                }}
              >
                {Platform.OS === 'ios' && (
                  <Image
                    source={
                      selectedMarker?.woudbinelid === marker.woudbinelid
                        ? require('../../assets/images/woudbineselmark.png')
                        : require('../../assets/images/woudbinemark.png')
                    }
                    style={
                      selectedMarker?.woudbinelid === marker.woudbinelid
                        ? undefined
                        : { width: 60, height: 60 }
                    }
                  />
                )}
              </Marker>
            ))}
          </MapView>

          <LinearGradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: 140,
            }}
            pointerEvents="none"
          />

          {isVisibleCard && selectedMarker && (
            <Animated.View
              style={{
                position: 'absolute',
                top: 15,
                alignSelf: 'center',
                width: '80%',
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              }}
            >
              <Woudbinelistcard
                location={selectedMarker}
                selectedScreen="mapScreen"
                setIsVisibleCard={setIsVisibleCard}
                setSelectedMarker={setSelectedMarker}
              />
            </Animated.View>
          )}
          </UnderTheSkyReveal>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1 },
  woudbinscrollcnt: {
    flexGrow: 1,
    paddingTop: height * 0.088,
    paddingHorizontal: 16,
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
  },
  woudbinewrppr: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 44,
  },
  mapContainer: {
    width: '100%',
    height: height * 0.72,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    marginBottom: 40,
  },
});

export default MapUnderTheWoubineSky;
