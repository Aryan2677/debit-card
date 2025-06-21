// Utility functions for card operations
import {STRINGS} from '../constants/strings';

/**
 * Generates a random card number with proper formatting
 * Uses realistic card number patterns (Visa, MasterCard, etc.)
 */
export const generateCardNumber = (): string => {
  const patterns = ['4', '5', '6'];

  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  let cardNumber = pattern;

  // Generate remaining 15 digits
  for (let i = 1; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }

  // Format with spaces (XXXX XXXX XXXX XXXX)
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Generates a random expiry date (MM/YY format)
 * Always generates future dates (1-5 years from now)
 */
export const generateExpiryDate = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0-indexed

  // Generate 1-5 years in the future
  const yearsToAdd = Math.floor(Math.random() * 5) + 1;
  const futureYear = currentYear + yearsToAdd;

  // Generate random month (1-12)
  const month = Math.floor(Math.random() * 12) + 1;

  // Ensure the date is in the future
  const expiryDate = new Date(futureYear, month - 1);
  const today = new Date();

  if (expiryDate <= today) {
    // If somehow we generated a past date, add another year
    return `${month.toString().padStart(2, '0')}/${(futureYear + 1)
      .toString()
      .slice(-2)}`;
  }

  return `${month.toString().padStart(2, '0')}/${futureYear
    .toString()
    .slice(-2)}`;
};

/**
 * Generates a random 3-digit CVV
 */
export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

/**
 * Generates a unique card ID
 * In a real app, this would be handled by the backend
 */
export const generateCardId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Validates card name input
 */
export const validateCardName = (
  name: string,
): {isValid: boolean; error?: string} => {
  if (!name || name.trim().length === 0) {
    return {isValid: false, error: STRINGS.cardNameRequired};
  }

  if (name.trim().length < 2) {
    return {isValid: false, error: STRINGS.cardNameMinLength};
  }

  if (name.trim().length > 30) {
    return {isValid: false, error: STRINGS.cardNameMaxLength};
  }

  // Check for special characters (allow letters, numbers, spaces, hyphens)
  const validPattern = /^[a-zA-Z0-9\s\-]+$/;
  if (!validPattern.test(name.trim())) {
    return {isValid: false, error: STRINGS.cardNameInvalidChars};
  }

  return {isValid: true};
};

/**
 * Formats card number for display (masks first 12 digits)
 * Example: 1234 5678 9012 3456 -> **** **** **** 3456
 */
export const formatCardNumberForDisplay = (
  cardNumber: string,
  showFull: boolean = false,
): string => {
  if (showFull) {
    return cardNumber;
  }

  const cleaned = cardNumber.replace(/\s/g, '');
  if (cleaned.length !== 16) {
    return cardNumber; // Return as-is if not standard format
  }

  const last4 = cleaned.slice(-4);

  return `**** **** **** ${last4}`;
};

/**
 * Determines card type based on card number
 */
export const getCardType = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (cleaned.startsWith('4')) {
    return STRINGS.visa;
  } else if (cleaned.startsWith('5') || cleaned.startsWith('2')) {
    return STRINGS.masterCard;
  } else if (cleaned.startsWith('6')) {
    return STRINGS.discover;
  } else if (cleaned.startsWith('3')) {
    return STRINGS.americanExpress;
  }

  return STRINGS.debit;
};

/**
 * Creates a new card object with generated data
 */
export const createNewCard = (
  userId: number,
  cardName: string,
  cardHolderName: string,
) => {
  const cardNumber = generateCardNumber();

  return {
    id: generateCardId(),
    userId,
    cardNumber,
    cardHolderName,
    expiryDate: generateExpiryDate(),
    cvv: generateCVV(),
    isActive: true,
    isFrozen: false,
    cardType: getCardType(cardNumber),
    cardName: cardName.trim(),
    createdAt: new Date().toISOString(),
  };
};
