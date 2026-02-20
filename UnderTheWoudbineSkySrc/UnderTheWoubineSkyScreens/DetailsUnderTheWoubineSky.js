import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UnderTheSkyCardDetails from '../UnderTheWoubineSkyComponents/UnderTheSkyCardDetails';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { achievementsList } from '../UnderTheWoubineSkyData/woudbineachvs';
import LinearGradient from 'react-native-linear-gradient';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';

const VISITED_STORAGE_KEY = '@visited_places';
const ACHIEVEMENTS_STORAGE_KEY = '@achievements';
const { height } = Dimensions.get('window');

const DetailsUnderTheWoubineSky = ({ route }) => {
  const { location } = route.params;

  const { selectedScreen } = route.params;

  const navigation = useNavigation();

  const [visited, setVisited] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [unlockedWoudbineAch, setUnlockedWoudbineAch] = useState();
  const [loaded, setLoaded] = useState(false);
  const [showWoudbinePopUp, setShowWoudbinePopUp] = useState(false);
  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (showWoudbinePopUp) {
      Animated.timing(slideAnim, {
        toValue: 0,

        duration: 400,

        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showWoudbinePopUp]);

  useEffect(() => {
    if (!loaded) return;

    const visitPlace = async () => {
      if (!visited.includes(location.woudbinelid)) {
        const newVisited = [...visited, location.woudbinelid];
        setVisited(newVisited);
        await AsyncStorage.setItem(
          VISITED_STORAGE_KEY,
          JSON.stringify(newVisited),
        );

        const today = new Date();
        const formattedDate = `${String(today.getDate()).padStart(
          2,
          '0',
        )}.${String(today.getMonth() + 1).padStart(
          2,
          '0',
        )}.${today.getFullYear()}`;

        const newAchievements = achievementsList
          .filter(a => newVisited.length >= a.required)
          .map(a => a.id);

        const isUnlckdAch = newAchievements.filter(
          a => !achievements.some(existing => existing.id === a),
        );

        const updatedAchievements = [
          ...achievements,
          ...isUnlckdAch.map(aId => ({
            id: aId,
            date: formattedDate,
          })),
        ];

        if (isUnlckdAch.length > 0) {
          const ach = achievementsList.find(a => a.id === isUnlckdAch[0]);
          setUnlockedWoudbineAch(ach);
          setTimeout(() => setShowWoudbinePopUp(true), 800);
          setTimeout(() => setShowWoudbinePopUp(false), 5000);
        }

        setAchievements(updatedAchievements);
        await AsyncStorage.setItem(
          ACHIEVEMENTS_STORAGE_KEY,
          JSON.stringify(updatedAchievements),
        );
      }
    };

    visitPlace();
  }, [loaded]);

  useEffect(() => {
    const loadSvdVstdData = async () => {
      try {
        const storedVisited = await AsyncStorage.getItem(VISITED_STORAGE_KEY);
        const storedAchievements = await AsyncStorage.getItem(
          ACHIEVEMENTS_STORAGE_KEY,
        );

        if (storedVisited) setVisited(JSON.parse(storedVisited));
        if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
      } catch (error) {
        console.error('error', error);
      } finally {
        setLoaded(true);
      }
    };
    loadSvdVstdData();
  }, []);

  return (
    <View style={styles.woudbinecnt}>
      <ScrollView contentContainerStyle={styles.woudbinscrollcnt}>
        <View style={styles.woudbinewrppr}>
          <UnderTheSkyPressable
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={require('../../assets/images/woudbineback.png')} />
          </UnderTheSkyPressable>
          {selectedScreen === 'mapScreen' && (
            <Text style={styles.woudbinelbltxt}>Interactive map</Text>
          )}
          {selectedScreen === 'savedScreen' && (
            <Text style={styles.woudbinelbltxt}>Saved places</Text>
          )}
          {selectedScreen === 'popularScreen' && (
            <Text style={styles.woudbinelbltxt}>Popular places</Text>
          )}
        </View>

        {showWoudbinePopUp && (
          <Animated.View
            style={[{ transform: [{ translateY: slideAnim }], zIndex: 20 }]}
          >
            <LinearGradient
              colors={['#E11712', '#7B0D0A']}
              style={{
                marginBottom: 23,
                borderRadius: 12,
                width: '100%',
                position: 'absolute',
                zIndex: 10,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  margin: 16,
                  padding: 16,
                  backgroundColor: '#1E1E1E',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 16,
                }}
              >
                <View style={{ maxWidth: '70%' }}>
                  <Text style={styles.woudbinepopttl}>NEW MARK</Text>
                  <Text style={styles.woudbinepopsbt}>
                    {unlockedWoudbineAch?.name}
                  </Text>
                </View>
                <Image
                  source={unlockedWoudbineAch?.img}
                  style={{ width: 75, height: 75 }}
                />
              </View>
            </LinearGradient>
          </Animated.View>
        )}

        <UnderTheSkyCardDetails
          location={location}
          showWoudbinePopUp={showWoudbinePopUp}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  woudbinecnt: { flex: 1, backgroundColor: '#020302' },
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
    backgroundColor: '#020302',
    paddingBottom: 30,
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
  woudbineicn: {
    position: 'absolute',
    top: 23,
    left: 18,
    opacity: 0.5,
  },
  woudbinepopttl: { color: '#fff', fontSize: 20, fontFamily: 'Raleway-Black' },
  woudbinepopsbt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    marginTop: 8,
  },
});

export default DetailsUnderTheWoubineSky;
