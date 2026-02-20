import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { woudbinelocs } from '../UnderTheWoubineSkyData/woudbinelocs';
import UnderTheSkyListCard from '../UnderTheWoubineSkyComponents/UnderTheSkyListCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStore } from '../UnderTheWoubineSkyStore/underTheSkyContext';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const WoudbineAnimatedCard = ({ children, index }) => {
  const cardFade = useRef(new Animated.Value(0)).current;
  const cardTranslate = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardFade, {
        toValue: 1,
        duration: 320,
        delay: index * 85,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslate, {
        toValue: 0,
        duration: 320,
        delay: index * 85,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  return (
    <Animated.View
      style={{
        opacity: cardFade,
        transform: [{ translateY: cardTranslate }],
      }}
    >
      {children}
    </Animated.View>
  );
};

const LocationsListUnderTheWoubineSky = ({ selectedScreen }) => {
  const navigation = useNavigation();
  const { getWoudbineLocation, woudbineSavedList } = useStore();
  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);
  const [woudbineInptVavue, setWoudbineInptVavue] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  const buttonScaleMenu = useRef(new Animated.Value(1)).current;
  const buttonScaleBack = useRef(new Animated.Value(1)).current;
  const buttonScaleEmpty = useRef(new Animated.Value(1)).current;

  const pressIn = scale => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const pressOut = scale => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getWoudbineLocation();
    }, []),
  );

  let placeslist;
  selectedScreen === 'savedScreen'
    ? (placeslist = woudbineSavedList)
    : (placeslist = woudbinelocs);

  const filteredPlaces = useMemo(() => {
    const query = woudbineInptVavue.trim().toLowerCase();
    if (!query) return placeslist;
    return placeslist.filter(loc =>
      loc.woudbinettl?.toLowerCase().includes(query),
    );
  }, [woudbineInptVavue, placeslist]);

  return (
    <ImageBackground
      source={require('../../assets/images/woudbineonbg.png')}
      style={styles.woudbinecnt}
    >
      {Platform.OS === 'ios' && showWoudbineMenu && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={1}
        />
      )}

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
            {selectedScreen === 'savedScreen' && (
              <View
                style={[
                  styles.woudbinewrppr,
                  { justifyContent: 'space-between' },
                ]}
              >
              <Text style={styles.woudbinelbltxt}>Saved places</Text>

              <UnderTheSkyPressable
                activeOpacity={1}
                onPressIn={() => pressIn(buttonScaleMenu)}
                onPressOut={() => pressOut(buttonScaleMenu)}
                onPress={() => setShowWoudbineMenu(true)}
              >
                <Animated.View
                  style={{ transform: [{ scale: buttonScaleMenu }] }}
                >
                  <Image
                    source={require('../../assets/images/woudbineburg.png')}
                  />
                </Animated.View>
              </UnderTheSkyPressable>
              </View>
            )}

            {selectedScreen === 'popularScreen' && (
              <View style={styles.woudbinewrppr}>
              <UnderTheSkyPressable
                activeOpacity={1}
                onPressIn={() => pressIn(buttonScaleBack)}
                onPressOut={() => pressOut(buttonScaleBack)}
                onPress={() => navigation.goBack()}
              >
                <Animated.View
                  style={{ transform: [{ scale: buttonScaleBack }] }}
                >
                  <Image
                    source={require('../../assets/images/woudbineback.png')}
                  />
                </Animated.View>
              </UnderTheSkyPressable>

              <Text style={styles.woudbinelbltxt}>Popular places</Text>
              </View>
            )}
          </UnderTheSkyReveal>
        </Animated.View>

        {showWoudbineMenu && selectedScreen === 'savedScreen' && (
          <Modal transparent animationType="fade" visible={showWoudbineMenu}>
            <View
              style={{
                position: 'absolute',
                top: height * 0.085,
                width: 200,
                padding: 16,
                backgroundColor: '#101010',
                paddingVertical: 22,
                right: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#303030',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 31,
                }}
              >
                <Text style={styles.woudbinepoptxt}>Menu</Text>
                <UnderTheSkyPressable
                  activeOpacity={0.7}
                  onPress={() => setShowWoudbineMenu(false)}
                >
                  <Image
                    source={require('../../assets/images/woudbinecls.png')}
                  />
                </UnderTheSkyPressable>
              </View>

              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => {
                  navigation.popToTop();
                  setShowWoudbineMenu(false);
                }}
                style={{ marginBottom: 20 }}
              >
                <Text style={styles.woudbinepopsectxt}>Home</Text>
              </UnderTheSkyPressable>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <Image
                  source={require('../../assets/images/woudbineselscr.png')}
                />
                <Text style={styles.woudbinepoptxt}>SAVED PLACES</Text>
              </View>

              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('InfoUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Information</Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                style={{ marginTop: 19 }}
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('QuizUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Quiz</Text>
              </UnderTheSkyPressable>

              {Platform.OS === 'ios' && (
                <UnderTheSkyPressable
                  style={{ marginTop: 19 }}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('ProfileUnderTheWoubineSky');
                    setShowWoudbineMenu(false);
                  }}
                >
                  <Text style={styles.woudbinepopsectxt}>Profile</Text>
                </UnderTheSkyPressable>
              )}
            </View>
          </Modal>
        )}

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <UnderTheSkyReveal delay={80}>
            <View>
              <TextInput
                placeholder="Search places"
                style={styles.woudbineinpt}
                value={woudbineInptVavue}
                onChangeText={setWoudbineInptVavue}
                placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              />
              <Image
                source={require('../../assets/images/woudbinesrc.png')}
                style={styles.woudbineicn}
              />
            </View>
          </UnderTheSkyReveal>
        </Animated.View>

        {selectedScreen === 'savedScreen' && woudbineSavedList.length === 0 && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
            }}
          >
            <LinearGradient
              colors={['#E11712', '#7B0D0A']}
              style={{
                marginBottom: 23,
                width: '100%',
                borderRadius: 12,
                marginTop: 40,
              }}
            >
              <View
                style={{
                  paddingHorizontal: 16,
                  padding: 20,
                  height: 162,
                  justifyContent: 'center',
                }}
              >
                <Text style={styles.woudbinefacttxt}>
                  Unfortunately, you haven't saved any places from my selection
                  yet.
                </Text>

                <UnderTheSkyPressable
                  activeOpacity={1}
                  onPressIn={() => pressIn(buttonScaleEmpty)}
                  onPressOut={() => pressOut(buttonScaleEmpty)}
                  onPress={() =>
                    navigation.navigate('LocationsListUnderTheWoubineSky')
                  }
                  style={styles.woudbineshrbtn}
                >
                  <Animated.View
                    style={{
                      transform: [{ scale: buttonScaleEmpty }],
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <Text style={styles.woudbineshrbtntxt}>Open places</Text>
                  </Animated.View>
                </UnderTheSkyPressable>

                <Image
                  source={require('../../assets/images/woudbinefctim.png')}
                  style={{ position: 'absolute', bottom: 0, right: 12 }}
                />
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          {filteredPlaces.map((loc, idx) => (
            <WoudbineAnimatedCard key={loc.woudbinelid ?? idx} index={idx}>
              <UnderTheSkyListCard location={loc} selectedScreen={selectedScreen} />
            </WoudbineAnimatedCard>
          ))}
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1 },
  woudbineinpt: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingLeft: 50,
    padding: 24,
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
    marginBottom: 31,
    width: '100%',
  },
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
  woudbinefacttxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
    marginBottom: 30,
    width: '65%',
  },
  woudbineicn: {
    position: 'absolute',
    top: 23,
    left: 18,
    opacity: 0.5,
  },
  woudbinepoptxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-Black',
  },
  woudbinepopsectxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  woudbineshrbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 148,
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  woudbineshrbtntxt: {
    color: '#7B0D0A',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
});

export default LocationsListUnderTheWoubineSky;
