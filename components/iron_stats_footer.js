import * as React from 'react';
import {View, Text} from 'react-native'; 

export default function IronStatsFooter(){
    return (
        <View style={{ flex: 0.1 , backgroundColor: '#14f4c0ff'}}>
            <Text style={{ fontSize: 18, color: 'black', textAlign: 'center', marginBottom: 30,}}>
                All rights reserved by IronStats, 2025
            </Text>
        </View>
    );
}
