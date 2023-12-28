import { View, Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = () => {
        // Xử lý logic đăng nhập ở đây
        console.log('Đăng nhập với username:', username, 'và password:', password);
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
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
                        placeholder="Tài khoản"
                        value={username}
                        onChangeText={setUsername}
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
    statusBar: {
        height: StatusBar.currentHeight,
        backgroundColor: '#fff',
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