import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { getPermissionToAsyncStorage, savePermissionToAsyncStorage } from "../../utils/localStorage";
import { colors } from "../../theme";

export const QrCode = () => {
    const navigation = useNavigation();

    const KEY_PERMISSION_CAMERA = 'PERMISSION_CAMERA';


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            savePermissionToAsyncStorage(KEY_PERMISSION_CAMERA, status)
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            setText(data);
            navigation.navigate("ProductDetail", {
                productId: data,
            });
        }
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Yêu cầu quyền camera</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Không truy cập được đến camera</Text>
                <TouchableOpacity style={{
                    paddingHorizontal: 20,
                    backgroundColor: colors.blueRoot,
                    paddingVertical: 15,
                    borderRadius: 10
                }} onPress={() => askForCameraPermission()} >
                    <Text style={{ color: colors.white }}>Cho phép</Text></TouchableOpacity>
            </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            {!scanned ? (
                <View style={styles.barcodebox}>
                    <BarCodeScanner
                        onBarCodeScanned={handleBarCodeScanned}
                        style={{ height: 400, width: 400 }}
                    />
                </View>
            ) : (
                <>
                    {/* <Text style={styles.maintext}>Id sản phẩm là: {text}</Text> */}
                    <TouchableOpacity style={{
                        paddingHorizontal: 20,
                        backgroundColor: colors.blueRoot,
                        paddingVertical: 15,
                        borderRadius: 10
                    }}
                        onPress={() => setScanned(false)} color='blue'>
                        <Text style={{ color: colors.white }}>Quét lại</Text></TouchableOpacity>
                </>)
            }
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});