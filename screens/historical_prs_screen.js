import { useSQLiteContext } from 'expo-sqlite';
import { getAllPRLifts, insertPR } from '../db/lifts_repository';
import { useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native' 
import DropDownPicker from 'react-native-dropdown-picker';

export default function HistoricalPRsScreen () {
    const [open, setOpen] = useState(false);
    const [exercise, setExercise] = useState("");
    const [weight, setWeight] = useState("");
    const [lifts, setLifts] = useState([]);
    const [items, setItems] = useState([
        { label: "Peso Muerto", value: "Peso Muerto" },
        { label: "Sentadilla", value: "Sentadilla" },
        { label: "Pres de Banca", value: "Pres de Banca" },
        { label: "Dominadas", value: "Dominadas" },
        { label: "Pres Militar", value: "Pres Militar" },
    ]);
    
    const db = useSQLiteContext();
    
    const loadLifts = async () => {
        try{
            if (!db) return;
            const rows = await getAllPRLifts(db);
            console.log("📊 Loaded lifts:", rows);
            setLifts(rows);
        }catch (error) {
            console.error("❌ Error charging data!", error);
        }
    };

    useEffect(() => {
        (async () => {
            try{
                await loadLifts();
            }catch (error) {
                console.error("❌ Error charging data!", error);
            }
        })();
    }, []);
    
    const saveLift = async () => {
      try{  
            if (!db || !weight) return;

            const w = parseFloat(weight);
            if (Number.isNaN(w)) return;

            await insertPR(db, exercise, w);

            setWeight("");
            await loadLifts();
        }catch (error){
            console.error("❌ An error ocurred while adding data.", error);
        }  
    };

    return (
        <View style={ styles.container}>
            <Text style={styles.title}>Registro de 1RM Histórico</Text>
            <DropDownPicker
                open={open}
                value={exercise}
                items={items}
                setOpen={setOpen}
                setValue={setExercise}
                setItems={setItems}
                placeholder="Seleccione levantamiento..."
                style={styles.dropdown}
                dropDownContainerStyle={{
                    backgroundColor: "#495E57",
                    borderColor: "#fff"
                }}
                activityIndicatorColor='#fff'
                textStyle={{
                    color: "#fff"
                }}
                placeholderStyle={{
                    color: "#fff"
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                placeholderTextColor="#fff"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />

            <TouchableOpacity style={styles.button} onPress={saveLift}>
                <Text style={{ color: "#FFF"}}>GUARDAR</Text>
            </TouchableOpacity>

            <FlatList 
                data={lifts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.liftItem}>
                        <Text style={styles.liftItem}>{item.exercise}: {item.weight} kg</Text>
                    </View>    
                )}
                ListEmptyComponent={
                    <Text style={{color: "#fff"}}>Todavia no hay levantamientos registrados</Text>
                }
                style={styles.list}
            />
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#495E57",
    },
    title: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 10,
    },
    dropdown: {
        marginBottom: 20,
        backgroundColor: "#495E57",
        borderColor: "#fff", 
        overlayColor: "#495E57"
    },
    input: {
        backgroundColor: "#495E57",
        borderColor: '#fff',
        borderWidth: 1,
        placeholderTextColor: "#fff",
        color: "#fff",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5
    },
    button: {
        backgroundColor: "#FFA500",
        marginTop: 20,                    
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    list: {
        marginTop: 20
    },
    liftItem: {
        color: "#fff",
        fontSize: 16,
        marginTop: 5,
    },
});
