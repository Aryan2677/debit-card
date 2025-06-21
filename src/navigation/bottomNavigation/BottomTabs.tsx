import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import CreditScreen from '../../screens/CreditScreen/CreditScreen';
import PaymentsScreen from '../../screens/PaymentsScreen/PaymentsScreen';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import DebitCardStack from '../stacks/DebitCardStack';
import CustomTabBar from './CustomTabBar';
import {ROUTES} from '../../constants/strings';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.DEBIT_CARD}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.DEBIT_CARD} component={DebitCardStack} />
      <Tab.Screen name={ROUTES.CREDIT} component={CreditScreen} />
      <Tab.Screen name={ROUTES.PAYMENTS} component={PaymentsScreen} />
      <Tab.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
