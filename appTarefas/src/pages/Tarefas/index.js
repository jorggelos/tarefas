import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, Button, Text, View, SafeAreaView, Image, Animated, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Ionicons} from '@expo/vector-icons';
import ListItem from '../../componentes/List/tarefas';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';


export default function Home({navigation}) {

   
  const api = 'http://192.168.15.8/apitarefas/';

  const [strDate, setStrDate] = useState('SELECIONE UMA DATA');
    
  const [date, setDate] = useState(new Date());
  const [dataBuscar, setDataBuscar] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [valor, setValor] = useState('1');

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
    
    setDataBuscar(dateFormatted);
    setStrDate(dateFormattedBra);
    buscar(dateFormatted);
    //alert(dateFormatted);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    
  };

  const showTimepicker = () => {
    showMode('time');
  };

    const [lista, setLista] = useState([]);


    const [dados, setDados] = useState([]);
    const aler = 'aaa';
   

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
        listarDados();
        
      },[])

      
     

      async function listarDados(){
       
        if(dados.cpf != undefined){
            const res = await Axios.get(api + 'listarTarefas.php?busca=' + dataBuscar + '&cpf=' + dados.cpf);
            if(res.data.result != '0'){
                setLista(res.data.result);
            }else{
                alert('Não encontramos registros!')
            }
            setValor('2');
        }
        
        
       
        //console.log(res.data.result);
       
      }
      
      setTimeout(function() {
        
        if(valor === '1'){
         listarDados();
        }
      }, 50);

      async function buscar(busca){
        
        const res = await Axios.get(api + 'listarTarefas.php?busca=' + busca + '&cpf=' + dados.cpf);
        if(res.data.result != '0'){
            setLista(res.data.result);
        }else{
            alert('Não encontramos registros!')
        }
        
        
        
      }



      function mensagemDelete(id){
    
        Alert.alert(
          "Excluir Registro",
          "Deseja Excluir este Registro?",
          [
            {
              text: "Não",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Sim", onPress: () => deletar(id) }
          ],
          { cancelable: true }
        );
    
        
    
      }
    
            

     async function deletar(id){
         
        const res = await Axios.get(api + 'excluirTarefas.php?id=' + id);
        listarDados();
      }

      async function concluir(id){
         
        const res = await Axios.get(api + 'concluirTarefa.php?id=' + id);
        listarDados();
      }

   

      return (
        <SafeAreaView>
        <View 
        style={styles.header}>
         <TouchableOpacity
        onPress={ () => navigation.navigate('Home')}
        >
         <Image 
         source={require('../../../assets/img/logo.png')}
         style={{width:30, height:30}}
         resizeMode = "contain"
         />
         </TouchableOpacity>
        <Text style={{color:'#FFF', fontSize:17}}>Lista de Tarefas</Text>
        <TouchableOpacity
        onPress={ () => navigation.navigate('addTarefas')}
        >
            <Ionicons name="ios-add" size={35} color="#FFF"></Ionicons>
     
         </TouchableOpacity>
        </View>
    
        

    <View>
    <TouchableOpacity
    style={styles.areaBusca}
    onPress={showDatepicker}
    >  
        
        <FontAwesome name="calendar" color="#000" size={20} />
        <Text>{strDate}</Text>
        <Icon name="search" color="#000" size={25} />
              
      
      </TouchableOpacity>
      
      
      
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
    </View>


        <View>
        <FlatList
            data={lista}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
            <ListItem
                data={item}
                deletar = {()=> mensagemDelete(item.id)}
                editar = {()=> concluir(item.id)}
            />
            )}
            ItemSeparatorComponent={()=><Separator/>}
            
        >

        </FlatList>
    </View>






    



    
        </SafeAreaView>



      );
    }
    
    const styles = StyleSheet.create({
      header:{
          backgroundColor:'#000',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          padding:10,
          
          marginTop:35
      },

      areaBusca:{
        backgroundColor:'#e1e1e1',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10,
       
    },


    
     
    });

    const Separator = () => <View style={{flex:1, height:1, backgroundColor:'#DDD'}}></View>

    