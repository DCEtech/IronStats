import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider  } from 'expo-sqlite';
import InitDb from './db/schema';
import WelcomeScreen from './screens/welcome_screen';
import MenuScreen from './screens/menu_ironstats';
import TrainingScreen from './screens/training_screen';
import TeoricalPrsScreen from './screens/teorical_prs_screen';
import HistoricalPrsScreen from './screens/historical_prs_screen';
import BestLiftsScreen from './screens/bests_lifts_screen';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <SQLiteProvider
      databaseName="ironstats.db"
      onInit={async (db) => {
        await InitDb(db)
      }}
      options={{ useNewConnection: false}}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName ="Welcome">
          <Stack.Screen name="Welcome" component = {WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Menu IronStats" component = {MenuScreen}   options= {{ title: "IRONSTATS Training App", headerStyle: { backgroundColor: '#14f4c0ff' }}} />
          <Stack.Screen name="Entrenamientos" component = {TrainingScreen} options= {{ title: "Entrenamientos", headerStyle: { backgroundColor: '#14f4c0ff' }}}/>
          <Stack.Screen name="RM Teóricas" component = {TeoricalPrsScreen} options= {{ title: "RM Teóricas", headerStyle: { backgroundColor: '#14f4c0ff' }}}/>
          <Stack.Screen name="1RM Históricas" component = {HistoricalPrsScreen} options= {{ title: "1RM Hístoricas", headerStyle: { backgroundColor: '#14f4c0ff' }}}/>
          <Stack.Screen name="Mejores Levantamientos" component = {BestLiftsScreen} options= {{ title: "Mejores Levantamientos", headerStyle: { backgroundColor: '#14f4c0ff' }}}/>
        </Stack.Navigator>   
      </NavigationContainer>
    </SQLiteProvider>
  );
}
