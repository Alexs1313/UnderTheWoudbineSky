import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { achievementsList } from '../UnderTheWoubineSkyData/woudbineachvs';

const { height } = Dimensions.get('window');

const MarksUnderTheWoubineSky = () => {
  const navigation = useNavigation();
  const [achievements, setAchievements] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;
  const backScale = useRef(new Animated.Value(1)).current;
  const shareScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedAchievements = await AsyncStorage.getItem('@achievements');
        if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
      } catch (error) {
        console.error('error', error);
      }
    };
    loadData();

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

  const pressIn = scale => {
    Animated.spring(scale, {
      toValue: 0.95,

      useNativeDriver: true,
    }).start();
  };

  const pressOut = scale => {
    Animated.spring(scale, {
      toValue: 1,

      friction: 4,

      useNativeDriver: true,
    }).start();
  };

  const shareWoudbineMark = async selectedMark => {
    try {
      await Share.share({
        message: `${selectedMark.name}`,
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
          <View style={styles.woudbinewrppr}>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={() => pressIn(backScale)}
              onPressOut={() => pressOut(backScale)}
              onPress={() => navigation.goBack()}
            >
              <Animated.View style={{ transform: [{ scale: backScale }] }}>
                <Image
                  source={require('../../assets/images/woudbineback.png')}
                />
              </Animated.View>
            </TouchableOpacity>

            <Text style={styles.woudbinettl}>Marks</Text>
          </View>
        </Animated.View>

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
                This is where I keep your bookmarks for places you've visited.
              </Text>

              <Image
                source={require('../../assets/images/woudbinefctim.png')}
                style={{ position: 'absolute', bottom: 0, right: 0 }}
              />
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          {achievementsList.map((a, idx) => {
            const achData = achievements.find(ach => ach.id === a.id);
            const unlocked = !!achData;

            return (
              <View
                key={idx}
                style={unlocked ? styles.woudbineunl : styles.woudbinelck}
              >
                <View style={{ width: '65%' }}>
                  {unlocked ? (
                    <>
                      <Text style={styles.woudbinedtatxt}>{achData.date}</Text>
                      <Text style={styles.woudbinelbltxt}>{a.name}</Text>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPressIn={() => pressIn(shareScale)}
                        onPressOut={() => pressOut(shareScale)}
                        onPress={() => shareWoudbineMark(a)}
                        style={styles.woudbineshrbtn}
                      >
                        <Animated.View
                          style={{
                            transform: [{ scale: shareScale }],
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Image
                            source={require('../../assets/images/woudbineshare.png')}
                          />
                          <Text style={styles.woudbineshrbtntxt}>
                            Share mark
                          </Text>
                        </Animated.View>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={styles.woudbinelbltxt}>{a.name}</Text>
                  )}
                </View>

                <Image source={a.img} style={{ width: 75, height: 75 }} />
              </View>
            );
          })}
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
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    width: '80%',
  },
  woudbinettl: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
  },
  woudbinewrppr: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 38,
  },
  woudbinefacttxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
    marginBottom: 30,
    width: '65%',
  },
  woudbineunl: {
    width: '100%',
    padding: 16,
    marginBottom: 11,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 50,
    borderRadius: 12,
  },
  woudbinelck: {
    width: '100%',
    padding: 19,
    marginBottom: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    opacity: 0.5,
    borderRadius: 12,
  },
  woudbinedtatxt: {
    color: '#E11712',
    fontSize: 13,
    fontFamily: 'Raleway-Bold',
    marginBottom: 8,
  },
  woudbineshrbtn: {
    width: 148,
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 23,
    overflow: 'hidden',
  },
  woudbineshrbtntxt: {
    color: '#7B0D0A',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
});

export default MarksUnderTheWoubineSky;
