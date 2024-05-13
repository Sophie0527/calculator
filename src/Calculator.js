import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const COLOR = {
  RESULT: '#4e4c51',
  RESET: '#5f5e62',
  OPERATOR: '#f39c29',
  NUM: '#5c5674',
};

// Button type: 'reset' | 'operator' | 'num'
const Button = ({ text, onPress, flex, type, isSelected }) => {
  const backgroundColor =
    type === 'reset'
      ? COLOR.RESET
      : type === 'operator'
      ? COLOR.OPERATOR
      : type === 'num'
      ? COLOR.NUM
      : 'transparent';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 0.2,
        borderColor: 'black',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default () => {
  return (
    <View style={{ flex: 1, width: 250 }}>
      {/* 결과 */}
      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button type="reset" text="AC" onPress={() => null} flex={3} />
        <Button type="operator" text="/" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        <Button type="reset" text="7" onPress={() => null} flex={1} />
        <Button type="reset" text="8" onPress={() => null} flex={1} />
        <Button type="reset" text="9" onPress={() => null} flex={1} />
        <Button type="operator" text="x" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        <Button type="reset" text="4" onPress={() => null} flex={1} />
        <Button type="reset" text="5" onPress={() => null} flex={1} />
        <Button type="reset" text="6" onPress={() => null} flex={1} />
        <Button type="operator" text="-" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        <Button type="reset" text="1" onPress={() => null} flex={1} />
        <Button type="reset" text="2" onPress={() => null} flex={1} />
        <Button type="reset" text="3" onPress={() => null} flex={1} />
        <Button type="operator" text="+" onPress={() => null} flex={1} />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="reset" text="0" onPress={() => null} flex={3} />
        <Button type="operator" text="=" onPress={() => null} flex={1} />
      </ButtonContainer>
    </View>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
