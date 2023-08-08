
import React from 'react';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function PuxarEsquerda(progress, eixoX){
    const scale = eixoX.interpolate({
        inputRange:[0, 100],
        outputRange:[0,1],
        extrapolate: 'clamp'
    })
    return(
        <View style={styles.deletar}>
            <Animated.Text style={[styles.textoList, {transform:[{scale}]}]}>Deletar</Animated.Text>
        </View>
    )
}


function PuxarDireita({progress, eixoX, onPress}){
    const scale = eixoX.interpolate({
        inputRange:[-100, 0],
        outputRange:[1,0],
        extrapolate: 'clamp'
    })
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={styles.editar}>
            <Animated.Text style={[styles.textoList, {transform:[{scale}]}]}>Concluir</Animated.Text>
        </View>
        </TouchableOpacity>
    )
}

export default function ListItem({data, deletar, editar}) {
  return (
    <Swipeable
        renderLeftActions={PuxarEsquerda}
        onSwipeableLeftOpen={deletar}
        renderRightActions={(progress, eixoX) => <PuxarDireita progress={progress} eixoX={eixoX} onPress={editar} />}
    >
    <View style={styles.container}>
      
      <View style={styles.titulo}>
      <FontAwesome style={styles.icone} name="square" size={20} color={data.cor}></FontAwesome>
      <Text style={styles.texto}>{data.titulo}  </Text>
      
      </View>
      <View style={styles.subtitulo}>
      <Text style={styles.textoSub}>{data.data} - </Text>
      <Text style={styles.textoSub}>{data.hora}</Text>
      </View>
      
     
     
    </View>
    </Swipeable>
  );
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        paddingHorizontal:10,
        paddingVertical:12,

    },

    texto:{
        color:'#222',
        fontSize:17,
       
    },
    deletar:{
        backgroundColor:'#d62525',
        justifyContent:'center',
        flex:1
       
    },
    editar:{
        backgroundColor:'#066720',
        justifyContent:'center',
        
       
    },
    textoList:{
        color:'#FFF',
        fontSize:19,
        padding:20
    },

    titulo:{
        flexDirection:'row',
    },

    subtitulo:{
        flexDirection:'row',
        marginTop:4,
        
    },

    icone:{
        marginRight:4,
        marginTop:2
    }
});

