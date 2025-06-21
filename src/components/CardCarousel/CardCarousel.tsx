import React, {useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {styles} from './CardCarousel.styles';
import DebitCard from '../DebitCard/DebitCard';
import {CardData} from '../../interface';
import {STRINGS} from '../../constants/strings';

const {width} = Dimensions.get('window');
const DASHBOARD_PADDING = 24;
const CARD_WIDTH = width - DASHBOARD_PADDING * 2;
const CARD_SPACING = 20;

interface CardCarouselProps {
  cards: CardData[];
  activeCardIndex: number;
  onCardChange: (index: number) => void;
  onToggleFreeze: (cardId: number) => void;
  onAddCard: () => void;
}

// Horizontal scrollable card carousel with indicators
const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  activeCardIndex,
  onCardChange,
  onToggleFreeze,
  onAddCard,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(activeCardIndex);

  // Handle scroll events to update active card
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;

    const pageIndex = Math.round(contentOffset.x / (CARD_WIDTH + CARD_SPACING));

    if (
      pageIndex !== currentIndex &&
      pageIndex >= 0 &&
      pageIndex < cards.length
    ) {
      setCurrentIndex(pageIndex);
      onCardChange(pageIndex);
    }
  };

  // Programmatically scroll to specific card
  const scrollToCard = (index: number) => {
    if (scrollViewRef.current && index >= 0 && index < cards.length) {
      scrollViewRef.current.scrollTo({
        x: index * (CARD_WIDTH + CARD_SPACING),
        animated: true,
      });
      setCurrentIndex(index);
      onCardChange(index);
    }
  };

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{STRINGS.noCardsAvailable}</Text>
        <Text style={styles.emptySubtitle}>{STRINGS.addFirstCardSubtitle}</Text>
        <TouchableOpacity style={styles.addFirstCardButton} onPress={onAddCard}>
          <Text style={styles.addFirstCardButtonText}>{STRINGS.addCard}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        pagingEnabled={false}
        bounces={false}>
        {cards.map((card, index) => (
          <View
            key={card.id}
            style={[
              styles.cardContainer,
              index === cards.length - 1 && styles.lastCardContainer,
            ]}>
            <DebitCard
              cardHolderName={card.cardHolderName}
              cardNumber={card.cardNumber}
              cardCVV={card.cvv}
              cardExpiry={card.expiryDate}
              cardName={card.cardName}
              isFrozen={card.isFrozen}
              cardType={card.cardType}
              onToggleFreeze={() => onToggleFreeze(card.id)}
            />
          </View>
        ))}
      </ScrollView>

      {cards.length > 1 && (
        <View style={styles.indicatorContainer}>
          {cards.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
              onPress={() => scrollToCard(index)}
            />
          ))}
        </View>
      )}

      <View style={styles.cardCounter}>
        <Text style={styles.cardCounterText}>
          {currentIndex + 1}
          {STRINGS.cardCounterFormat}
          {cards.length}
        </Text>
      </View>

      <TouchableOpacity style={styles.addCardButton} onPress={onAddCard}>
        <Text style={styles.addCardButtonText}>{STRINGS.addNewCardButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardCarousel;
