import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/AuthSlice';

import { ref, set } from 'firebase/database';
import { usePushNotifications } from '../usePushNotifications';
import { API_AUTH } from '../services/PathApi';
import { setUserAPI } from '../redux/slices/UserSlice';
const { width } = Dimensions.get('window');
export default function Login() {
    const { expoPushToken } = usePushNotifications();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogin = async () => {
        // Xử lý logic đăng nhập ở đây
        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Thông báo', 'Địa chỉ email không hợp lệ');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }
        const response = await fetch(API_AUTH.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password,
            }),
        });
        // Check the response for OK
        const responseData = await response.json();
        if (responseData?.status === 'Faild') {
            Alert.alert('Lỗi', 'Tài khoản không tồn tại!');
            return;
        }
        dispatch(setUserAPI(responseData?.data))
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const serializedUser = {
                    uid: user.uid,
                    email: user.email
                };
                const usersListRef = ref(database, `userTokens/${user.uid}/`);
                // var timestamp = createdAt.getTime();
                set(usersListRef, {
                    token: expoPushToken?.data,
                    email: user.email,
                });
                dispatch(setUser(serializedUser))

            })
            .catch((err) => {
                Alert.alert("Login error", err.message)
                return;
            });

        navigation.navigate("Main")
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.containerImage} >
                <View style={styles.backgroundImage} >
                    <Image style={styles.image} source={require('../assets/login-home.png')} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.greetingText}>Xin chào,</Text>
                <Text style={{ marginTop: 12, fontSize: 16 }}>Đăng nhập hoặc tạo tài khoản</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={{ textDecorationLine: 'underline' }}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.signUpButtonText}>Đăng ký tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerImage: {
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: width / 1.5
    },
    backgroundImage: { // this shape is a circle 
        borderRadius: width,
        width: width * 2,
        height: width * 1.4,
        marginLeft: -(width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        height: width / 1.5,
        width: width,
        position: 'absolute',
        bottom: 0,
        marginLeft: width / 2,
        backgroundColor: '#9DD6EB'
    },
    container: {
        marginTop: 32,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    greetingText: {
        fontSize: 32,
        fontWeight: '500',
    },
    inputContainer: {
        marginTop: 14,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    input: {
        height: 50,
        fontSize: 20
    },
    forgotPassword: {
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    loginButton: {
        backgroundColor: '#e21535',
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '400',
    },
    signUpButton: {
        // backgroundColor: 'green',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    signUpButtonText: {
        color: colors.blueRoot,
        fontWeight: '400',
    },
})