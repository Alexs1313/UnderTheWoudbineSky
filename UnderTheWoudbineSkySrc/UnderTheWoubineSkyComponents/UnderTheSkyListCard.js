import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const UnderTheSkyListCard = ({ location, selectedScreen }) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={location.woudbineimg}
      style={styles.woudbinewlccont}
    >
      <LinearGradient
        colors={['#00000000', '#000000']}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <View style={styles.woudbinecntwrppr}>
          <View style={{ width: '70%' }}>
            <Text style={[styles.woudbinelbltxt, { marginBottom: 4 }]}>
              {location.woudbinettl}
            </Text>
            <Text style={styles.woudbinedesctxt}>
              {location.woudbinelat}° N {location.woudbinelon}° W
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {selectedScreen === 'savedScreen' && (
              <Image
                source={require('../../assets/images/woudbinesvdls.png')}
              />
            )}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('DetailsUnderTheWoubineSky', {
                  location,
                  selectedScreen,
                });
              }}
            >
              <Image source={require('../../assets/images/woudbineopn.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  woudbinewlccont: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 26,
    overflow: 'hidden',
    borderRadius: 12,
    height: 162,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  woudbinewrppr: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 38,
  },
  woudbinecntwrppr: {
    padding: 16,
    paddingBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  woudbinelbltxt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Black',
    width: '90%',
  },
  woudbinedesctxt: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Raleway-Regular',
  },
});

export default UnderTheSkyListCard;
