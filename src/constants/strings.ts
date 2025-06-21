export const STRINGS = {
  star: '*',
  dot: '•',
  hideCardNumber: 'Hide card number',
  showCardNumber: 'Show card number',
  cvv: 'CVV',
  thru: 'Thru',

  // Dashboard & Loading Messages
  loadingDashboard: 'Loading your dashboard...',
  updatingSpendingLimit: 'Updating spending limit...',
  errorTitle: 'Error',
  failedToUpdateSpendingLimit:
    'Failed to update spending limit. Please try again.',
  okButton: 'OK',
  tapToRetry: 'Tap to retry',

  // Card Management
  addNewCard: 'Add New Card',
  cardName: 'Card Name',
  invalidCardName: 'Invalid card name',
  cardNameRequired: 'Card name is required',
  cardNameMinLength: 'Card name must be at least 2 characters',
  cardNameMaxLength: 'Card name must be less than 30 characters',
  cardNameInvalidChars: 'Card name contains invalid characters',
  cardPlaceholder: 'e.g., Travel Card, Business Card',

  // Card Modal Content
  addCardDescription:
    'Enter a name for your new debit card. The card number and expiry date will be generated automatically.',
  whatHappensNext: 'What happens next?',
  cardCreationSteps:
    '• Card number will be randomly generated\n• Expiry date will be set 2-5 years from now\n• CVV will be automatically assigned\n• Card will be ready to use immediately',
  cancel: 'Cancel',
  addCard: 'Add Card',

  // Card Carousel
  noCardsAvailable: 'No Cards Available',
  addFirstCardSubtitle: 'Add your first debit card to get started',
  addNewCardButton: '+ Add New Card',
  cardCounterFormat: ' of ', // Used in "{currentIndex + 1} of {cards.length}"

  // Settings Menu
  topUpAccount: 'Top-up account',
  topUpDescription: 'Deposit money to your account to use with card',
  weeklySpendingLimit: 'Weekly spending limit',
  spendingLimitSet: 'Your weekly spending limit is S$ ',
  noSpendingLimit: "You haven't set any spending limit on card",
  freezeCard: 'Freeze card',
  cardFrozen: ' is currently frozen',
  cardActive: ' is currently active',
  yourDebitCard: 'Your debit card',
  getNewCard: 'Get a new card',
  getNewCardDescription: 'This deactivates your current debit card',
  deactivatedCards: 'Deactivated cards',
  deactivatedCardsDescription: 'Your previously deactivated cards',

  // Spending Limit Screen
  spendingLimitTitle: 'Spending limit',
  setWeeklyLimit: 'Set a weekly debit card spending limit',
  weeklyMeansLast7Days:
    'Here weekly means the last 7 days - not the calendar week',
  amountPlaceholder: '0',
  save: 'Save',

  // Card Types
  visa: 'Visa',
  masterCard: 'MasterCard',
  discover: 'Discover',
  americanExpress: 'American Express',
  debit: 'Debit',

  // Default Values
  defaultCardHolder: 'Mark Henry',
  defaultCurrency: 'S$',
};

export const PRESET_AMOUNTS = [5000, 10000, 20000];

export const ROUTES = {
  DASHBOARD: 'Dashboard',
  SPENDING_LIMIT: 'SpendingLimit',
  CREDIT: 'Credit',
  PAYMENTS: 'Payments',
  PROFILE: 'Profile',
  HOME: 'Home',
  DEBIT_CARD: 'Debit Card',
};
