import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Item({ item, deleteData }) {
    return (
        <View style={styles.item}>
            <Text><Text style={styles.titleStyle}>Title :</Text> {item.title}</Text>
            <Text><Text style={styles.titleStyle}>Comment : </Text>{item.body}</Text>
            <View>
                <TouchableOpacity style={styles.btn} onPress={() => deleteData(item.id)}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 5,
        padding: 5,
        borderRadius: 5
    },
    titleStyle: {
        fontWeight: 'bold',
        color: 'green'
    },
    btn: {
        width: 50,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: 'white'
    }
})