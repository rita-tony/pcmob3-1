import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import BlockGRB from './components/BlockRGB';


function HomeScreen ({ navigation }) {
  const [colorArray, setColorArray] = useState(
    [
      { red: 255, green: 0, blue: 0, id: "0" },
      { red: 0, green: 255, blue: 0, id: "1"},
      { red: 0, green: 0, blue: 255, id: "2" },
    ]
  );

  {/* Add Color Buton  in the title bar*/}
  useEffect( () => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={resetColor} title="Reset Color" />,
      headerRight: () => <Button onPress={addColor} title="Add Color" />
    });
  });

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={ () => navigation.navigate("Details Screen", { ...item }) }>
        <BlockGRB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }

  //Add new color with random number
  function addColor() {
    setColorArray([    
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
      ...colorArray,
    ]);
  }
  
  //Reset color function
  function resetColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      {/* Add Reset Buton */}
      <TouchableOpacity style={{height:40, justifyContent: "center"}} onPress={resetColor}>  
        <Text style={{color: "red", fontSize: 20}}>
          Reset
        </Text>
      </TouchableOpacity>
      <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}


function DetailsScreen({route}) {
  const {red, green, blue} = route.params;

  return (
    <View style={[ styles.container, {backgroundColor: `rgb(${red}, ${green}, ${blue})`}, ]}>
      <View style={{ padding:30 }}>
        <Text style={styles.detailText}>Red: {red}</Text>
        <Text style={styles.detailText}>Green: {green}</Text>
        <Text style={styles.detailText}>Blue: {blue}</Text>
      </View>
    </View>
  ); 
}

const Stack = createStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Details Screen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
    width: "100%",
  },

  detailText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
