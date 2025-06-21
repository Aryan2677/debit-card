import {View, SafeAreaView, ScrollView, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import CardCarousel from '../../components/CardCarousel/CardCarousel';
import AddCardModal from '../../components/AddCardModal/AddCardModal';
import {getListData} from '../../constants/data';
import SettingsRow from '../../components/SettingsRow/SettingsRow';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import SpendingProgress from '../../components/SpendingProgress/SpendingProgress';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  fetchUserDataRequest,
  fetchCardsRequest,
  addCardRequest,
  toggleCardFreezeRequest,
  setActiveCard,
} from '../../store/slices/dashboardSlice';
import {
  fetchSpendingLimitRequest,
  updateSpendingLimitRequest,
  clearError as clearSpendingError,
} from '../../store/slices/spendingLimitSlice';
import {DashboardProps} from '../../interface';
import {styles} from './Dashboard.styles';
import {STRINGS} from '../../constants/strings';

// Main dashboard screen with Redux integration
const Dashboard = ({navigation, route}: DashboardProps) => {
  const dispatch = useAppDispatch();
  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(true);

  const {
    userData,
    cards,
    activeCardIndex,
    loading: dashboardLoading,
    addingCard,
    error: dashboardError,
  } = useAppSelector(state => state.dashboard);

  const {
    data: spendingLimitData,
    loading: spendingLoading,
    updating: spendingUpdating,
    error: spendingError,
  } = useAppSelector(state => state.spendingLimit);

  // Initialize dashboard data on component mount
  useEffect(() => {
    dispatch(fetchUserDataRequest());
    dispatch(fetchCardsRequest());
    dispatch(fetchSpendingLimitRequest());
  }, [dispatch]);

  useEffect(() => {
    if (route.params?.newSpendingLimit) {
      const newLimit = route.params.newSpendingLimit;
      dispatch(updateSpendingLimitRequest(newLimit));
    }
  }, [route.params?.newSpendingLimit, dispatch]);

  useEffect(() => {
    if (spendingError) {
      Alert.alert(STRINGS.errorTitle, STRINGS.failedToUpdateSpendingLimit, [
        {text: STRINGS.okButton, onPress: () => dispatch(clearSpendingError())},
      ]);
    }
  }, [spendingError, dispatch]);

  if (
    (spendingLoading && !spendingLimitData) ||
    (dashboardLoading && (!userData || cards.length === 0))
  ) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <LoadingSpinner message={STRINGS.loadingDashboard} />
      </SafeAreaView>
    );
  }

  if (
    (spendingError && !spendingLimitData) ||
    (dashboardError && (!userData || cards.length === 0))
  ) {
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ {spendingError || dashboardError}
          </Text>
          <Text
            style={styles.retryText}
            onPress={() => {
              dispatch(fetchUserDataRequest());
              dispatch(fetchCardsRequest());
              dispatch(fetchSpendingLimitRequest());
            }}>
            {STRINGS.tapToRetry}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentSpending = spendingLimitData?.currentSpending || 0;
  const weeklyLimit = spendingLimitData?.weeklyLimit || 0;
  const availableBalance = userData?.availableBalance || 0;
  const currency = userData?.currency || 'S$';

  // Card management handlers
  const handleAddCard = (cardName: string) => {
    dispatch(addCardRequest({cardName}));
    setIsAddCardModalVisible(false);
  };

  const handleToggleFreeze = (cardId: number) => {
    dispatch(toggleCardFreezeRequest(cardId));
  };

  const handleCardChange = (index: number) => {
    dispatch(setActiveCard(index));
  };

  const handleOpenAddCardModal = () => {
    setIsAddCardModalVisible(true);
  };

  const handleToggleProgressBar = () => {
    setIsProgressBarVisible(prev => !prev);
  };

  const activeCard = cards[activeCardIndex] || null;
  const listData = getListData(
    navigation,
    weeklyLimit,
    activeCard,
    handleToggleFreeze,
    handleToggleProgressBar,
    isProgressBarVisible,
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.outerContainer}>
        <DashboardHeader
          availableBalance={availableBalance}
          currency={currency}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.scrollPadding} />
          <View>
            <View style={styles.cardContainer}>
              <CardCarousel
                cards={cards}
                activeCardIndex={activeCardIndex}
                onCardChange={handleCardChange}
                onToggleFreeze={handleToggleFreeze}
                onAddCard={handleOpenAddCardModal}
              />
            </View>
            <View style={styles.curve} />
          </View>
          {/* Spending Progress Bar - Only show if visible */}
          {isProgressBarVisible && (
            <View style={styles.progressContainer}>
              {spendingUpdating ? (
                <View style={styles.progressLoading}>
                  <LoadingSpinner size="small" message="" />
                  <Text style={styles.loadingText}>
                    {STRINGS.updatingSpendingLimit}
                  </Text>
                </View>
              ) : (
                <SpendingProgress
                  currentSpending={currentSpending}
                  spendingLimit={weeklyLimit}
                />
              )}
            </View>
          )}
          <View style={styles.modalContainer}>
            {listData.map((item: any, index: number) => {
              return (
                <SettingsRow
                  key={index}
                  icon={item.image}
                  title={item.title}
                  description={item.description}
                  isSwitch={item?.isSwitch}
                  switchValue={item.switchValue}
                  onSwitchPress={item.onSwitchPress}
                  onPress={item.onPress}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <AddCardModal
        visible={isAddCardModalVisible}
        onClose={() => setIsAddCardModalVisible(false)}
        onAddCard={handleAddCard}
        isLoading={addingCard}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
