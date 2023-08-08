import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import Home from './src/pages/Home';
import Tarefas from './src/pages/Tarefas';
import Clientes from './src/pages/Clientes';
import Login from './src/pages/Login';
import addTarefas from './src/pages/add-tarefas';
import addClientes from './src/pages/add-clientes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name === 'Tarefas') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }else if (route.name === 'Clientes') {
            iconName = focused ? 'ios-people' : 'ios-people';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3f64c7',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Tarefas" component={Tarefas} />
        <Tab.Screen name="Clientes" component={Clientes} />
       
      </Tab.Navigator>


  );
}


export default function App() {

  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        name="Home" 
        component={Tabs}
        options={{headerShown: false}}
        />
        <Stack.Screen 
        name="Tarefas" 
        component={Tarefas} 
        options={{headerShown: false}}
        
        />

        <Stack.Screen 
        name="Clientes" 
        component={Clientes} 
        options={{headerShown: false}}
        
        />

      <Stack.Screen 
      name="Login" 
      component={Login} 
      options={{headerShown: false}}
       />

      <Stack.Screen 
        name="addTarefas" 
        component={addTarefas} 
        options={{
          title:'Inserir Tarefa',
          headerStyle:{
            backgroundColor:'#00335c'
          },
          headerTintColor:'#FFF'
        }}
        
        />


<Stack.Screen 
        name="addClientes" 
        component={addClientes} 
        options={{
          title:'Inserir Clientes',
          headerStyle:{
            backgroundColor:'#00335c'
          },
          headerTintColor:'#FFF'
        }}
        
        />
        
      </Stack.Navigator>

     
    </NavigationContainer>
  );
}

