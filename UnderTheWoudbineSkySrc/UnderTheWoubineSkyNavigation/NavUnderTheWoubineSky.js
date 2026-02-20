import { createStackNavigator } from '@react-navigation/stack';
import DetailsUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/DetailsUnderTheWoubineSky';
import HomeUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/HomeUnderTheWoubineSky';
import InfoUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/InfoUnderTheWoubineSky';
import LocationsListUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/LocationsListUnderTheWoubineSky';
import MapUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/MapUnderTheWoubineSky';
import MarksUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/MarksUnderTheWoubineSky';
import WelcomeUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/WelcomeUnderTheWoubineSky';
import ProfileUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/ProfileUnderTheWoubineSky';
import PopularUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/PopularUnderTheWoubineSky';
import SavedUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/SavedUnderTheWoubineSky';
import QuizUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/QuizUnderTheWoubineSky';
import RegistrationUnderTheWoubineSky from '../UnderTheWoubineSkyScreens/RegistrationUnderTheWoubineSky';
const Stack = createStackNavigator();

const NavUnderTheWoubineSky = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="WelcomeUnderTheWoubineSky"
        component={WelcomeUnderTheWoubineSky}
      />
      <Stack.Screen
        name="HomeUnderTheWoubineSky"
        component={HomeUnderTheWoubineSky}
      />
      <Stack.Screen
        name="LocationsListUnderTheWoubineSky"
        component={LocationsListUnderTheWoubineSky}
      />
      <Stack.Screen
        name="DetailsUnderTheWoubineSky"
        component={DetailsUnderTheWoubineSky}
      />
      <Stack.Screen
        name="PopularUnderTheWoubineSky"
        component={PopularUnderTheWoubineSky}
      />
      <Stack.Screen
        name="SavedUnderTheWoubineSky"
        component={SavedUnderTheWoubineSky}
      />
      <Stack.Screen
        name="MapUnderTheWoubineSky"
        component={MapUnderTheWoubineSky}
      />
      <Stack.Screen
        name="InfoUnderTheWoubineSky"
        component={InfoUnderTheWoubineSky}
      />
      <Stack.Screen
        name="MarksUnderTheWoubineSky"
        component={MarksUnderTheWoubineSky}
      />
      <Stack.Screen
        name="ProfileUnderTheWoubineSky"
        component={ProfileUnderTheWoubineSky}
      />
      <Stack.Screen
        name="QuizUnderTheWoubineSky"
        component={QuizUnderTheWoubineSky}
      />
      <Stack.Screen
        name="RegistrationUnderTheWoubineSky"
        component={RegistrationUnderTheWoubineSky}
      />
    </Stack.Navigator>
  );
};

export default NavUnderTheWoubineSky;
