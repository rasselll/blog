import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../assets/color';

const Input = (props) => {
  const
    {
      label, iconName, value, onChangeText, placeholder,
      secureTextEntry, returnKeyType, keyboardType, autoCorrect,
      labelStyl, style, valid, touched
    } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: "center", marginHorizontal: 25 }}>
      <View style={{ alignItems: "center", width: 50 }}>
        <Icon
          size={30}
          color={color.greyColor}
          name={iconName}
        />
      </View>
      <TextInput
        style={{ flex: 1 }}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        autoCorrect={autoCorrect}
        underlineColorAndroid={!valid && touched ? 'red' : color.themeColor}
      />
    </View>
  );
};

export { Input }