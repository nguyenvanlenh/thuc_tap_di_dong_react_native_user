import { Alert } from "react-native";

// Hàm để lấy dữ liệu từ API
export async function fetchDataMethodGET(apiUrl) {
    try {
        const response = await fetch(apiUrl);

        // TH: Không trả về dữ liệu
        if (!response.ok)
            throw new Error(`Error fetching data. Status: ${response.status}`);

        const data = await response.json();

        // console.log(data);

        return data;

    } catch (error) {

        // console.error("Error fetching data:", error);
        return null;
    }
}

// Gọi API để thêm đơn hàng vào hệ thống
export async function createOrder(apiUrl, order_data) {
    try {

        console.log('Url: ', apiUrl)
        console.log('Thông tin đơn hàng: ', order_data)

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order_data),
        });

        return await response.json()
    } catch (e) {

        Alert.alert('Thông báo', 'Đặt hàng thất bại')
        return null;
    }
}

