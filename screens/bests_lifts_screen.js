import { View, Modal, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native' 
import { useSQLiteContext } from 'expo-sqlite'
import { insertBeastLift, getAllBestLifts, deleteBestLift} from '../db/lifts_repository';
import { useState, useEffect} from 'react';

export default function BestLiftsScreen () {
    const [exercise, setExercise] = useState([]);
    const [weight, setWeight] = useState([]); 
    const [reps, setReps] = useState([]);
    const [lifts, setLifts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    const db = useSQLiteContext();
    
    const loadLifts = async () => {
        try{
            if (!db) return; 
            const rows = await getAllBestLifts(db)
            console.log("Loaded best lifts", rows)
            setLifts(rows)
        }catch (error){
            console.log("Error charging data!", error);
        }
    }

    useEffect(() => {
        (async () => {
            try{
                await loadLifts();
            }catch (error) {
                console.error("Error charging data!", error);
            }
        })();
    }, []);

    const saveLift = async () => {
        try{
            if (!db | !weight | !reps) return;

            const w = parseFloat(weight)
            const r = parseFloat(reps)

            if (Number.isNaN(w) | Number.isNaN(r)) return; 

            await insertBeastLift(db, exercise, r, w)
            
            setExercise("")
            setWeight("")
            setReps("")
            setModalVisible(false)

            await loadLifts();
        }catch (error){
            console.log("An error ocurred while adding data!", error)
        }
    };

    const handleDeleteItem = async (exercise) => {
        try{
            await deleteBestLift(db, exercise)
            await loadLifts()
        }catch (error){
            console.log("Error delete item:", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mejores Levantameintos. </Text>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text>+ añadir levantamiento</Text>
            </TouchableOpacity>
            <FlatList
                data={lifts}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.liftItem}>{item.exercise}: {item.weight} kg x {item.reps} reps</Text>
                        <TouchableOpacity style={styles.deleteButton}onPress={() => handleDeleteItem(item.id)}>
                            <Text style={styles.delete}>x</Text>
                        </TouchableOpacity> 
                    </View>
                    
                )}
                ListEmptyComponent={
                    <Text style={{color: '#fff'}}>Todavia no hay levantamientos registrados.</Text>
                }
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
                style={styles.modal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder='Ejercicio'
                            placeholderTextColor={"#fff"}
                            value={exercise}
                            onChangeText={setExercise}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Repeticiones'
                            placeholderTextColor={"#fff"}
                            value={reps}
                            onChangeText={setReps}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Peso en kg'
                            placeholderTextColor={"#fff"}
                            value={weight}
                            onChangeText={setWeight}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={saveLift}>
                            <Text> Guardar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text> Cancelar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    input: {
        backgroundColor: "#495E57",
        borderColor: '#fff',
        borderWidth: 1,
        placeholderTextColor: "#fff",
        color: "#fff",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#FFA500",
        marginTop: 20,
        marginBottom: 40,                    
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    saveButton: {
        backgroundColor: "#3EFF3E",
        marginTop: 20,
        marginBottom: 20,                    
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    cancelButton: {
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 40,                    
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 0,
        marginVertical: 0,
        borderBottomWidth: 1,
    },
    list: {
        marginTop: 20
    },
    liftItem: {
        color: "#fff",
        fontSize: 16,
        marginTop: 5,
    },
    deleteButton: {
        backgroundColor: "#495E57",
        marginTop: 20,
        marginBottom: 40,                    
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderColor: "#FFF",
        alignSelf: 'center'

    },
    delete: {
        color: "red",
        fontSize: 30,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",       // ancho más pequeño
        padding: 20,
        backgroundColor: "#495E57",
        borderRadius: 10,
        elevation: 5,       // sombra Android
        shadowColor: "#000", 
        shadowOpacity: 0.3,
        shadowRadius: 5,
    }, 
});