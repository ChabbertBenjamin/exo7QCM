import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Text, Button, View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, SectionList} from 'react-native'
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
var holomorphie = require("./data/holomorphie.json");
var homotopie3 = require("./data/homotopie3.json");


function Accueil({ navigation }) {
  return (
    <View>

      <Text>
      Chaque réponse correcte rapporte un point, chaque réponse incorrecte enlève un point.
      Le nombre de points et la note globale sont affichés à la fin des questions.
      Pour commencer, choisissez un thème dans le menu en haut de l'écran.
      Lorsque toutes les questions du thème auront été traitées, un écran récapitulera la note et son détail.
      L'application peut octroyer un bonus de points en fonction de la rapidité de la réponse si celle ci est correcte.
      </Text>
      
      <Text>Liste des thèmes : </Text>
    
    <Button
      title="Homotopie3"
      color="#841584"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Homotopie3",
          json: homotopie3,
        });
      }}
    />
    <Button
      title="Holomorphie"
      onPress={() => {
        navigation.navigate('QCM', {
          themeName: "Holomorphie",
          json : holomorphie,
        });
      }}
    />
    </View>
  );
}
function Reponse({  id, title, selected, onSelect  }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#cafe8c' : '#ffffff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

function Resultat({navigation, route}) {
  const { nbRepJustes } = route.params;
  const { nbRepFausses } = route.params;

  return(

    <View>
      <Text>Page Résultat</Text>

      <Button
          title="Retour à l'accueil"
          onPress={() => {
            navigation.navigate('Accueil', {});
          }}
        />
    </View>
  )
}
function QCM({ navigation, route }) {
  const { themeName } = route.params;
  const { json } = route.params;
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );



  return (
   
      
      <SafeAreaView style={styles.container}>
       
    
        <SectionList
          sections={json}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Reponse title={item.value} selected={!!selected.get(item.value)} onSelect={onSelect} id={item.value}/>}
          renderSectionHeader={({ section: { question } }) => (
            <Text>{question}</Text>
          )}
        />
         <Button
          title="Valider"
          onPress={() => {
            navigation.navigate('Resultat', {
            nbRepJustes: 0,
            nbRepFausses : 0,
            });
          }}
        />

        
      </SafeAreaView>
 


      

 
     
    

      
      


  );
}

export default function App() {
  
  
  return (

    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen
          name="Accueil"
          component={Accueil}
          options={{ title: 'Règle du jeu' }}
        />
        <Stack.Screen 
          name="QCM" 
          component={QCM}/>
          <Stack.Screen 
          name="Resultat" 
          component={Resultat}/>
        
      </Stack.Navigator>
    </NavigationContainer> 
   
    
    


  );
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 24,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 12
  }
});

