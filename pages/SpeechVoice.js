import Voice from '@react-native-community/voice';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../theme";
import * as LocalAuthentication from 'expo-local-authentication';

export const SpeechVoice = () => {
    const navigation = useNavigation();

    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const [recognizedError, setRecognizedError] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            const result = await LocalAuthentication.authenticateAsync();
            setIsAuthenticated(result.success);
        };

        authenticate();
    }, []);

    const startListening = async () => {
        try {
            await Voice.start('en-US');
            setIsListening(true);
            setRecognizedText('');
        } catch (error) {
            console.log('Error starting speech recognition ', error);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (error) {
            console.log('Error stopping speech recognition ', error);
        }
    };

    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (err) => setRecognizedError(err.error);

    Voice.onSpeechResults = async (event) => {
        const { value } = event;
        if (event) {
            setRecognizedText(value[0]);
            await stopListening(); // Invoke stopListening to stop listening.
            navigation.navigate('SearchResult', { query: value[0] });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
                Kết quả: {recognizedText}
            </Text>
            <Text style={{ textAlign: "center" }}>
                {recognizedError ? `Error: ${recognizedError}` : ''}
            </Text>
            <TouchableOpacity
                style={styles.buttonSpeech}
                onPress={isListening ? stopListening : startListening}
            >
                <Text style={{
                    textAlign: "center",
                    color: colors.white,
                    fontSize: 16
                }}>
                    {isListening ? 'Stop Listening' : 'Start Listening'}
                    <Ionicons name="mic-outline" size={16}></Ionicons>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        marginVertical: 10,
    },
    buttonSpeech: {
        marginTop: 40,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: colors.blueRoot,
        color: colors.white,
        justifyContent: "center",
    },
});
