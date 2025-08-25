import * as React from 'react';
import { View, Text } from 'react-native';

export default function IronStatsHeader() {
    return (
        <View style={{ flex:0.2, backgroundColor: '#14f4c0ff' }}>
            <Text style={{ padding: 35, fontSize: 25, fontWeight: 'bold' }}>
                IRONSTATS {'\n'}
                <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Training App</Text>
            </Text>
        </View>
    );
}