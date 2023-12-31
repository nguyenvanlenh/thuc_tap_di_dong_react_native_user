import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { database } from '../../firebaseConfig';
import { onValue, ref } from 'firebase/database';
import ItemMessage from '../../components/home/message/ItemMessage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MessengerHomeAdmin = () => {
    const [users, setUsers] = useState([]);
    useLayoutEffect(() => {

        const collectionRef = ref(database, `users/`);
        const unsubscribe = onValue(collectionRef, (snapshot) => {
            const newUsers = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                newUsers.push({
                    id: childData.id,
                    username: childData.username,
                    image: 'https://i.pravatar.cc/100',
                    lastMessage: 'Hello there!',
                });
            });
            setUsers(newUsers)
        });

        // Cleanup function to unsubscribe when the component unmounts or when you want to stop listening
        return () => unsubscribe();
    }, [database]);


    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemMessage
                        id={item.id}
                        image={item.image}
                        username={item.username}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
});

export default MessengerHomeAdmin;
