import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../../screens/Dashboard/Dashboard';
import SpendingLimit from '../../screens/SpendingLimit/SpendingLimit';
import {ROUTES} from '../../constants/strings';
import {DebitCardStackParamList} from '../../interface';

const Stack = createNativeStackNavigator<DebitCardStackParamList>();

const DebitCardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName={ROUTES.DASHBOARD as keyof DebitCardStackParamList}>
      <Stack.Screen
        name={ROUTES.DASHBOARD as keyof DebitCardStackParamList}
        component={Dashboard}
      />
      <Stack.Screen
        name={ROUTES.SPENDING_LIMIT as keyof DebitCardStackParamList}
        component={SpendingLimit}
      />
    </Stack.Navigator>
  );
};

export default DebitCardStack;
