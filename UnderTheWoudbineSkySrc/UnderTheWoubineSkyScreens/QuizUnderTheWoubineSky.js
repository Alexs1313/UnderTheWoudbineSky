import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import UnderTheSkyPressable from '../UnderTheWoubineSkyComponents/UnderTheSkyPressable';
import UnderTheSkyReveal from '../UnderTheWoubineSkyComponents/UnderTheSkyReveal';

const { height } = Dimensions.get('window');
const answerDefaultGradient = ['#E11712', '#7B0D0A'];
const answerCorrectGradient = ['#4CAF50', '#5F9A61'];
const answerWrongGradient = ['#8B2E2E', '#B74747'];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the capital city of Canada?',
    options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
    correct: 2,
  },
  {
    id: 2,
    question: 'Which province is the largest by area?',
    options: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    correct: 1,
  },
  {
    id: 3,
    question: 'Which natural landmark is one of the most famous in Canada?',
    options: ['Grand Canyon', 'Niagara Falls', 'Yellowstone', 'Mount Everest'],
    correct: 1,
  },
  {
    id: 4,
    question: 'Which symbol is most commonly associated with Canada?',
    options: ['Eagle', 'Maple leaf', 'Lion', 'Bear'],
    correct: 1,
  },
  {
    id: 5,
    question: 'In which city can you find the CN Tower?',
    options: ['Ottawa', 'Toronto', 'Calgary', 'Quebec City'],
    correct: 1,
  },
  {
    id: 6,
    question: 'Which ocean borders Canada on the west?',
    options: [
      'Atlantic Ocean',
      'Indian Ocean',
      'Arctic Ocean',
      'Pacific Ocean',
    ],
    correct: 3,
  },
  {
    id: 7,
    question:
      'Which national park in Alberta is known for its turquoise lakes?',
    options: ['Banff', 'Yosemite', 'Sequoia', 'Denali'],
    correct: 0,
  },
  {
    id: 8,
    question: 'Which language is NOT an official language of Canada?',
    options: [
      'English',
      'French',
      'Spanish',
      'Both English and French are official',
    ],
    correct: 2,
  },
  {
    id: 9,
    question:
      'What is a traditional snow dwelling used by some Indigenous peoples in northern Canada?',
    options: ['Yurt', 'Teepee', 'Igloo', 'Cabin'],
    correct: 2,
  },
  {
    id: 10,
    question: 'Which city is famous for its historic European-style old town?',
    options: ['Quebec City', 'Winnipeg', 'Edmonton', 'Halifax'],
    correct: 0,
  },
  {
    id: 11,
    question: 'Which animal appears on the Canadian five-cent coin?',
    options: ['Deer', 'Beaver', 'Wolf', 'Lynx'],
    correct: 1,
  },
  {
    id: 12,
    question: 'Where can you commonly see the Northern Lights in Canada?',
    options: [
      'Southern Ontario',
      'Yukon',
      'Downtown Montreal',
      'Only in the mountains',
    ],
    correct: 1,
  },
  {
    id: 13,
    question:
      'What is the name of the scenic highway through the Canadian Rockies?',
    options: [
      'Pacific Coast Highway',
      'Icefields Parkway',
      'Route 66',
      'Andean Road',
    ],
    correct: 1,
  },
  {
    id: 14,
    question: 'What can users collect in the Under the Woudbine Sky app?',
    options: [
      'Points',
      'Virtual currency',
      'Marks and visited locations',
      'Avatars',
    ],
    correct: 2,
  },
  {
    id: 15,
    question: 'Who guides users through legends and stories in the app?',
    options: ['Mark', 'Tom', 'Celine', 'Anonymous narrator'],
    correct: 2,
  },
];

const QuizUnderTheWoubineSky = () => {
  const navigation = useNavigation();
  const [showWoudbineMenu, setShowWoudbineMenu] = useState(false);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shakeTarget, setShakeTarget] = useState(null);
  const [score, setScore] = useState(0);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const question = quizQuestions[current];

  const pressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const resetQuiz = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  const chooseAnswer = index => {
    if (selected !== null) return;

    setSelected(index);
    const isCorrect = index === question.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setShakeTarget(index);
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
    }

    setTimeout(() => {
      if (current < quizQuestions.length - 1) {
        setCurrent(prev => prev + 1);
        setSelected(null);
        setShakeTarget(null);
        shakeAnim.setValue(0);
        return;
      }

      const totalScore = score + (isCorrect ? 1 : 0);
      Alert.alert(
        'Quiz finished!',
        `You answered correctly ${totalScore} out of ${quizQuestions.length} questions.`,
        [
          {
            text: 'Restart',
            onPress: resetQuiz,
          },
          {
            text: 'Exit',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    }, 1000);
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
        <UnderTheSkyReveal delay={0}>
          <View style={styles.woudbinewrppr}>
            <Text style={styles.woudbinelbltxt}>Quiz</Text>
            <UnderTheSkyPressable
              activeOpacity={0.7}
              onPress={() => setShowWoudbineMenu(true)}
            >
              <Image source={require('../../assets/images/woudbineburg.png')} />
            </UnderTheSkyPressable>
          </View>
        </UnderTheSkyReveal>

        {showWoudbineMenu && (
          <Modal transparent animationType="fade">
            <View style={styles.wdMenu}>
              <View style={styles.wdMenuHeader}>
                <Text style={styles.woudbinepoptxt}>Menu</Text>
                <UnderTheSkyPressable
                  activeOpacity={0.66}
                  onPress={() => setShowWoudbineMenu(false)}
                >
                  <Image
                    source={require('../../assets/images/woudbinecls.png')}
                  />
                </UnderTheSkyPressable>
              </View>

              <UnderTheSkyPressable
                activeOpacity={0.66}
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
                activeOpacity={0.66}
                onPress={() => {
                  navigation.navigate('SavedUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Saved places</Text>
              </UnderTheSkyPressable>

              <UnderTheSkyPressable
                style={{ marginTop: 19 }}
                activeOpacity={0.66}
                onPress={() => {
                  navigation.navigate('InfoUnderTheWoubineSky');
                  setShowWoudbineMenu(false);
                }}
              >
                <Text style={styles.woudbinepopsectxt}>Information</Text>
              </UnderTheSkyPressable>

              {Platform.OS === 'ios' && (
                <UnderTheSkyPressable
                  style={{ marginTop: 19 }}
                  activeOpacity={0.66}
                  onPress={() => {
                    navigation.navigate('ProfileUnderTheWoubineSky');
                    setShowWoudbineMenu(false);
                  }}
                >
                  <Text style={styles.woudbinepopsectxt}>Profile</Text>
                </UnderTheSkyPressable>
              )}

              <View style={styles.menuSelected}>
                <Image
                  source={require('../../assets/images/woudbineselscr.png')}
                />
                <Text style={styles.woudbinepoptxt}>QUIZ</Text>
              </View>
            </View>
          </Modal>
        )}

        {!started ? (
          <>
            <UnderTheSkyReveal delay={80}>
              <LinearGradient
                colors={['#E11712', '#7B0D0A']}
                style={styles.introGradient}
              >
                <View style={styles.introInner}>
                  <Text style={styles.woudbinefacttxt}>
                    This quiz is not about speed. It is about attention. Answer
                    each question and test how well you know Canada and the world
                    of Under the Woudbine Sky.
                  </Text>
                  <Image
                    source={require('../../assets/images/woudbinefctim.png')}
                    style={styles.introImage}
                  />
                </View>
              </LinearGradient>
            </UnderTheSkyReveal>

            <UnderTheSkyReveal delay={160}>
              <UnderTheSkyPressable
                activeOpacity={1}
                onPressIn={pressIn}
                onPressOut={pressOut}
                onPress={() => setStarted(true)}
                style={{ alignSelf: 'center', marginTop: 20 }}
              >
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <ImageBackground
                    source={require('../../assets/images/woudbinebtshr.png')}
                    style={styles.woudbinwrp}
                  >
                    <Text style={styles.woudbinebtntxt}>Start quiz</Text>
                  </ImageBackground>
                </Animated.View>
              </UnderTheSkyPressable>
            </UnderTheSkyReveal>
          </>
        ) : (
          <>
            <UnderTheSkyReveal delay={60}>
              <View style={styles.quizCard}>
                <Text style={styles.quizQuestion}>
                  {current + 1}. {question.question}
                </Text>
              </View>
            </UnderTheSkyReveal>

            {question.options.map((option, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === question.correct;
              const shouldShake =
                isSelected && shakeTarget === idx && !isCorrect;

              return (
                <Animated.View
                  key={`${question.id}-${option}`}
                  style={{
                    transform: [{ translateX: shouldShake ? shakeAnim : 0 }],
                  }}
                >
                  <UnderTheSkyPressable
                    activeOpacity={0.8}
                    onPress={() => chooseAnswer(idx)}
                    disabled={selected !== null}
                  >
                    <LinearGradient
                      colors={
                        isSelected
                          ? isCorrect
                            ? answerCorrectGradient
                            : answerWrongGradient
                          : answerDefaultGradient
                      }
                      style={styles.answerBtn}
                    >
                      <View style={{ paddingHorizontal: 20 }}>
                        <Text style={styles.answerText}>
                          {String.fromCharCode(65 + idx)}. {option}
                        </Text>
                      </View>
                    </LinearGradient>
                  </UnderTheSkyPressable>
                </Animated.View>
              );
            })}

            <UnderTheSkyPressable
              activeOpacity={1}
              onPressIn={pressIn}
              onPressOut={pressOut}
              onPress={() => navigation.goBack()}
              style={{ alignSelf: 'center', marginTop: 22 }}
            >
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <ImageBackground
                  source={require('../../assets/images/woudbinebtshr.png')}
                  style={styles.woudbinwrp}
                >
                  <Text style={styles.woudbinebtntxt}>Exit quiz</Text>
                </ImageBackground>
              </Animated.View>
            </UnderTheSkyPressable>
          </>
        )}
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
    paddingBottom: 30,
  },
  woudbinewrppr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Raleway-Black',
  },
  woudbinesectxt: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Raleway-Black',
    marginBottom: 20,
  },
  quizCard: {
    backgroundColor: '#171717',
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  introGradient: {
    marginBottom: 23,
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
  },
  introInner: {
    paddingHorizontal: 16,
    padding: 20,
    minHeight: 162,
    justifyContent: 'center',
  },
  woudbinefacttxt: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Raleway-Medium',
    width: '68%',
    lineHeight: 22,
  },
  introImage: {
    position: 'absolute',
    bottom: 0,
    right: 12,
  },
  quizQuestion: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
    lineHeight: 24,
    textAlign: 'center',
  },
  answerBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 14,
    width: '100%',
    overflow: 'hidden',
  },
  answerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Raleway-SemiBold',
  },
  woudbinwrp: {
    width: 170,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1E1E1E',
    overflow: 'hidden',
    marginTop: 8,
  },
  woudbinebtntxt: {
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
    marginTop: 19,
  },
});

export default QuizUnderTheWoubineSky;
