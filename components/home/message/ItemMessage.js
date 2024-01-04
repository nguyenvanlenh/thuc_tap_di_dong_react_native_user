import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react'
import { database } from '../../../firebaseConfig';
import { onChildAdded, onValue, ref } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../theme';
export default function ItemMessage(props) {
    const { id, image, username } = props
    const [lastMess, setLastMess] = useState('')
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const [isMessageRead, setIsMessageRead] = useState(false);

    const navigation = useNavigation()
    useLayoutEffect(() => {
        const lastMessageRef = ref(database, `conversations/${id}/chats/`);
        const unsubscribe = onChildAdded(lastMessageRef, (snapshot) => {
            const data = snapshot.val();
            setLastMess(data.text)
            setHasNewMessage(true); // Đánh dấu có tin nhắn mới
            setIsMessageRead(false); // Đánh dấu tin nhắn chưa đọc
        });
        // Cleanup function to unsubscribe when the component unmounts or when you want to stop listening
        return () => unsubscribe();
    }, [database]);

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('MessageAdmin', { id: id })
                setHasNewMessage(false); // Đánh dấu đã đọc tin nhắn mới
                setIsMessageRead(true); // Đánh dấu tin nhắn đã đọc
            }
            }

        >
            <View style={styles.userItem}>
                <Image source={{ uri: image }} style={styles.userImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{username}</Text>
                    <Text style={[styles.lastMessage, hasNewMessage && !isMessageRead && styles.lastMessageBold]}>{lastMess}</Text>
                    {hasNewMessage && <View style={styles.newMessageDot} />}
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: '#888',
    },
    lastMessageBold: {
        fontWeight: 'bold',
        color: '#000'
    },
    newMessageDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.blueRoot,
        position: 'absolute',
        top: 10,
        right: 0,
    },
});
