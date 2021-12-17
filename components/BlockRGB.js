import React from 'react';
import { View } from "react-native";

export default function BlockGRB(props) {
    return (
        <View
            style = {{
                backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
                padding: 30,
                width: '100%',
            }}>
        </View>
    );
}