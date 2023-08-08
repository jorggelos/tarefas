
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Image, Animated, ImageBackground, Alert} from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import axios from 'axios'; // npm i axios
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({navigation}) {

    const api = 'http://192.168.15.8/apitarefas/';
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');  

  const[offset] = useState(new Animated.ValueXY({x:0, y:90}));
  const[opac] = useState(new Animated.Value(0));


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const mensagemDadosIncorretos = () =>
    Alert.alert(
      "Erro ao Logar",
      "Dados Incorretos",
      [
        
        { text: "OK"  }
      ],
      { cancelable: true }
    );   

  async function logar(){
    //navigation.navigate('Home');
    const obj = {email, senha};
    const res = await axios.post(api + 'login.php', obj);
    
    if(res.data.retorno === 'Dados corretos!'){
       
        //alert(res.data.obj.nivel);
        storeData(res.data.obj);
        navigation.navigate('Home', {nome: res.data.obj.nome});
        
        
      
    }else if(res.data.retorno === 'Dados incorretos!'){
        mensagemDadosIncorretos();
    }
    else{
        alert('Erro ao conectar com o banco de dados!')
    }
  }

  useEffect(()=> {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue:0, 
        speed:4,
        bounciness:20
      }),
      Animated.timing(opac, {
        toValue:1,
        duration:1000,
      })
    ]).start();
   
  }, []);
  
  return (
    <ImageBackground source={require('../../../assets/img/fundo3.jpg')} style={styles.imgBg} >
                
    <KeyboardAvoidingView 
    style={styles.background}>
     <View style={styles.logo}>
       <Image style={{width:320}} resizeMode = "contain" source={require('../../../assets/img/logo2.png')}></Image>
     </View>

    <Animated.View 
    style={[styles.formulario,
      {
        opacity: opac,
        transform: [{translateY: offset.y}]
      }
    
    ]}>
      
      <TextInput 
      style={styles.input}
      placeholder="Insira seu Email"
      type='email'
      dataCorrect={false}
      value={email}
      onChangeText={(email)=> setEmail(email)}
      ></TextInput>

      <TextInput
      style={styles.input}
      placeholder="Senha"
      secureTextEntry={true}
      dataCorrect={false}
      value={senha}
      onChangeText={(senha)=> setSenha(senha)}
      ></TextInput>
      
      <View style={styles.viewBotao}>
      <TouchableOpacity 
        style={styles.botao}
       onPress={() => logar()}>
         <Text style={styles.textoBotao}>Logar</Text>
      </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.botaoRecuperar}
       onPress={() => navigation.navigate('Home')}>
         <Text style={styles.textoRecuperar}>Recuperar Senha</Text>
      </TouchableOpacity>

    </Animated.View>

     
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    flex: 1,
    
    justifyContent: 'center',
  },

  formulario: {
    flex: 1,
    paddingBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop:-50
  },

  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding:10,
    width: '90%'
  },

  viewBotao:{
    width: '90%',
    borderRadius: 7,
  },

  botao: {
    backgroundColor: '#037a58',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 7,
    padding:10,
    
    
  },
  textoBotao:{
    color:'#FFF',
    fontSize:18
  },

  botaoRecuperar:{
    marginTop:15,
  },

  textoRecuperar:{
    color:'#FFF',
    
  },

  imgBg:{
    flex:1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: '#000'
  },
});
