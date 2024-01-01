import React, {
  useState,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  query
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../../firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../theme';
import { onValue, orderByChild, push, ref, set } from 'firebase/database';
import { usePushNotifications } from '../../usePushNotifications';
import { sendNotifications } from '../../utils/Utils';
function MessageScreen() {
  const { expoPushToken } = usePushNotifications();
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const onSignOut = () => {
    navigation.goBack()
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = ref(database, `conversations/${auth?.currentUser?.uid}/chats/`);
    const q = query(collectionRef, orderByChild('createdAt'));
    const unsubscribe = onValue(q, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const createdAtDate = new Date(childData.createdAt);
        newMessages.push({
          _id: childData._id,
          text: childData.text,
          createdAt: createdAtDate,
          user: childData.user
        });
      });
      newMessages.sort((a, b) => b.createdAt - a.createdAt);
      setMessages(newMessages);
    });

    // Cleanup function to unsubscribe when the component unmounts or when you want to stop listening
    return () => unsubscribe();
  }, [database]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    const chatsListRef = ref(database, `conversations/${auth?.currentUser?.uid}/chats/`);
    const newChatsRef = push(chatsListRef);

    set(newChatsRef, {
      _id,
      text,
      createdAt: createdAt + "",
      user
    });
    // token admin 
    sendNotifications("Tin nhắn mới", text, 'ExponentPushToken[ApLIdHHKy8mPELiA_Y5A2F]')
  }, []);



  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff'
      }}
      textInputStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
    />
  );
}

export default MessageScreen