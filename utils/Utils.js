import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export function formatMoney(value) {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}

export const sendNotifications = async (title, body, token) => {
    const apiUrl = 'https://exp.host/--/api/v2/push/send';
    const pushToken = token; // Replace with your actual push token

    const headers = {
        'host': 'exp.host',
        'accept': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
    };

    const payload = {
        to: pushToken,
        title: title,
        sound: 'default',
        body: body,
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Notification sent successfully:', responseData);
        } else {
            console.error('Error sending notification:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
};