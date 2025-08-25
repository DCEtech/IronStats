import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainLayout from '../components/main_layout';
import BeastModeHeader from '../components/iron_stats_header';

export default function WelcomeScreen({ navigation }) {
    return (
        <MainLayout>
            <BeastModeHeader />
            <View style= {{flex: 1, justifyContent: 'center', aligItems: 'center', backgroundColor: '#495E57'}}> 
                <Text style={{ padding: 20, marginTop: 100, fontSize: 35, textAlign: 'center', color: '#EDEFEE'}} numberOfLines={2}>
                    ¡Bienvenido a IronStats!
                </Text>    
                <Text style={{ padding: 10, fontsize: 25, marginLeft:15 ,marginVertical: 8, textAling: 'center', color: '#EDEFEE' }}>    
                    IronStats es la aplicacion que te va a ayudar a mejorar tus marcas en el gym.
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu IronStats')}
                    style={{
                        marginTop: 190,
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        backgroundColor: '#14f4c0ff', 
                        borderRadius: 30,
                        alignSelf: 'center'
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}> Comenzar</Text>
                </TouchableOpacity>
            </View>
        </MainLayout>
    );
}