import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { colors } from "../../theme";
import { decryptKeyIdProductFromDataQRScanned } from "../../utils/Utils";

export const QrCode = () => {
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Chưa quét gì cả');


    const askForCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    useEffect(() => {
        let timeout;
        const handleTimeout = () => {
            setScanned(true);
        };

        timeout = setTimeout(handleTimeout, 15000);

        return () => clearTimeout(timeout);
    }, [scanned]);

    const handleBarCodeScanned = ({ type, data }) => {
        if (!scanned) {
            setScanned(true);
            data = decryptKeyIdProductFromDataQRScanned(data)
            const isDataNumeric = isNumeric(data);

            setText(data);

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
        return !isNaN(parseFloat(value)) && isFinite(value);
    };

    const renderNoPermission = () => (
        <View style={styles.container}>
            <Text>Yêu cầu quyền camera</Text>
        </View>
    );

    const renderNoAccess = () => (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>Không truy cập được đến camera</Text>
            <TouchableOpacity
                style={styles.permissionButton}
                onPress={askForCameraPermission}
            >
                <Text style={{ color: colors.white }}>Cho phép</Text>
            </TouchableOpacity>
        </View>
    );

    const renderScanner = () => (
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
                        style={styles.permissionButton}
                        onPress={() => setScanned(false)}
                        color='blue'
                    >
                        <Text style={{ color: colors.white }}>Quét lại</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

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
        },
        permissionButton: {
            paddingHorizontal: 20,
            backgroundColor: colors.blueRoot,
            paddingVertical: 15,
            borderRadius: 10
        },
    });

    return hasPermission === null
        ? renderNoPermission()
        : hasPermission === false
            ? renderNoAccess()
            : renderScanner();
};
