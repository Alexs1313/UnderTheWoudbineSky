import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground as WbImgBg,
  Modal,
  Platform,
  ScrollView as WbScrllVw,
  StyleSheet,
  Text,
  TextInput as WbInpt,
  TouchableOpacity as WbTchblBtn,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { launchImageLibrary } from 'react-native-image-picker';

const { height } = Dimensions.get('window');

const ProfileUnderTheWoubineSky = () => {
  const navigation = useNavigation();

  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);

  const [woudbineName, setWoudbineName] = useState('');

  const [woudbinePhoto, setWoudbinePhoto] = useState(null);

  const [profileExists, setProfileExists] = useState(false);

  const [showWoudbinePopUp, setShowWoudbinePopUp] = useState(false);

  const fdWdAnm = useRef(new Animated.Value(0)).current;
  const trnsWdAnm = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getWdPrfl = async () => {
      try {
        const savedPrflDt = await AsyncStorage.getItem('woudbineProfile');

        if (savedPrflDt) {
          const prsdDt = JSON.parse(savedPrflDt);

          setWoudbineName(prsdDt.name);

          setWoudbinePhoto(prsdDt.photo);

          setProfileExists(true);
        }
      } catch {
        console.error('Error loading profile data:');
      }
    };

    getWdPrfl();

    Animated.parallel([
      Animated.timing(fdWdAnm, {
        toValue: 1,

        duration: 500,

        useNativeDriver: true,
      }),
      Animated.timing(trnsWdAnm, {
        toValue: 0,

        duration: 500,

        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const hndlWbPrssIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,

      useNativeDriver: true,
    }).start();
  };

  const hndlWbPrssOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,

      friction: 4,

      useNativeDriver: true,
    }).start();
  };

  const svWdPrfl = async () => {
    if (!woudbineName.trim()) return;

    const profileData = {
      name: woudbineName.trim(),

      photo: woudbinePhoto,
    };

    await AsyncStorage.setItem('woudbineProfile', JSON.stringify(profileData));

    setProfileExists(true);

    setShowWoudbinePopUp(true);

    setTimeout(() => setShowWoudbinePopUp(false), 3000);
  };

  const rmvWdPrfl = async () => {
    await AsyncStorage.removeItem('woudbineProfile');

    setWoudbineName('');

    setWoudbinePhoto(null);

    setProfileExists(false);
  };

  const getPrflImg = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, imgLbResp => {
      if (imgLbResp?.assets?.[0]?.uri)
        setWoudbinePhoto(imgLbResp.assets[0].uri);
    });
  };

  return (
    <WbImgBg
      source={require('../../assets/images/woudbineonbg.png')}
      style={profileStyle.woudbinecnt}
    >
      {Platform.OS === 'ios' && showWoudbineMenu && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={1}
        />
      )}

      <WbScrllVw
        contentContainerStyle={profileStyle.woudbinscrollcnt}
        showsVerticalScrollIndicator={false}
      >
        {showWoudbinePopUp && (
          <Modal transparent animationType="fade">
            <View style={profileStyle.woudbinepopup}>
              <Image
                source={require('../../assets/images/woudbinechecked.png')}
              />
              <Text style={profileStyle.woudbinepopuptxt}>Profile saved!</Text>
            </View>
          </Modal>
        )}

        <Animated.View
          style={{
            opacity: fdWdAnm,
            transform: [{ translateY: trnsWdAnm }],
          }}
        >
          <View style={profileStyle.woudbinewrppr}>
            <Text style={profileStyle.woudbinelbltxt}>Profile</Text>
            <WbTchblBtn
              activeOpacity={0.7}
              onPress={() => setShowWoudbineMenu(true)}
            >
              <Image source={require('../../assets/images/woudbineburg.png')} />
            </WbTchblBtn>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fdWdAnm,
            transform: [{ translateY: trnsWdAnm }],
          }}
        >
          <WbTchblBtn
            style={profileStyle.woudbipickerwrp}
            activeOpacity={0.7}
            onPress={getPrflImg}
            disabled={profileExists}
          >
            {woudbinePhoto ? (
              <Image
                source={{ uri: woudbinePhoto }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Image
                source={require('../../assets/images/woudbineadd.png')}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            )}
          </WbTchblBtn>
        </Animated.View>

        {showWoudbineMenu && (
          <Modal transparent animationType="fade">
            <View style={profileStyle.wdMenu}>
              <View style={profileStyle.wdMenuHeader}>
                <Text style={profileStyle.woudbinepoptxt}>Menu</Text>
                <WbTchblBtn
                  onPress={() => setShowWoudbineMenu(false)}
                  activeOpacity={0.66}
                >
                  <Image
                    source={require('../../assets/images/woudbinecls.png')}
                  />
                </WbTchblBtn>
              </View>

              <WbTchblBtn
                activeOpacity={0.66}
                onPress={() => {
                  navigation.popToTop();
                  setShowWoudbineMenu(false);
                }}
              >
                <Text
                  style={[profileStyle.woudbinepopsectxt, { marginBottom: 19 }]}
                >
                  Home
                </Text>
              </WbTchblBtn>

              <WbTchblBtn
                activeOpacity={0.66}
                onPress={() => {
                  navigation.navigate('SavedUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={profileStyle.woudbinepopsectxt}>Saved places</Text>
              </WbTchblBtn>

              {Platform.OS === 'ios' && (
                <WbTchblBtn
                  style={{ marginTop: 19 }}
                  activeOpacity={0.66}
                  onPress={() => {
                    navigation.navigate('InfoUnderTheWoubineSky');
                    setShowWoudbineMenu(false);
                  }}
                >
                  <Text style={profileStyle.woudbinepopsectxt}>
                    Information
                  </Text>
                </WbTchblBtn>
              )}

              <View style={profileStyle.menuSelected}>
                <Image
                  source={require('../../assets/images/woudbineselscr.png')}
                />
                <Text style={profileStyle.woudbinepoptxt}>PROFILE</Text>
              </View>
            </View>
          </Modal>
        )}

        {!profileExists ? (
          <Animated.View
            style={{
              opacity: fdWdAnm,
              transform: [{ translateY: trnsWdAnm }],
            }}
          >
            <WbInpt
              placeholder="Enter your name"
              style={profileStyle.woudbineinpt}
              value={woudbineName}
              onChangeText={setWoudbineName}
              placeholderTextColor="rgba(255,255,255,0.5)"
            />

            <WbTchblBtn
              activeOpacity={0.66}
              onPressIn={hndlWbPrssIn}
              onPressOut={hndlWbPrssOut}
              onPress={svWdPrfl}
            >
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <WbImgBg
                  source={require('../../assets/images/woudbinebtshr.png')}
                  style={profileStyle.woudbinwrp}
                >
                  <Text style={profileStyle.woudbinebtntxt}>Done</Text>
                </WbImgBg>
              </Animated.View>
            </WbTchblBtn>
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              opacity: fdWdAnm,
              transform: [{ translateY: trnsWdAnm }],
              alignItems: 'center',
            }}
          >
            <Text style={profileStyle.woudbinefactttl}>{woudbineName}</Text>

            <View style={{ flexDirection: 'row', gap: 20, marginTop: 26 }}>
              <WbTchblBtn
                activeOpacity={0.66}
                style={profileStyle.woudbineeditbtn}
                onPress={() => setProfileExists(false)}
              >
                <Text style={profileStyle.woudbinebtnedttxt}>Edit</Text>
              </WbTchblBtn>

              <WbTchblBtn
                activeOpacity={0.66}
                onPressIn={hndlWbPrssIn}
                onPressOut={hndlWbPrssOut}
                onPress={rmvWdPrfl}
              >
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <WbImgBg
                    source={require('../../assets/images/woudbinebtshr.png')}
                    style={profileStyle.woudbinwrp}
                  >
                    <Text style={profileStyle.woudbinebtntxt}>Delete</Text>
                  </WbImgBg>
                </Animated.View>
              </WbTchblBtn>
            </View>
          </Animated.View>
        )}
      </WbScrllVw>
    </WbImgBg>
  );
};

const profileStyle = StyleSheet.create({
  woudbinecnt: { flex: 1 },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
  },
  woudbinepopuptxt: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'Raleway-Bold',
  },
  woudbinepopup: {
    position: 'absolute',
    top: height * 0.125,
    alignSelf: 'center',
    width: '65%',
    padding: 16,
    backgroundColor: '#23E112',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  woudbinebtntxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  woudbinewrppr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 38,
  },
  woudbinscrollcnt: {
    flexGrow: 1,
    paddingTop: height * 0.088,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  woudbineinpt: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
    marginBottom: 15,
  },
  woudbinwrp: {
    width: 148,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  woudbinefactttl: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
    textAlign: 'center',
  },
  woudbipickerwrp: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 44,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
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
  woudbineeditbtn: {
    width: 147,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  woudbinebtnedttxt: {
    color: '#7B0D0A',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  wdMenu: {
    position: 'absolute',
    top: height * 0.085,
    right: 12,
    width: 200,
    padding: 16,
    backgroundColor: '#101010',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#303030',
  },
  wdMenuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 31,
  },
  menuSelected: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProfileUnderTheWoubineSky;
