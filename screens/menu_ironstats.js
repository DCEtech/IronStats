import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; 
import MainLayout from '../components/main_layout';
import Icon from 'react-native-vector-icons/FontAwesome'; 


export default function MenuScreen({ navigation }) {
    
    const items = [
        { title: 'Entrenamientos', icon: 'calendar', route: 'Entrenamientos' },
        { title: 'RM Teórica', icon: 'calculator', route: 'RM Teóricas' },
        { title: '1RM Hístorica', icon: 'history', route: '1RM Históricas' },
        { title: 'Mejores Levantamientos', icon: 'trophy', route: 'Mejores Levantamientos' }
    ];    
    
    return (
        <MainLayout>
            <View style={styles.container}>
                {items.map((item, index) =>(
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <Icon name={item.icon} size={40} color="#ffffffff" />
                        <Text style={styles.text}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  card: {
    backgroundColor: '#222',
    width: '45%',
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  text: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});