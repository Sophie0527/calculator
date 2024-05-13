import React, { useState } from 'react';
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
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: 'black',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default () => {
  const [input, setInput] = useState(0); //보여지는 input 창의 숫자
  const [currentOperator, setCurrentOperator] = useState(null); //선택된 기호 - 현재 버튼의 보더가 있는 것
  const [result, setResult] = useState(null); //기호 이전의 input 숫자
  // 값이 나온 이후('='을 선택한 이후)
  const [tempInput, setTempInput] = useState(null); //마자막 input의 숫자
  const [tempOperator, setTempOperator] = useState(null); //마자막 선택한 기호
  // 바로 직전에 연산자를 클릭 했는지 여부
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  // 직전에 '='를 눌렀는지 여부
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  // input 값이 있는지 없는지 여부
  const hasInput = !!input; // 같은 의미: const hasInput = input ? true : false;

  const onPressNum = (num) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = Number(`${input}${num}`);
      setInput(newInput);
    }
  };

  const onPressOperator = (operator) => {
    if (operator !== '=') {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;
      switch (finalOperator) {
        case '+':
          finalResult = result + finalInput;
          break;
        case '-':
          finalResult = result - finalInput;
          break;
        case '*':
          finalResult = result * finalInput;
          break;
        case '/':
          finalResult = result / finalInput;
          break;
        default:
          break;
      }
      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return (
    <View style={{ flex: 1, width: 250, justifyContent: 'center' }}>
      <Text>input:{input}</Text>
      <Text>currentOperator:{currentOperator}</Text>
      <Text>result:{result}</Text>
      <Text>tempInput:{tempInput}</Text>
      <Text>tempOperator:{tempOperator}</Text>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: '#fff', fontSize: 35, textAlign: 'right' }}>
          {input}
        </Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <ButtonContainer>
        <Button
          type="reset"
          text={hasInput ? 'C' : 'AC'}
          onPress={onPressReset}
          flex={3}
        />
        <Button
          type="operator"
          text="/"
          onPress={() => onPressOperator('/')}
          flex={1}
          isSelected={currentOperator === '/'}
        />
      </ButtonContainer>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`}
            type="reset"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="*"
          onPress={() => onPressOperator('*')}
          flex={1}
          isSelected={currentOperator === '*'}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type="reset"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="-"
          onPress={() => onPressOperator('-')}
          flex={1}
          isSelected={currentOperator === '-'}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type="reset"
            text={`${num}`}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type="operator"
          text="+"
          onPress={() => onPressOperator('+')}
          flex={1}
          isSelected={currentOperator === '+'}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button type="reset" text="0" onPress={() => onPressNum(0)} flex={3} />
        <Button
          type="operator"
          text="="
          onPress={() => onPressOperator('=')}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 5px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
