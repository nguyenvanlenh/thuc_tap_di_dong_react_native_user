import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export function formatMoney(value) {
    // Sử dụng Intl.NumberFormat để định dạng số thành chuỗi
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
}
export const getFeedbackText = (star) => {
    const feedbackTexts = ["Tệ", "Không hài lòng", "Bình thường", "Hài lòng", "Cực kỳ hài lòng"];
    return feedbackTexts[star - 1];
};


export const productDescription = `CP01 mang đến một thiết kế mạnh mẽ, hiện đại, thể hiện sự khoẻ khoắn và đam mê của bạn đối với thể thao. Không chỉ là bộ trang phục, CP01 góp phần chinh phục thành công cùng bạn.

- Form áo tôn dáng với hoạ tiết hai bên sườn áo tạo nên vẻ ngoài bản lĩnh và đầy cuốn hút.

- Chất vải MD2 độc quyền được cải tiến, siêu nhẹ, thông thoáng, mang lại cảm giác thoải mái khi chơi bóng ở cường độ cao.

- Bề mặt vải với cấu trúc caro, thoáng khí và mềm mát. Đặc biệt, chống nhăn giúp bạn tiết kiệm thời gian và công sức giặt ủi.

- Phối vai nổi bật thể hiện đẳng cấp và sự tự tin của bạn.

- Logo CP và nhãn lai được làm bằng silicone cao cấp, đảm bảo tính thẩm mỹ và độ bền cao.`

// formart Tiền tệ
export const formatCurrency = (value) => {
    // Kiểm tra nếu giá trị không phải là số
    if (isNaN(value)) {
        return "Invalid input";
    }

    // Sử dụng hàm toLocaleString để định dạng số tiền thành chuỗi tiền tệ
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};
export const calculateDiscountPercentage = (listedPrice, promotionalPrice) => {
    // Kiểm tra nếu giá trị không phải là số
    if (isNaN(listedPrice) || isNaN(promotionalPrice)) {
        return "Invalid input";
    }
    // Tính phần trăm giảm giá
    const discountPercentage =
        ((listedPrice - promotionalPrice) / listedPrice) * 100;
    // Làm tròn đến 2 chữ số thập phân
    const roundedPercentage = Math.round(discountPercentage * 100) / 100;

    return roundedPercentage + "%";
};


export const getFeedbackStatus = (status) => {
    const feedbackTexts = ["Đang đóng gói ", "Đang Vận Chuyển", "Đã giao", "Đã hủy"];
    return feedbackTexts[status - 1];
};

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
            // console.log('Notification sent successfully:', responseData);
        } else {
            console.error('Error sending notification:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
};
export const GENERATE_QR_KEY_PRODUCT = 'TIKI_';

export const generateQRKeyFromID = (id) => {
    return GENERATE_QR_KEY_PRODUCT + id;
};

export const decryptKeyIdProductFromDataQRScanned = (value) => {
    // Assuming the ID is concatenated after the prefix
    const idStartIndex = GENERATE_QR_KEY_PRODUCT.length;

    // Check if the value has the correct prefix
    if (value.startsWith(GENERATE_QR_KEY_PRODUCT)) {
        // Extract the ID from the value
        const id = value.slice(idStartIndex);
        return id;
    } else {
        // Handle invalid QR code format
        console.error('Invalid QR code format');
        return null;
    }
};


