import { styles } from "./OrderConfirm.styles";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from "react";
import { colors } from "../../theme";
import { formatMoney, WINDOW_WIDTH } from "../../utils/Utils";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { method_payments, setSelectedPayment } from "../../redux/slices/PaymentSlice";
import { createOrder } from "./util/CallApi";
import { API_POST_PATHS } from "../../services/PathApi";
import { removeCart } from "../../redux/slices/CartsSlice";
import { removeAllOrderProduct } from "../../redux/slices/OrderProductSlice";
import { isValidOrder } from "./util/CheckValid";

export default function OrderConfirmScreen() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    // danh sách các sản phẩm có trong đơn hàng
    const order_items = useSelector(state => state.orderProducts)

    // thông tin địa chỉ giao hàng
    const order_address = useSelector(state => state.address_order)

    // phương thức thanh toán
    const selectedPayment = useSelector(state => state.payment)

    // đây là phí giao hàng mặc định
    const ship_price = 99000;

    // trị giá của đơn hàng
    const value_order = () => {
        return order_items.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const total_price = ship_price + value_order();

    const order_data = {
        name_customer: order_address?.name_customer,
        phone: order_address?.phone_number,
        email_customer: 'test@gmail.com', //=> bắt buộc phải có email
        to_address: order_address?.to_address,
        note: '',
        ship_price: ship_price,
        order_value: value_order(),
        list_order_detail: order_items.map((item) => ({
            id_product: item.id,
            nameSize: item.size,
            quantity: item.quantity,
            price: item.price
        })),
        total_price: total_price
    }


    const handleClickBtOrder = async () => {

        //TH: Đơn hàng không hợp lệ
        if (!isValidOrder(order_data)) {
            return Alert.alert('Thông báo', 'Bạn cần nhập đầy đủ thông tin giao hàng')
        }

        //TH: Thanh toán bằng tiền mặt
        if (selectedPayment.toString() === method_payments.CASH) {

            const dataResponse = await createOrder(API_POST_PATHS.tao_don_hang, order_data)
            Alert.alert('Thông báo', 'Đặt hàng thành công', [{
                text: 'OK',
                onPress: () => {
                    //=> xóa đi sản phẩm sẽ được mua
                    dispatch(removeAllOrderProduct())

                    // => xóa đi sản phẩm sẽ được mua trong giỏ hàng
                    order_items.map(item => dispatch(removeCart(item.idv4)))

                    //=> chuyển hướng đến Trang Chủ
                    navigation.navigate('Main')
                }
            }])

        }

        //TH: Thanh toán bằng ZaloPay
        else if (selectedPayment.toString() === method_payments.ZaloPay) {
            Alert.alert('', 'Chức năng này đang được phát triển')
        }

    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <AddressInfoComponent orderAddress={order_address}></AddressInfoComponent>
                    <OrderItemsComponent orderItems={order_items}></OrderItemsComponent>
                    <PaymentsComponent selectedPayment={selectedPayment}></PaymentsComponent>
                    <OrderValueComponent order_value={value_order()}
                        ship_price={ship_price}
                        total_price={total_price}
                    >
                    </OrderValueComponent>
                </View>
            </ScrollView>
            <FooterComponent handleClickBtOrder={handleClickBtOrder} total_price={total_price}></FooterComponent>
        </View>
    );
}

function AddressInfoComponent(props) {

    const { orderAddress } = props
    const navigation = useNavigation();

    const InformationComponent = () => (
        orderAddress && orderAddress.to_address && (
            <View style={styles.textInfo}>
                <View style={{
                    minWidth: 0.88 * WINDOW_WIDTH
                }}>
                    <View style={styles.textNameAndPhoneCustomer}>
                        <Ionicons name="location" size={25} color='#0a74e4' style={styles.iconLocation}></Ionicons>
                        <Text numberOfLines={1} style={styles.textName}>
                            {orderAddress.name_customer}
                        </Text>
                        <View style={styles.separatorVertical}></View>
                        <Text numberOfLines={1} style={styles.textPhone}>
                            {orderAddress.phone_number}
                        </Text>
                    </View>
                    <View>
                        <Text numberOfLines={2} style={styles.textAddress}>
                            {orderAddress.to_address.address}, {orderAddress.to_address.ward_name}
                            , {orderAddress.to_address.district_name}, {orderAddress.to_address.province_name}
                        </Text>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 0.001 * WINDOW_WIDTH
                }}>
                    <Ionicons name="chevron-forward" size={25} color={colors.grey}></Ionicons>
                </View>
            </View>
        )
    )


    const NotificationComponent = () => (
        <View style={
            {
                flexDirection: 'row',
                flex: 1,
                paddingVertical: 15,
                paddingHorizontal: 10,
            }
        }>
            <Text style={{ fontSize: 16 }}>Bạn hãy chọn địa chỉ giao hàng</Text>
            <View style={{ flex: 5 }} />
            <Ionicons name="chevron-forward" size={25} color={colors.grey}></Ionicons>
        </View>
    )

    return (
        <>
            <View>
                <TouchableOpacity
                    style={styles.header}
                    onPress={() => navigation.navigate('OrderAddress')}>

                    {orderAddress ? <InformationComponent /> : <NotificationComponent />}

                </TouchableOpacity>
            </View>
        </>
    );
}

function OrderItemsComponent(props) {

    const { orderItems } = props

    return (
        <View style={styles.orderItems}>
            {
                orderItems?.length > 0 && orderItems.map((value, index) => (
                    <OrderItem key={index} data={value}></OrderItem>
                ))
            }
        </View>
    );
}

function OrderItem({ data }) {
    return (
        <View style={styles.orderItem}>
            <View>
                <Image src={data.path_img} style={styles.imgProduct}></Image>
            </View>
            <View style={{ maxHeight: 80 }}>
                <View style={styles.infoOrderItem}>
                    <Text numberOfLines={1} style={{ maxWidth: 0.55 * WINDOW_WIDTH }}>{data.title}</Text>
                    <Text>x {data.quantity}</Text>
                </View>
                <View style={styles.infoOrderItem}>
                    <Text style={{ minWidth: 150 }}>Size: {data.size}</Text>
                    <Text style={{ maxWidth: 80 }}>{formatMoney(data.price)}</Text>
                </View>
            </View>
        </View>
    )
}

function PaymentsComponent({ selectedPayment }) {

    const dispatch = useDispatch()

    const handlePaymentClick = (payment_method) => {
        dispatch(setSelectedPayment(payment_method))
    }

    return (
        <View style={styles.payments}>
            <Text style={{ fontSize: 16 }}>Phương thức thanh toán</Text>

            <CashPaymentComponent
                selectedPayment={selectedPayment}
                handlePaymentClick={handlePaymentClick}
            />

            <ZaloPayComponent
                selectedPayment={selectedPayment}
                handlePaymentClick={handlePaymentClick}
            />
        </View>
    );
}

function CashPaymentComponent({ selectedPayment, handlePaymentClick }) {

    return (
        <TouchableOpacity
            style={[styles.methodPayment,
            selectedPayment === method_payments.CASH && { backgroundColor: 'rgba(5, 0, 245, 0.1)' }]}
            onPress={() => handlePaymentClick(method_payments.CASH)}>
            <Ionicons
                name="stop-circle-outline"
                size={30}
                color='#0a74e4'
                style={{ opacity: selectedPayment === method_payments.CASH ? 1 : 0 }}
            >
            </Ionicons>
            <Image source={require('./images/money.png')} style={styles.img}></Image>
            <Text style={styles.nameMethodPayment}>Thanh toán tiền mặt</Text>
        </TouchableOpacity>
    )
}

function ZaloPayComponent({ selectedPayment, handlePaymentClick }) {

    return (
        <TouchableOpacity
            style={[styles.methodPayment,
            selectedPayment === method_payments.ZaloPay && { backgroundColor: 'rgba(5, 0, 245, 0.1)' }]}
            onPress={() => handlePaymentClick(method_payments.ZaloPay)}>
            <Ionicons
                name="stop-circle-outline"
                size={30}
                color='#0a74e4'
                style={{ opacity: selectedPayment === method_payments.ZaloPay ? 1 : 0 }}
            >
            </Ionicons>
            <Image source={require('./images/ZaloPay.png')} style={styles.img}></Image>
            <Text style={styles.nameMethodPayment}>Ví ZaloPay</Text>
        </TouchableOpacity>
    )
}

function OrderValueComponent(props) {

    const { order_value, ship_price, total_price } = props

    return (
        <View>
            <View style={styles.orderValue}>
                <View>
                    <View style={styles.infoOrderValue}>
                        <Text style={{ fontSize: 15 }}>Tạm tính</Text>
                        <Text style={{ fontSize: 15 }}>{formatMoney(order_value)}</Text>
                    </View>
                    <View style={styles.infoOrderValue}>
                        <Text style={{ fontSize: 15 }}>Phí vận chuyển</Text>
                        <Text style={{ fontSize: 15 }}>{formatMoney(ship_price)}</Text>
                    </View>
                    <View style={styles.separatorHorizontal}></View>
                    <View style={styles.infoOrderValue}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tổng tiền</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{formatMoney(total_price)}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footerOrderValue}>
                <Text>Bằng việc tiến hành đặt mua, bạn đồng ý với</Text>
                <Text style={{ color: colors.blueRoot }}>Điều Kiện Giao Dịch Chung</Text>
            </View>
        </View>
    );
}

function FooterComponent(props) {

    const { handleClickBtOrder, total_price } = props

    return (
        <View style={styles.footer}>
            <View>
                <Text style={{ fontSize: 17, marginBottom: 10 }}>Tổng tiền</Text>
                <Text style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>{formatMoney(total_price)}</Text>
            </View>
            <TouchableOpacity style={styles.btOrder}
                onPress={handleClickBtOrder}
            >
                <Text style={{ fontSize: 18, color: 'white', padding: 5 }}>Đặt Hàng</Text>
            </TouchableOpacity>
        </View>
    );
}

