import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const RegistrationUnderTheWoubineSky = () => {
  const navigation = useNavigation();

  const [woudbineName, setWoudbineName] = useState('');
  const [woudbinePhoto, setWoudbinePhoto] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkExistingProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('woudbineProfile');
        if (savedProfile) {
          navigation.replace('HomeUnderTheWoubineSky');
        }
      } catch {
        console.error('Error checking existing profile:');
      }
    };

    checkExistingProfile();
  }, []);

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

  const pickProfilePhoto = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response?.assets?.[0]?.uri) {
        setWoudbinePhoto(response.assets[0].uri);
      }
    });
  };

  const saveProfileAndContinue = async () => {
    const isFormValid = Boolean(woudbineName.trim() && woudbinePhoto);

    if (!isFormValid) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -5,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 5,
          duration: 45,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -4,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 4,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 35,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    const profileData = {
      name: woudbineName.trim(),
      photo: woudbinePhoto,
    };

    await AsyncStorage.setItem('woudbineProfile', JSON.stringify(profileData));
    navigation.replace('HomeUnderTheWoubineSky');
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
        <UnderTheSkyReveal delay={0}>
          <Text style={styles.woudbinelbltxt}>Create profile</Text>
        </UnderTheSkyReveal>

        <UnderTheSkyReveal delay={80}>
          <LinearGradient
            colors={['#E11712', '#7B0D0A']}
            style={styles.woudbinehintCard}
          >
            <View style={styles.woudbinehintInner}>
              <Text style={styles.woudbinehinttxt}>
                You can keep your profile simple — what truly matters is your
                perspective, not the details
              </Text>
              <Image
                source={require('../../assets/images/woudbinefctim.png')}
                style={styles.woudbinehintImage}
              />
            </View>
          </LinearGradient>
        </UnderTheSkyReveal>

        <UnderTheSkyReveal delay={160}>
          <View style={styles.woudbineformCard}>
            <TextInput
              value={woudbineName}
              onChangeText={setWoudbineName}
              placeholder="Your name"
              placeholderTextColor="rgba(255, 255, 255, 0.35)"
              style={styles.woudbineinpt}
            />

            <View style={styles.woudbinephotoRow}>
              <Text style={styles.woudbinephototxt}>Photo:</Text>
              <UnderTheSkyPressable
                activeOpacity={0.8}
                style={styles.woudbinephotoBtn}
                onPress={pickProfilePhoto}
              >
                {woudbinePhoto ? (
                  <Image
                    source={{ uri: woudbinePhoto }}
                    style={styles.woudbinephotoimg}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/ph.png')}
                    style={{ tintColor: '#E11712' }}
                  />
                )}
              </UnderTheSkyPressable>
            </View>
          </View>
        </UnderTheSkyReveal>

        <UnderTheSkyReveal delay={240}>
          <UnderTheSkyPressable
            activeOpacity={1}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={saveProfileAndContinue}
            style={{ alignSelf: 'center', marginTop: 30 }}
          >
            <Animated.View
              style={{
                transform: [{ scale: buttonScale }, { translateX: shakeAnim }],
                opacity: woudbineName.trim() && woudbinePhoto ? 1 : 0.55,
              }}
            >
              <ImageBackground
                source={require('../../assets/images/woudbinebtshr.png')}
                style={styles.woudbinwrp}
              >
                <Text style={styles.woudbinebtntxt}>Continue</Text>
              </ImageBackground>
            </Animated.View>
          </UnderTheSkyPressable>
        </UnderTheSkyReveal>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1 },
  woudbinscrollcnt: {
    flexGrow: 1,
    paddingTop: height * 0.11,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  woudbinelbltxt: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
    marginBottom: 24,
  },
  woudbinehintCard: {
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 8,
  },
  woudbinehintInner: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: 162,
    justifyContent: 'center',
  },
  woudbinehintImage: {
    position: 'absolute',
    bottom: 0,
    right: 12,
  },
  woudbinehinttxt: {
    color: '#FFFFFF',
    width: '68%',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Raleway-Medium',
  },
  woudbineformCard: {
    backgroundColor: '#101010',
    borderRadius: 14,
    padding: 20,
  },
  woudbineinpt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingBottom: 16,
    marginBottom: 28,
  },
  woudbinephotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  woudbinephototxt: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
  },
  woudbinephotoBtn: {
    width: 104,
    height: 104,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  woudbinephotoimg: {
    width: '100%',
    height: '100%',
  },
  woudbinwrp: {
    width: 170,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  woudbinebtntxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
});

export default RegistrationUnderTheWoubineSky;
