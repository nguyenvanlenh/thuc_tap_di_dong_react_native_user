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


export const productDescription = 'Nike Air Force 1 Ra mắt vào năm 1982 bởi nhà thiết kế Bruce Kilgore, ngay lập tức mẫu giày Nike Air Force 1 (AF1) đã trở thành một ‘hit’ mạnh trên khắp thế giới khi ‘sold out’ ngay trong ngày đầu trình làng. Thiết kế mẫu giày Nike Air Force 1 được xem là đôi giày mang tính cách mạng trong thế giới sneaker,khi mà các nhà thiết kế kết hợp với các nhà khoa học cho ra mẫu giày có công nghệ ‘Air’ – một túi khí ở gót chân để đệm hỗ trợ.';
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
    const feedbackTexts = ["Xác nhận ", "Đang Vận Chuyển", "Đang giao", "Đã nhận"];
    return feedbackTexts[status];
};
