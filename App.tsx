import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ContextContainer } from './UnderTheWoudbineSkySrc/UnderTheWoubineSkyStore/underTheSkyContext';
import NavUnderTheWoubineSky from './UnderTheWoudbineSkySrc/UnderTheWoubineSkyNavigation/NavUnderTheWoubineSky';

import LoaderUnderTheWoubineSky from './UnderTheWoudbineSkySrc/UnderTheWoubineSkyComponents/LoaderUnderTheWoubineSky';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <ContextContainer>
        {!isLoading ? <NavUnderTheWoubineSky /> : <LoaderUnderTheWoubineSky />}
      </ContextContainer>
    </NavigationContainer>
  );
};

export default App;
