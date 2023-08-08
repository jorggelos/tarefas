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

export default function addTarefas({navigation}) {

    const api = 'http://192.168.15.8/apitarefas/';

    const [strData, setStrData] = useState('DATA TAREFA');
    const [strHora, setStrHora] = useState('HORA TAREFA');

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

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



      
  const [date, setDate] = useState(new Date());
  const [dataInserir, setDataInserir] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    //setDate(currentDate);

    //alert(currentDate.getMinutes());
    
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();



    var formatterDay;	
    if (day < 10) {
        formatterDay = '0'+ day;
    } else {
        formatterDay = day;
    }
		
    var formatterMonth;	
    if (month < 10) {
        formatterMonth = '0'+ month;
    } else {
        formatterMonth = month;
    }

    //DATA NO MODELO BRASILEIRO
    var dateFormattedBra =  formatterDay +'/'+ formatterMonth +'/'+ year;
    
    //DATA NO MODELO AMERICANO
    var dateFormatted =  year +'-'+ formatterMonth +'-'+ formatterDay;
    
    setDataInserir(dateFormatted);
    
    //alert(dateFormatted);
    setStrData(dateFormattedBra);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    
  };




  const [horaInserir, setHoraInserir] = useState('');
  const [showHora, setShowHora] = useState(false); 

  const onChangeHora = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowHora(Platform.OS === 'ios');
    //setDate(currentDate);

    //alert(currentDate.getMinutes());
    
    var hors = currentDate.getHours();
    var minut = currentDate.getMinutes();

    
    if (hors < 10) {
        hors = '0'+ hors;
    } else {
        hors = hors;
    }
		
    
    if (minut < 10) {
        minut = '0'+ minut;
    } else {
        minut = minut;
    }
    
    var horaFormatada =  hors +':'+ minut;
    
    setHoraInserir(horaFormatada);
    
    setStrHora(horaFormatada);
  };

  const showModeHora = currentMode => {
    setShowHora(true);
    setMode(currentMode);
  };

  const showDatepickerHora = () => {
    showModeHora('time');
    
  };

  
  const mensagemDuplicidade = () =>
  Alert.alert(
    "Erro ao Salvar",
    "Horário Indisponível, Tarefa já Cadastrada!",
    [
      
      { text: "OK" }
    ],
    { cancelable: true }
  ); 

     async function add(){
        const cpf = dados.cpf; 
        const obj = {titulo, descricao, dataInserir, horaInserir, cpf};
    
        
         const res = await Axios.post(api + 'addTarefas.php', obj);
         
          if(res.data.success === true){
            //mensagemSalvar();
            navigation.navigate('Tarefas')
            
          }
    
          if(res.data.success === 'Dado já Cadastrado!'){
            mensagemDuplicidade();
            
          }

          if(res.data.success === 'Preencha a Data!'){
              alert('Escolha uma Data');
          }

          if(res.data.success === 'Preencha a Hora!'){
            alert('Escolha um Horário');
        }
    }

  return (
    <View style={styles.modal}>
      
         
        <Animatable.View  
          animation="bounceInUp"
        useNativeDriver  >

        
        <TextInput 
        type="text"
      style={styles.input}
      placeholder="Insira um Título"
      value={titulo}
      onChangeText={ (titulo) => setTitulo(titulo)}
      />

      <TextInput 
      style={styles.input}
      placeholder="Insira a Descrição"
      value={descricao}
      onChangeText={ (descricao) => setDescricao(descricao)}
      />

<View style={styles.datas}>

        <TouchableOpacity
    style={styles.areaData}
    onPress={showDatepicker}
    >  
        
        <FontAwesome name="calendar" color="#000" size={17} />
        <Text> {strData}</Text>
                      
      
      </TouchableOpacity>
      

      <TouchableOpacity
    style={styles.areaHora}
    onPress={showDatepickerHora}
    >  
        
        <MaterialIcons name="access-time" color="#000" size={17} />
        <Text> {strHora}</Text>
                      
      
      </TouchableOpacity>

      
</View>



{show && (
        <DateTimePicker
          locale="pt-br"
          
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

{showHora && (
        <DateTimePicker
          locale="pt-br"
          
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChangeHora}
        />
      )}

      
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
