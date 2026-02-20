import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
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
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');

const InfoUnderTheWoubineSky = () => {
  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

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

  const prssInWb = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const prssOutWb = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const shareWoudbineInfo = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'ios'
            ? `“Woudbine Undеr the Skу” introduces you to unique places in Canada that you won’t find in your usual guidebooks.
Here you can save your favorite spots, learn interesting facts, and get marks for the locations you visit.
Travel with guide Celine and collect your own collection of stories under the Woubine sky.`
            : `“Under the Star Sky” introduces you to unique places in Canada that you won’t find in your usual guidebooks. 
Here you can save your favorite spots, learn interesting facts, and get marks for the locations you visit.
Travel with guide Celine and collect your own collection of stories under the Star sky.`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
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
              <Text style={styles.woudbinelbltxt}>Information</Text>

              <UnderTheSkyPressable
                activeOpacity={0.7}
                onPress={() => setShowWoudbineMenu(true)}
              >
                <Image
                  source={require('../../assets/images/woudbineburg.png')}
                />
              </UnderTheSkyPressable>
            </View>
          </UnderTheSkyReveal>
        </Animated.View>

        {showWoudbineMenu && (
          <Modal transparent animationType="fade">
            <View
              style={{
                position: 'absolute',
                top: height * 0.085,
                right: 12,
                width: 200,
                backgroundColor: '#101010',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#303030',
                padding: 16,
                paddingVertical: 22,
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
                <UnderTheSkyPressable
                  onPress={() => setShowWoudbineMenu(false)}
                >
                  <Image
                    source={require('../../assets/images/woudbinecls.png')}
                  />
                </UnderTheSkyPressable>
              </View>

              <UnderTheSkyPressable
                onPress={() => {
                  navigation.popToTop();
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={[styles.woudbinepopsectxt, { marginBottom: 19 }]}>
                  Home
                </Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                onPress={() => {
                  navigation.navigate('SavedUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Saved places</Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                style={{ marginTop: 20 }}
                onPress={() => {
                  navigation.navigate('QuizUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Quiz</Text>
              </UnderTheSkyPressable>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Image
                  source={require('../../assets/images/woudbineselscr.png')}
                />
                <Text style={styles.woudbinepoptxt}>INFORMATION</Text>
              </View>

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
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <UnderTheSkyReveal delay={80}>
            {Platform.OS === 'ios' ? (
              <Image
                source={require('../../assets/images/woudbineinflog.png')}
                style={{
                  width: 350,
                  height: 350,
                  borderRadius: 32,
                }}
              />
            ) : (
              <Image
                source={require('../../assets/images/woubineandrlogo.png')}
                style={{
                  width: 350,
                  height: 350,
                  borderTopLeftRadius: 52,
                  borderTopRightRadius: 52,
                }}
              />
            )}
          </UnderTheSkyReveal>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <UnderTheSkyReveal delay={160}>
            <Text style={[styles.woudbinesectxt, { marginBottom: 20 }]}>
              {Platform.OS === 'ios'
                ? 'Woudbine Undеr the Skу introduces you to unique places in Canada that you won’t find in your usual guidebooks. Here you can save your favorite spots, learn interesting facts, and get marks for the locations you visit. Travel with guide Celine and collect your own collection of stories under the Woubine sky.'
                : '“Under the Star Sky” introduces you to unique places in Canada that you won’t find in your usual guidebooks. Here you can save your favorite spots, learn interesting facts, and get marks for the locations you visit. Travel with guide Celine and collect your own collection of stories under the Star sky.'}
            </Text>
          </UnderTheSkyReveal>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
            alignItems: 'center',
          }}
        >
          <UnderTheSkyReveal delay={240}>
            <UnderTheSkyPressable
              onPressIn={prssInWb}
              onPressOut={prssOutWb}
              onPress={shareWoudbineInfo}
              activeOpacity={1}
            >
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <ImageBackground
                  source={require('../../assets/images/woudbinebtshr.png')}
                  style={styles.woudbinwrp}
                >
                  <Image
                    source={require('../../assets/images/woudbineshric.png')}
                  />
                  <Text style={styles.woudbinebtntxt}>Share</Text>
                </ImageBackground>
              </Animated.View>
            </UnderTheSkyPressable>
          </UnderTheSkyReveal>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1 },
  woudbinebtntxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  woudbinscrollcnt: {
    flexGrow: 1,
    paddingTop: height * 0.088,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
  },
  woudbinesectxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  woudbinwrp: {
    width: 148,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  woudbinewrppr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 38,
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

export default InfoUnderTheWoubineSky;
