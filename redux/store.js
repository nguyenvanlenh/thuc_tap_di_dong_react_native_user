import { configureStore } from "@reduxjs/toolkit";
import cartsReducer from "./slices/CartsSlice";
import addressReducer from "./slices/OrderAddressSlice";
import CategoryReducer from "./slices/CategorySlice";
import paymentReducer from './slices/PaymentSlice'
import orderProductReducer from "./slices/OrderProductSlice";
import HistoryView from "./slices/HistoryView";
import AuthReducer from './slices/AuthSlice';
import UserReducer from './slices/UserSlice';

const store = configureStore({
    reducer: {
        carts: cartsReducer,
        historys: HistoryView,
        address_order: addressReducer, //=> địa chỉ giao hàng
        category: CategoryReducer,
        payment: paymentReducer,
        orderProducts: orderProductReducer,
        historys: HistoryView,
        auth: AuthReducer,
        user: UserReducer
    }
})

export default store;