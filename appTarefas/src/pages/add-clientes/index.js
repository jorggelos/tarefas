import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Animated, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';

export default function addClientes({navigation}) {

    const api = 'http://192.168.15.8/apitarefas/';

   
    const [nome, setNome] = useState('');
    const [doc, setDoc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    
    

    const[dados, setDados] = useState([]); 

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            setDados(JSON.parse(value));
          }                    
        } catch(e) {
          // error reading value
        }
      }

      useEffect(()=> {
        getData();
      },[])



        
  const mensagemDuplicidade = () =>
  Alert.alert(
    "Erro ao Salvar",
    "CPF do Cliente já cadastrado!",
    [
      
      { text: "OK" }
    ],
    { cancelable: true }
  ); 

     async function add(){
        const cpf = dados.cpf; 
        const obj = {nome, doc, telefone, endereco, cpf};
    
        
         const res = await Axios.post(api + 'addClientes.php', obj);
         
          if(res.data.success === true){
            //mensagemSalvar();
            limparDados();
            navigation.navigate('Clientes')
            
          }
    
          if(res.data.success === 'Dado já Cadastrado!'){
            mensagemDuplicidade();
            
          }

          if(res.data.success === 'Preencha o Documento!'){
              alert('Insira o Documento');
          }


   
    }

    function limparDados(){
        setNome('');
        setTelefone('');
        setEndereco('');
        setDoc('');
    }

  return (
    <View style={styles.modal}>
      
         
        <Animatable.View  
          animation="bounceInUp"
        useNativeDriver  >

        
        <TextInput 
        type="text"
      style={styles.input}
      placeholder="Insira o Nome"
      value={nome}
      onChangeText={ (nome) => setNome(nome)}
      />

      <TextInput 
      style={styles.input}
      placeholder="Insira o Documento"
      value={doc}
      onChangeText={ (doc) => setDoc(doc)}
      />

<TextInput 
      style={styles.input}
      placeholder="Insira o Telefone"
      value={telefone}
      onChangeText={ (telefone) => setTelefone(telefone)}
      />

<TextInput 
      style={styles.input}
      placeholder="Insira o Endereço"
      value={endereco}
      onChangeText={ (endereco) => setEndereco(endereco)}
      />





      
      <TouchableOpacity  
      style={styles.botaoModal}
      onPress={add}
      >
        <Text  style={styles.textoBotaoModal}>Salvar</Text>
      </TouchableOpacity>
       

        </Animatable.View>

       
    </View>
  );
}

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        backgroundColor:'#e9ecea',
        marginTop:15,
      },
    
      textoModal:{
        
        color: '#FFF',
        
        marginLeft: 15,
        fontSize:16,
        
        
      },
    
        
    
      input:{
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 8,
        padding: 8,
        color: '#000',
        fontSize:13
      },
      botaoModal:{
        backgroundColor: '#00335c',
        borderRadius: 5,
        margin: 5,
        padding: 12,
        color: '#FFF',
        alignItems:'center',
        justifyContent:'center',
        
      },
      textoBotaoModal:{
        fontSize:16,
        color:'#FFF',
    
      },
      areaData:{
          flexDirection:'row',
          padding:15,
          marginRight:10,
      },

      areaHora:{
        flexDirection:'row',
        padding:15,
        marginRight:10,
    },
    datas:{
        flexDirection:'row',
        justifyContent:'center',
    }
});
