import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function App() {
  const [input, setInput] = useState(0); //보여지는 input 창의 숫자
  const [currentOperator, setCurrentOperator] = useState(null); //선택된 기호 - 현재 버튼의 보더가 있는 것
  const [result, setResult] = useState(null); //기호 이전의 input 숫자
  // 값이 나온 이후('='을 선택한 이후)
  const [tempInput, setTempInput] = useState(null); //마자막 input의 숫자
  const [tempOperator, setTempOperator] = useState(null); //마자막 선택한 기호

  return (
    <SafeAreaView style={styles.container}>
      <Text>calculator</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
