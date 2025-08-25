import React from 'react';
import {View, StyleSheet} from 'react-native'; 
import IronStatsFooter from './iron_stats_footer';

export default function MainLayour ({ children }) {
    return (
        <View style={styles.content}>
            <View style={styles.content}>
                { children }
        </View>
            <IronStatsFooter/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#495E57'
    },
    content: {
        flex: 1
    }
});