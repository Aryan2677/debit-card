import {View, Text, Image, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './SettingsRow.styles';
import {COLORS} from '../../constants/colors';

type SettingsRowProps = {
  icon: any;
  title: string;
  description: string;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchPress?: (value: boolean) => void;
  onPress?: () => void;
};

const SettingsRow = ({
  icon,
  title,
  description,
  isSwitch = false,
  switchValue = false,
  onSwitchPress = () => {},
  onPress = () => {},
}: SettingsRowProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftContainer}
        onPress={onPress}
        activeOpacity={0.7}>
        <Image style={styles.icon} source={icon} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
      {isSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchPress}
          trackColor={{
            false: COLORS.GRAY,
            true: COLORS.GREEN,
          }}
          thumbColor={COLORS.WHITE}
        />
      )}
    </View>
  );
};

export default SettingsRow;
