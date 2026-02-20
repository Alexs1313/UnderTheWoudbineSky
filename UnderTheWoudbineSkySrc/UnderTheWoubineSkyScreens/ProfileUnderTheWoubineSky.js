import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
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
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import { launchImageLibrary } from 'react-native-image-picker';
import WbTchblBtn from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const normalizeWoudbinePhoto = value => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && typeof value.uri === 'string') {
    return value.uri;
  }
  return null;
};

const isValidWoudbinePhotoUri = value => {
  if (typeof value !== 'string') return false;
  const uri = value.trim();
  if (!uri || uri === 'undefined' || uri === 'null') return false;
  return (
    uri.startsWith('file://') ||
    uri.startsWith('content://') ||
    uri.startsWith('ph://') ||
    uri.startsWith('http://') ||
    uri.startsWith('https://') ||
    uri.startsWith('data:image/')
  );
};

const ProfileUnderTheWoubineSky = () => {
  const navigation = useNavigation();

  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);

  const [woudbineName, setWoudbineName] = useState('');

  const [woudbinePhoto, setWoudbinePhoto] = useState(null);
  const [photoLoadFailed, setPhotoLoadFailed] = useState(false);

  const [, setProfileExists] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const fdWdAnm = useRef(new Animated.Value(0)).current;
  const trnsWdAnm = useRef(new Animated.Value(20)).current;
  const deleteProfileScale = useRef(new Animated.Value(1)).current;
  const deleteProgressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const getWdPrfl = async () => {
      try {
        const savedPrflDt = await AsyncStorage.getItem('woudbineProfile');

        if (savedPrflDt) {
          const prsdDt = JSON.parse(savedPrflDt);
          const normalizedPhoto = normalizeWoudbinePhoto(prsdDt.photo);

          setWoudbineName(prsdDt.name || '');

          setWoudbinePhoto(normalizedPhoto);

          setProfileExists(true);
        }
      } catch {
        console.error('Error loading profile data:');
      } finally {
        setProfileLoaded(true);
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

  useEffect(() => {
    setPhotoLoadFailed(false);
  }, [woudbinePhoto]);

  const hndlWbPrssIn = scale => {
    Animated.spring(scale, {
      toValue: 0.95,

      useNativeDriver: true,
    }).start();
  };

  const hndlWbPrssOut = scale => {
    Animated.spring(scale, {
      toValue: 1,

      friction: 4,

      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (!profileLoaded) return;

    const handleAutoSave = setTimeout(async () => {
      const trimmedName = woudbineName.trim();
      const hasProfileData = Boolean(trimmedName || woudbinePhoto);

      if (!hasProfileData) {
        await AsyncStorage.removeItem('woudbineProfile');
        setProfileExists(false);
        return;
      }

      const profileData = {
        name: trimmedName,
        photo: normalizeWoudbinePhoto(woudbinePhoto),
      };

      await AsyncStorage.setItem('woudbineProfile', JSON.stringify(profileData));
      setProfileExists(true);
    }, 350);

    return () => clearTimeout(handleAutoSave);
  }, [woudbineName, woudbinePhoto, profileLoaded]);

  const rmvWdPrfl = async () => {
    Alert.alert('Delete profile', 'Delete profile data?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('woudbineProfile');

          setWoudbineName('');

          setWoudbinePhoto(null);

          setProfileExists(false);
          navigation.replace('RegistrationUnderTheWoubineSky');
        },
      },
    ]);
  };

  const rmvWdPrgrs = async () => {
    Alert.alert(
      'Delete progress',
      'Delete marks, visited places and saved places progress?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await Promise.all([
              AsyncStorage.removeItem('@visited_places'),
              AsyncStorage.removeItem('@achievements'),
              AsyncStorage.removeItem('woudbinelocs'),
            ]);
          },
        },
      ],
    );
  };

  const getPrflImg = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, imgLbResp => {
      const nextPhoto = normalizeWoudbinePhoto(imgLbResp?.assets?.[0]?.uri);
      if (nextPhoto) {
        setPhotoLoadFailed(false);
        setWoudbinePhoto(nextPhoto);
      }
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
        <Animated.View
          style={{
            opacity: fdWdAnm,
            transform: [{ translateY: trnsWdAnm }],
          }}
        >
          <UnderTheSkyReveal delay={0}>
            <View style={profileStyle.woudbinewrppr}>
              <Text style={profileStyle.woudbinelbltxt}>Profile</Text>
              <WbTchblBtn
                activeOpacity={0.7}
                onPress={() => setShowWoudbineMenu(true)}
              >
                <Image source={require('../../assets/images/woudbineburg.png')} />
              </WbTchblBtn>
            </View>
          </UnderTheSkyReveal>
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

              <WbTchblBtn
                style={{ marginTop: 19 }}
                activeOpacity={0.66}
                onPress={() => {
                  navigation.navigate('QuizUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={profileStyle.woudbinepopsectxt}>Quiz</Text>
              </WbTchblBtn>

              <View style={profileStyle.menuSelected}>
                <Image
                  source={require('../../assets/images/woudbineselscr.png')}
                />
                <Text style={profileStyle.woudbinepoptxt}>PROFILE</Text>
              </View>
            </View>
          </Modal>
        )}

        <Animated.View
          style={{
            opacity: fdWdAnm,
            transform: [{ translateY: trnsWdAnm }],
          }}
        >
          <UnderTheSkyReveal delay={90}>
            <View style={profileStyle.profileCard}>
            <View style={profileStyle.nameRow}>
              <WbInpt
                placeholder="Your name"
                style={profileStyle.woudbineinpt}
                value={woudbineName}
                onChangeText={setWoudbineName}
                placeholderTextColor="rgba(255,255,255,0.35)"
                  editable
                />
            </View>

            <View style={profileStyle.photoRow}>
              <View style={{ gap: 10 }}>
                <Text style={profileStyle.photoLabel}>Photo:</Text>
                <WbTchblBtn
                  activeOpacity={0.7}
                  style={profileStyle.changePhotoBtn}
                  onPress={getPrflImg}
                >
                  <Text style={profileStyle.changePhotoTxt}>Change photo</Text>
                </WbTchblBtn>
              </View>
              <WbTchblBtn
                style={profileStyle.photoPreview}
                activeOpacity={0.7}
                onPress={getPrflImg}
              >
                {isValidWoudbinePhotoUri(woudbinePhoto) && !photoLoadFailed ? (
                  <Image
                    source={{ uri: woudbinePhoto }}
                    style={profileStyle.photoImg}
                    onError={() => setPhotoLoadFailed(true)}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/woudbineadd.png')}
                  />
                )}
              </WbTchblBtn>
            </View>
            </View>
          </UnderTheSkyReveal>

          <UnderTheSkyReveal delay={180}>
            <WbTchblBtn
              activeOpacity={0.66}
              onPressIn={() => hndlWbPrssIn(deleteProfileScale)}
              onPressOut={() => hndlWbPrssOut(deleteProfileScale)}
              onPress={rmvWdPrfl}
              style={{ marginTop: 28 }}
            >
              <Animated.View style={{ transform: [{ scale: deleteProfileScale }] }}>
                <LinearGradient
                  colors={['#E11712', '#7B0D0A']}
                  style={profileStyle.deleteBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={profileStyle.deleteBtnTxt}>DELETE PROFILE</Text>
                </LinearGradient>
              </Animated.View>
            </WbTchblBtn>
          </UnderTheSkyReveal>

          <UnderTheSkyReveal delay={260}>
            <WbTchblBtn
              activeOpacity={0.66}
              onPressIn={() => hndlWbPrssIn(deleteProgressScale)}
              onPressOut={() => hndlWbPrssOut(deleteProgressScale)}
              onPress={rmvWdPrgrs}
              style={{ marginTop: 16 }}
            >
              <Animated.View style={{ transform: [{ scale: deleteProgressScale }] }}>
                <LinearGradient
                  colors={['#E11712', '#7B0D0A']}
                  style={profileStyle.deleteBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={profileStyle.deleteBtnTxt}>DELETE PROGRESS</Text>
                </LinearGradient>
              </Animated.View>
            </WbTchblBtn>
          </UnderTheSkyReveal>
        </Animated.View>
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
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 14,
    marginRight: 14,
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
  profileCard: {
    backgroundColor: '#161616',
    borderRadius: 14,
    padding: 18,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  photoLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  changePhotoBtn: {
    width: 147,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E11712',
  },
  changePhotoTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  photoPreview: {
    width: 104,
    height: 104,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  deleteBtn: {
    width: 250,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
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
