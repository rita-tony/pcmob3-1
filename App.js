import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import BlockGRB from './components/BlockRGB';

const screenWidth = Dimensions.get("window").width;
const numColumns = 4;
const tileSize = screenWidth / numColumns;

function HomeScreen ({ navigation }) {
  const colors = [
    { red: 255, green: 0, blue: 0, id: "0" },
    { red: 0, green: 255, blue: 0, id: "1"},
    { red: 0, green: 0, blue: 255, id: "2" },
  ];

  const [colorArray, setColorArray] = useState(colors);

  {/* 1. it will run when any component in Home Screen is updated, or render.
  2. Add Color Buton  in the title bar*/}
  useEffect( () => {
    navigation.setOptions({
      headerLeft: () => <Button onPress={resetColor} title="Reset Color" />,
      headerRight: () => <Button onPress={addColor} title="Add Color" />
    });
  });

  function renderItem({item}) {
    return (
      <TouchableOpacity style={styles.tileSizeStyle} onPress={ () => navigation.navigate("Details Screen", { ...item }) }>
        <BlockGRB red={item.red} green={item.green} blue={item.blue} tileDimension={tileSize} />
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
    <View>
      <FlatList data={colorArray} renderItem={renderItem} numColumns={numColumns} keyExtractor={(Item) => Item.id}/>
    </View>
   );
}


function DetailsScreen({route}) {
  const {red, green, blue} = route.params;
 
  return (
    <View style={[ styles.container, {backgroundColor: `rgb(${red}, ${green}, ${blue})`}, ]}>
      <View style={{ padding:30 }}>
        <Text style={[(red + green + blue) >= 100 ? styles.detailWhiteText : styles.detailBlackText]}>Red: {red}</Text>
        <Text style={[(red + green + blue) >= 100 ? styles.detailWhiteText : styles.detailBlackText]}>Green: {green}</Text>
        <Text style={[(red + green + blue) >= 100 ? styles.detailWhiteText : styles.detailBlackText]}>Blue: {blue}</Text>
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

  tileSizeStyle: {
    aspectRatio: 1,
    flex: 1/numColumns,
  },

  detailBlackText: {
    fontSize: 24,
    marginBottom: 20,
    color: "black",
  },

  detailWhiteText: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
});
