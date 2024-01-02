import AsyncStorage from "@react-native-async-storage/async-storage";

// Lưu thông tin giỏ hàng vào AsyncStorage
export const saveCartToAsyncStorage = async (cartData) => {
    try {
        const jsonCartData = JSON.stringify(cartData);
        await AsyncStorage.setItem("cart", jsonCartData);
        console.log("Giỏ hàng đã được lưu thành công");
    } catch (error) {
        console.error("Lỗi khi lưu giỏ hàng:", error);
    }
};

// Đọc thông tin giỏ hàng từ AsyncStorage
export const getCartFromAsyncStorage = async () => {
    try {
        const jsonCartData = await AsyncStorage.getItem("cart");
        return jsonCartData != null ? JSON.parse(jsonCartData) : null;
    } catch (error) {
        console.error("Lỗi khi đọc giỏ hàng:", error);
        return null;
    }
};

// Thêm một sản phẩm vào giỏ hàng và lưu vào AsyncStorage
export const addToCart = async (product) => {
    try {
        // Đọc thông tin giỏ hàng từ AsyncStorage
        const existingCart = await getCartFromAsyncStorage();

        // Nếu giỏ hàng đã tồn tại, thêm sản phẩm vào
        if (existingCart) {
            const updatedCart = [...existingCart, product];
            await saveCartToAsyncStorage(updatedCart);
            console.log("Sản phẩm đã được thêm vào giỏ hàng");
        } else {
            // Nếu giỏ hàng chưa tồn tại, tạo giỏ hàng mới và thêm sản phẩm vào
            const newCart = [product];
            await saveCartToAsyncStorage(newCart);
            console.log("Sản phẩm đã được thêm vào giỏ hàng");
        }
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    }
};

// lịch sử xem sản phẩm
export const saveHistoryViewToAsyncStorage = async (product) => {
    try {
        console.log("Saving history:", product);
        // Get the existing history data from AsyncStorage
        const existingHistoryData = await getHistoryFromAsyncStorage();

        // Check if the product with the given ID already exists in the history
        const productExists = existingHistoryData && existingHistoryData.some((item) => item.id_product === product.id_product);

        if (!productExists) {
            // If the product doesn't exist, add it to the history
            const updatedHistoryData = [...(existingHistoryData || []), product];
            const jsonHistoryData = JSON.stringify(updatedHistoryData);
            await AsyncStorage.setItem("historyViewProduct", jsonHistoryData);
        }

    } catch (error) {
        console.error("Error saving history:", error);
    }
};

export const getHistoryFromAsyncStorage = async () => {
    try {
        const jsonHistoryData = await AsyncStorage.getItem("historyViewProduct");
        return jsonHistoryData != null ? JSON.parse(jsonHistoryData) : null;
    } catch (error) {
        console.error("Error reading history:", error);
        return null;
    }
};


export const savePermissionToAsyncStorage = async (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);

    } catch (error) {
        console.error("Lỗi lưu quyền:", error);
    }
}
export const getPermissionToAsyncStorage = async (key) => {
    try {
        const jsonData =
            await AsyncStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : null;

    } catch (error) {
        console.error("Lỗi lấy quyền:", error);
    }
}