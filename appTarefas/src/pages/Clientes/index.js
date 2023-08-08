import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, Button, Text, View, SafeAreaView, Image, Animated, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Ionicons} from '@expo/vector-icons';
import ListItem from '../../componentes/List/clientes';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Axios from 'axios';


export default function Clientes({navigation}) {

   
  const api = 'http://192.168.15.8/apitarefas/';

  
  const [valor, setValor] = useState('1');
  const [lista, setLista] = useState([]);
  const [buscar, setBuscar] = useState('');

    const [dados, setDados] = useState([]);
    

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
            const res = await Axios.get(api + 'listarClientes.php?busca=' + buscar + '&cpf=' + dados.cpf);
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


      function buscarDados(){
        buscarNome();
      }

      async function buscarNome(){
        
        const res = await Axios.get(api + 'listarClientes.php?busca=' + buscar + '&cpf=' + dados.cpf);
       
        setLista(res.data.result);
      
        
        
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
         
        const res = await Axios.get(api + 'excluirClientes.php?id=' + id);
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
        <Text style={{color:'#FFF', fontSize:17}}>Lista de Clientes</Text>
        <TouchableOpacity
        onPress={ () => navigation.navigate('addClientes')}
        >
            <Ionicons name="ios-add" size={35} color="#FFF"></Ionicons>
     
         </TouchableOpacity>
        </View>
    
        

        <View style={styles.viewSearch}>
              <TextInput
                style={styles.input}
                placeholder="Faça sua Busca"
                value={buscar}
                onChangeText={ (buscar) => setBuscar(buscar)}
                onChange={buscarDados()}
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="search" color="#000" size={25} />
              </TouchableOpacity>
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

      viewSearch:{
        marginTop: 10,
        backgroundColor: '#FFF',
        elevation: 8,
        borderRadius: 5,
        marginVertical: 10,
        width: '95%',
        flexDirection: 'row',
        alignSelf: 'center'
      },
      input:{
        width: '90%',
        padding: 13,
        paddingLeft: 20,
        fontSize: 17,
      },
      icon:{
        
        right: 0,
        top: 15,
      },


    
     
    });

    const Separator = () => <View style={{flex:1, height:1, backgroundColor:'#DDD'}}></View>

    