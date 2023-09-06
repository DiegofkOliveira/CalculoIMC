import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

import {TextInput ,Button} from 'react-native-paper';
import {useState} from 'react';


function calculoIMC(peso, altura) {
  const calculoFinal = peso / (altura * altura);
  return calculoFinal;
}

export default function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(0);
  const [legenda, setLegenda] = useState('');
  const [cor, setCor] = useState('#FFFFFF');

  function tabela(calculoFinal) {
    if (calculoFinal < 18.5) {
      setLegenda('Magreza');
      setCor('#e74c3c');
    } else if (calculoFinal >= 18.5 && calculoFinal < 25) {
      setLegenda('Normal');
      setCor('#2ecc71');
    } else if (calculoFinal >= 25 && calculoFinal < 30) {
      setLegenda('Sobrepeso');
      setCor('#f1c40f');
    } else if (calculoFinal >= 30 && calculoFinal < 40) {
      setLegenda('Obesidade');
      setCor('#e67e22');
    } else {
      setLegenda('Obesidade grave');
      setCor('#e74c3c');
    }
  }

  function calcularIMC() {
    if (altura && peso) {
      const alturaFloat = parseFloat(altura.replace(',', '.'));
      const pesoFloat = parseFloat(peso.replace(',', '.'));
      const calculoFinal = calculoIMC(pesoFloat, alturaFloat);
      setImc(calculoFinal);
      tabela(calculoFinal);
    } else {
      alert('Por favor, preencha os campos de peso e altura.');
    }
  }

  return (
    <View style={styles.app}>
      <Text style={styles.legenda}>Seu IMC</Text>
      <View style={[styles.painel, { backgroundColor: cor}]}>
        <Text style={styles.resultado}>{imc.toFixed(2)}</Text>
        <Text style={styles.diagnostico}>{legenda}</Text>
      </View>
      <View>
        <TextInput
          style={styles.peso}
          label="Peso"
          onChangeText={(valor) => setPeso(valor)}
        />
        <TextInput
          style={styles.altura}
          label="Altura"
          onChangeText={(valor) => setAltura(valor)}
        />
        <Button mode="contained" onPress={calcularIMC}>
          Calcular
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    padding: 10,
  },
  painel: {
    alignSelf: 'center',
    borderRadius: 5,
    width: 150,
    marginVertical: 10,
    padding: 8,
  },
  legenda: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultado: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  diagnostico: {
    textAlign: 'center',
    fontSize: 16,
  },
  peso: {
    marginVertical: 10,
  },
  altura: {
    marginVertical: 10,
  },
})