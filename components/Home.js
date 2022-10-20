import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Item from './Item';

export default function Home() {

    const [title, seTitle] = useState('')
    const [value, setValue] = useState('')
    const [deleted, setDeleted] = useState('')
    const [posted, setPosted] = useState({});
    const [click, setClick] = useState(false);

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/')
            .then(res => res.json())
            .then(data => setItems(data))
    }, [])

    const postData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: value,
            }),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setPosted(data)
                    setClick(true)
                }
            });
    }

    const deleteData = id => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setDeleted(`Successfully id:${id} Deleted`)
                }
            })
    }

    return (
        <View>
            <Text style={styles.heading}>Create a post</Text>
            <View>
                <TextInput
                    onChangeText={text => seTitle(text)}
                    style={styles.input}
                    placeholder='Title'
                />
                <TextInput
                    onChangeText={text => setValue(text)}
                    style={styles.input}
                    placeholder='Write a post'
                />
                <View>
                    <TouchableOpacity style={styles.btn} onPress={postData}>
                        <Text style={styles.btnText}>Post</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {
                    click && <View style={styles.item}>
                        <Text><Text style={styles.titleStyle}>Title :</Text> {posted.title}</Text>
                        <Text><Text style={styles.titleStyle}>Comment : </Text>{posted.body}</Text>
                    </View>
                }

                <Text style={styles.delete}>{deleted}</Text>
            </View>


            <ScrollView>
                <View>
                    {
                        items.map(item => <Item
                            item={item}
                            deleteData={deleteData}
                        />)
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#45b1ef'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        width: 150,
        height: 40,
        backgroundColor: '#45b1ef',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 100
    },
    btnText: {
        fontWeight: 'bold',
        color: 'white'
    },
    delete: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
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
})