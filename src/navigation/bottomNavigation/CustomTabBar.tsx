import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';
import {
  creditIcon,
  debitCard,
  homeIcon,
  paymentsIcon,
  profileIcon,
} from '../../assets/images';
import {ROUTES} from '../../constants/strings';

const SCREEN_ROUTES = [
  {name: ROUTES.HOME, icon: homeIcon},
  {name: ROUTES.DEBIT_CARD, icon: debitCard},
  {name: ROUTES.CREDIT, icon: creditIcon},
  {name: ROUTES.PAYMENTS, icon: paymentsIcon},
  {name: ROUTES.PROFILE, icon: profileIcon},
];

function CustomTabBar({state, navigation}: {state: any; navigation: any}) {
  const insets = useSafeAreaInsets();

  // Get the current focused route from the active tab
  const currentRoute = state.routes[state.index];
  const focusedRouteName = getFocusedRouteNameFromRoute(currentRoute);

  // Hide tab bar on SpendingLimit screen
  if (focusedRouteName === ROUTES.SPENDING_LIMIT) {
    return null;
  }

  return (
    <View
      style={[
        styles.tabContainer,
        {paddingBottom: Platform.OS === 'ios' ? Math.max(insets.bottom, 8) : 8},
      ]}>
      {SCREEN_ROUTES.map((route, index) => {
        const {name, icon} = route;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.name,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as keyof typeof ROUTES);
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={route.name}
            testID={`${route.name}-tab-button`}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabButton}>
            <Image source={icon} style={styles.tabIcon} resizeMode="contain" />
            <Text style={[styles.tabText, isFocused && styles.tabTextFocused]}>
              {name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 10,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 9,
    fontFamily: Fonts.AvenirNextMedium,
    color: COLORS.TEXT_GRAY_2,
    marginTop: 3,
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  tabTextFocused: {
    color: COLORS.GREEN,
  },
});
export default CustomTabBar;
