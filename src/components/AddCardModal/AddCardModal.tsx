import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {validateCardName} from '../../utils/cardUtils';
import {styles} from './AddCardModal.styles';
import {COLORS} from '../../constants/colors';
import {AddCardModalProps} from '../../interface';
import {STRINGS} from '../../constants/strings';

// Modal for adding new debit cards with validation
const AddCardModal: React.FC<AddCardModalProps> = ({
  visible,
  onClose,
  onAddCard,
  isLoading = false,
}) => {
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState('');

  // Validate and submit new card
  const handleAddCard = () => {
    const validation = validateCardName(cardName);

    if (!validation.isValid) {
      setError(validation.error || STRINGS.invalidCardName);
      return;
    }

    setError('');
    onAddCard(cardName.trim());
    setCardName('');
  };

  const handleClose = () => {
    setCardName('');
    setError('');
    onClose();
  };

  const handleCardNameChange = (text: string) => {
    setCardName(text);
    if (error) {
      setError('');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{STRINGS.addNewCard}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              disabled={isLoading}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.description}>{STRINGS.addCardDescription}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{STRINGS.cardName}</Text>
              <TextInput
                style={[styles.textInput, error ? styles.textInputError : null]}
                value={cardName}
                onChangeText={handleCardNameChange}
                placeholder={STRINGS.cardPlaceholder}
                placeholderTextColor={COLORS.LIGHT_GRAY}
                maxLength={30}
                editable={!isLoading}
                autoFocus
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>{STRINGS.whatHappensNext}</Text>
              <Text style={styles.infoText}>{STRINGS.cardCreationSteps}</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              disabled={isLoading}>
              <Text style={styles.cancelButtonText}>{STRINGS.cancel}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.addButton,
                !cardName.trim() || isLoading ? styles.addButtonDisabled : null,
              ]}
              onPress={handleAddCard}
              disabled={!cardName.trim() || isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.WHITE} size="small" />
              ) : (
                <Text style={styles.addButtonText}>{STRINGS.addCard}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCardModal;
