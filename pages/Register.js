import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { push, ref, set } from 'firebase/database';
import { API_AUTH } from '../services/PathApi';

const { width } = Dimensions.get('window');
export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordPre, setPasswordPre] = useState('');
    const navigation = useNavigation()

    const handleSignUp = async () => {
        // Validation checks
        if (!email || !username || !password || !passwordPre) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            Alert.alert('Thông báo', 'Địa chỉ email không hợp lệ');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (password !== passwordPre) {
            Alert.alert('Thông báo', 'Mật khẩu nhập lại không khớp');
            return;
        }
        // Send registration request
        const response = await fetch(API_AUTH.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: username,
                username: email,
                password,
            }),
        });
        // Check the response for OK
        const responseData = await response.json();
        console.log("data: ", responseData?.status);
        if (responseData?.status === 'Faild') {
            Alert.alert('Lỗi', 'Email đã tồn tại!');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const usersListRef = ref(database, `users/${auth?.currentUser?.uid}/`);
                // var timestamp = createdAt.getTime();
                set(usersListRef, {
                    id: user.uid,
                    email: user.email,
                    username: username
                });
                navigation.navigate("Login")
            })
            .catch((err) => Alert.alert("Lỗi", err.message));

        // Show success message or navigate to another screen
        Alert.alert('Thành công', 'Đăng ký thành công!');
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.containerImage} >
                <View style={styles.backgroundImage} >
                    <Image style={styles.image} source={require('../assets/login-home.png')} />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.greetingText}>Đăng kí</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên tài khoản"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                        value={passwordPre}
                        onChangeText={setPasswordPre}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                    <Text style={styles.loginButtonText}>Đăng kí</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signUpButtonText}>Đăng nhập tài khoản</Text>
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