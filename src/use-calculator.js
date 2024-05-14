import { useState } from 'react';

export const useCalculator = () => {
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
  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressNum,
    onPressOperator,
    onPressReset,
  };
};
