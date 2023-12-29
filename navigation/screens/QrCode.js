import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { colors } from "../../theme";

export const QrCode = () => {
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Chưa quét gì cả');

    useEffect(() => {
        // Function to ask for camera permission
        const askForCameraPermission = async () => {
            // Request camera permissions and get the status
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            // Set the state based on whether the permission is granted
            setHasPermission(status === 'granted');
        };

        // Call the function to ask for camera permission
        askForCameraPermission();
    }, []);

    useEffect(() => {
        let timeout;
        const handleTimeout = () => {
            // Turn off the camera after 15 seconds of inactivity
            setScanned(true);
        };

        // Set a timeout for 15 seconds
        timeout = setTimeout(handleTimeout, 15000);

        // Clear the timeout when the component unmounts or when a QR code is scanned
        return () => clearTimeout(timeout);
    }, [scanned]);

    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            // Kiểm tra xem data có phải là số hay chuỗi số không
            const isDataNumeric = isNumeric(data);

            setText(data);
            // Nếu data là số hoặc chuỗi số, điều hướng đến trang ProductDetail
            if (isDataNumeric) {
                navigation.navigate("ProductDetail", {
                    productId: data,
                });
            } else {
                setText("Không phải mã QR sản phẩm");
            }
        }
    };
    const isNumeric = (value) => {
        // Kiểm tra xem value có phải là số hay chuỗi số không
        return !isNaN(parseFloat(value)) && isFinite(value);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Yêu cầu quyền camera</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Không truy cập được đến camera</Text>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 20,
                        backgroundColor: colors.blueRoot,
                        paddingVertical: 15,
                        borderRadius: 10
                    }}
                    onPress={() => askForCameraPermission()} >
                    <Text style={{ color: colors.white }}>Cho phép</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {!scanned ? (
                <>
                    <Text style={{ fontSize: 16 }}>Đưa máy ảnh lại gần mã QR của bạn</Text>
                    <View style={styles.barcodebox}>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: 540, width: 500 }}
                        />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.maintext}>Kết quả: {text}</Text>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 20,
                            backgroundColor: colors.blueRoot,
                            paddingVertical: 15,
                            borderRadius: 10
                        }}
                        onPress={() => setScanned(false)} color='blue'>
                        <Text style={{ color: colors.white }}>Quét lại</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

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
        height: 500,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'blue'
    }
});
