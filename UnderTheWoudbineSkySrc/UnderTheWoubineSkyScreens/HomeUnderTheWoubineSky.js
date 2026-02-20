import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { woudbinefcts } from '../UnderTheWoubineSkyData/woudbinefcts';
import { BlurView } from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const HomeUnderTheWoubineSky = () => {
  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);

  const [woudbineFact, setWoudbineFact] = useState(null);
  const [woudbineProfileName, setWoudbineProfileName] = useState('');
  const [woudbineProfilePhoto, setWoudbineProfilePhoto] = useState(null);

  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const wbfctIdx = Math.floor(Math.random() * woudbinefcts.length);

    setWoudbineFact(woudbinefcts[wbfctIdx]);

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
      const getWoudbineProfile = async () => {
        const profileData = await AsyncStorage.getItem('woudbineProfile');
        if (!profileData) {
          setWoudbineProfileName('');
          setWoudbineProfilePhoto(null);
          return;
        }

        const parsedData = JSON.parse(profileData);
        setWoudbineProfileName(parsedData?.name ?? '');
        setWoudbineProfilePhoto(parsedData?.photo ?? null);
      };

      getWoudbineProfile();
    }, []),
  );

  const shareWoudbineFact = async () => {
    try {
      await Share.share({ message: woudbineFact });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,

      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
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
            <View style={styles.woudbinewrppr}>
            <View style={styles.woudbineProfileWrap}>
              {woudbineProfilePhoto ? (
                <Image
                  source={{ uri: woudbineProfilePhoto }}
                  style={styles.woudbineProfileAvatar}
                />
              ) : Platform.OS === 'ios' ? (
                <Image
                  source={require('../../assets/images/woudbinehmlogo.png')}
                  style={styles.woudbineProfileAvatar}
                />
              ) : (
                <Image
                  source={require('../../assets/images/woubineandrlogo.png')}
                  style={styles.woudbineProfileAvatar}
                />
              )}
              <Text style={styles.woudbinelbltxt}>
                {'Hello, '}
                <Text style={styles.woudbinelbltxt}>
                  {woudbineProfileName}!
                </Text>
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12 }}>
              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => navigation.navigate('MarksUnderTheWoubineSky')}
              >
                <Image source={require('../../assets/images/woudbineic.png')} />
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => setShowWoudbineMenu(true)}
              >
                <Image
                  source={require('../../assets/images/woudbineburg.png')}
                />
              </UnderTheSkyPressable>
            </View>
            </View>
          </UnderTheSkyReveal>
        </Animated.View>

        {showWoudbineMenu && (
          <Modal transparent animationType="fade">
            <View
              style={{
                position: 'absolute',
                top: height * 0.09,
                right: 12,
                width: 200,
                padding: 16,
                backgroundColor: '#101010',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#303030',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 31,
                }}
              >
                <Text style={styles.woudbinepoptxt}>Menu</Text>
                <UnderTheSkyPressable onPress={() => setShowWoudbineMenu(false)}>
                  <Image
                    source={require('../../assets/images/woudbinecls.png')}
                  />
                </UnderTheSkyPressable>
              </View>

              <Text style={styles.woudbinepoptxt}>HOME</Text>

              <UnderTheSkyPressable
                onPress={() => {
                  navigation.navigate('SavedUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text
                  style={[styles.woudbinepopsectxt, { marginVertical: 19 }]}
                >
                  Saved places
                </Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                onPress={() => {
                  navigation.navigate('InfoUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Information</Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                style={{ marginTop: 19 }}
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
            <LinearGradient
              colors={['#E11712', '#7B0D0A']}
              style={{ marginBottom: 32, borderRadius: 12 }}
            >
              <View style={{ padding: 20 }}>
              <Text style={styles.woudbinefactttl}>Daily facts:</Text>
              <Text style={styles.woudbinefacttxt}>{woudbineFact}</Text>

              <UnderTheSkyPressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={shareWoudbineFact}
              >
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <Image
                    source={require('../../assets/images/woudbineshr.png')}
                  />
                </Animated.View>
              </UnderTheSkyPressable>

              <Image
                source={require('../../assets/images/woudbinefctim.png')}
                style={{ position: 'absolute', bottom: 0, right: 0 }}
              />
              </View>
            </LinearGradient>
          </UnderTheSkyReveal>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <UnderTheSkyReveal delay={160}>
            <ImageBackground
              source={require('../../assets/images/woudbinemp.png')}
              style={styles.woudbinewlccont}
            >
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <View style={styles.woudbinecntwrppr}>
                <Text style={styles.woudbinelbltxt}>Interactive map</Text>
                <UnderTheSkyPressable
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  onPress={() => navigation.navigate('MapUnderTheWoubineSky')}
                >
                  <Animated.View
                    style={{ transform: [{ scale: buttonScale }] }}
                  >
                    <Image
                      source={require('../../assets/images/woudbineopn.png')}
                    />
                  </Animated.View>
                </UnderTheSkyPressable>
                </View>
              </LinearGradient>
            </ImageBackground>
          </UnderTheSkyReveal>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <UnderTheSkyReveal delay={240}>
            <ImageBackground
              source={require('../../assets/images/woudbineplc.png')}
              style={[styles.woudbinewlccont, { height: 227 }]}
            >
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ flex: 1, justifyContent: 'flex-end' }}
              >
                <View style={styles.woudbinecntwrppr}>
                <Text style={styles.woudbinelbltxt}>Popular places</Text>
                <UnderTheSkyPressable
                  onPressIn={onPressIn}
                  onPressOut={onPressOut}
                  onPress={() =>
                    navigation.navigate('LocationsListUnderTheWoubineSky')
                  }
                >
                  <Animated.View
                    style={{ transform: [{ scale: buttonScale }] }}
                  >
                    <Image
                      source={require('../../assets/images/woudbineopn.png')}
                    />
                  </Animated.View>
                </UnderTheSkyPressable>
                </View>
              </LinearGradient>
            </ImageBackground>
          </UnderTheSkyReveal>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1, backgroundColor: '#020302' },
  woudbinscrollcnt: {
    flexGrow: 1,
    paddingTop: height * 0.088,
    paddingHorizontal: 16,
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Black',
  },
  woudbinewlccont: {
    width: '100%',
    marginBottom: 26,
    borderRadius: 12,
    overflow: 'hidden',
    height: 162,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  woudbinewrppr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 38,
  },
  woudbineProfileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxWidth: '70%',
  },
  woudbineProfileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  woudbinecntwrppr: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  woudbinefactttl: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Raleway-Black',
    marginBottom: 8,
  },
  woudbinefacttxt: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Raleway-Regular',
    width: '65%',
    marginBottom: 30,
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
});

export default HomeUnderTheWoubineSky;
