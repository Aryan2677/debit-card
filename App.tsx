import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import BottomTabs from './src/navigation/bottomNavigation/BottomTabs';

// Main app component with Redux store and navigation setup
const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
