import { useSQLiteContext } from 'expo-sqlite';
import { getIronVisionLifts, insertIronVisionLifts} from '../db/lifts_repository'
import React, { useRef, useState, useEffect} from 'react';
import {View, Modal, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native' 
import DropDownPicker from 'react-native-dropdown-picker';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera'; 

export default function IronVisionRMScreen () {
    
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions(); 
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef(null);
    const [facing, setFacing] = useState('back');
    const db = useSQLiteContext();
    const [exercise, setExercise] = useState("");
    const [lifts, setLifts] = useState([]);
    const [weight, setWeight] = useState();
    const [open, setOpen] = useState(false);
  
    const [items, setItems] = useState([
        { label: "Peso Muerto", value: "Peso Muerto" },
        { label: "Sentadilla", value: "Sentadilla" },
        { label: "Pres de Banca", value: "Pres de Banca" },
        { label: "Dominadas", value: "Dominadas" },
        { label: "Pres Militar", value: "Pres Militar" },
    ]);

    useEffect(() => { 
        (async () => {
            if (!cameraPermission?.granted) { 
                await requestCameraPermission(); 
            } if (!microphonePermission?.granted) {
                await requestMicrophonePermission(); 
            }
        })(); 
        }, [cameraPermission, microphonePermission]);

    const startRecording = async () => { 
        if (cameraRef.current) {
            console.log("Starting record...")
            try{ 
                const video = await cameraRef.current.recordAsync({
                    quality: '1080p',
                    maxDuration: 60,
                    maxFileSize: 1000000000
                });
                console.log("Video recorded in ", video.uri);
            }catch (error){
                    console.log("Exception while recording: ", error)
            }        
        } 
    };

    const stopRecording = async () => {
         if (cameraRef.current) {
            console.log("Stoping record...") 
            cameraRef.current.stopRecording(); 
            setShowCamera(false); 
        } 
    };

    const loadLifts = async() => {
        try{
            if (!db) return; 
            const rows = await getIronVisionLifts(db)
            console.log("📊 Loaded lifts:", rows);
            setLifts(rows);
        }catch (error){
            console.log("❌ Error chargin data: ", error)
        }
    }

    useEffect(() => {
        (async () => {
            try{
                await loadLifts();
            }catch (error){
                console.log("❌ Error chargin data: ", error)
            }
        })();
    }, []);

    const saveLift = async () => {
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Iron Vision 1RM</Text>
            <Text style={styles.text}>Seleccione ejercicio, introduzca peso y grabe levantameinto para calcular su 1RM.</Text>
            <DropDownPicker
                open={open}
                value={exercise}
                items={items}
                setOpen={setOpen}
                setValue={setExercise}
                setItems={setItems}
                placeholder="Seleccione levantamiento..."
                containerStyle={{ marginTop: 20 }}
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
            <TextInput style={styles.input}
                placeholder="Peso (kg)"
                placeholderTextColor="#fff"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
            />
            <TouchableOpacity style={styles.openButton} onPress={() => setShowCamera(true)}><Text>Abrir Camara</Text></TouchableOpacity>
            <Modal
                visible={showCamera}
                transparent={true}
                animationType="slide"
                onRequestCLose={() => setShowCamera(false)}
            >
                <View style={styles.cameraOverlay}>    
                    <CameraView
                        style={styles.camera}
                        facing={facing}
                        ref={cameraRef}
                        mode="video"
                    />    
                    <View style={styles.cameraControls}> 
                        <TouchableOpacity style={styles.recordButton} onPress={startRecording}><Text>GRABAR</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.stoprecordButton}onPress={stopRecording}><Text>FINALIZAR</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Text style={styles.text}>Historico de mejores levanamientos teoricos</Text>
            <FlatList></FlatList>
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
    text: {
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
        borderRadius: 5
    },
    dropdown: {
        margintop: 20,
        marginBottom: 20,
        backgroundColor: "#495E57",
        borderColor: "#fff", 
        overlayColor: "#495E57"
    },
    openButton: {
        backgroundColor: "#FFA500",
        marginTop: 20,
        marginBottom: 20,                 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    }, 
    camera: {
        width: "90%",
        height: "70%",
        borderRadius: 10,
    },
    cameraControls: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between", 
        width: "60%", 
    },
    recordButton: {
        backgroundColor: "red",
        marginTop: 20,
        marginBottom: 20,                 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    },
    stoprecordButton: {
        backgroundColor: "#3EFF3E",
        marginTop: 20,
        marginBottom: 20,                      
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignSelf: 'center'
    }
})
