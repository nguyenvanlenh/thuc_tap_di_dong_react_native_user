import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ProgressBarAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-progress';
import { API_GET_PATHS } from '../../services/PathApi';
import { getFeedbackStatus } from '../../utils/Utils';

import { colors } from '../../theme';
const OrderDetailsScreen = ({ route }) => {
  const id = route.params?.id;
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

  const { orderId } = route.params;
  const { phone } = route.params;

  const updateProgress = (infor_order) => {

    // Move the logic for updating progress here
    if (infor_order == 2) {
      setProgress(progress + 0.25);
    } else if (infor_order == 2) {
      setProgress(progress + 0.25);
    } else if (infor_order == 3) {
      setProgress(progress + 0.75);
    } else if (infor_order == 4) {
      setProgress(progress + 1);
    }
  };
  const navigation = useNavigation();
  const fetchData = async () => {
    try {

      const response = await fetch(

        `${API_GET_PATHS.lay_don_hang}${orderId}`

      );

      const jsonData = await response.json();
      //
      //    // Lấy dữ liệu từ cấp cao nhất
      // const inforOrder = jsonData.data.infor_order.status;
      // updateProgress(inforOrder);
      // console.log("ID Order:", inforOrder);
      // const orderDetails = jsonData.data.order_details;
      // const orderValue = jsonData.data.orderValue;
      // const shipPrice = jsonData.data.shipPrice;
      // const totalPrice = jsonData.data.totalPrice;
      //
      // set data bằng dữ liệu lấy được
      setData(jsonData.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData()

  }, []);
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  if (!data) {
    return <Text>Loading...</Text>;
  }
  console.log("data", data);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>

          <Text style={styles.cardHeader}>Đơn hàng của bạn / Theo dõi</Text>
          <View style={styles.cardBody}>
            <Text style={styles.orderId}>Order ID: {data.idOrder}</Text>
            <View style={styles.card}>
              <View style={styles.cardBodyRow}>
                <Text style={styles.col}>
                  <Text style={styles.strong}>Estimated Delivery time: 3 ngày</Text>
                </Text>
                <Text style={styles.col}>
                  <Text style={styles.strong}>Địa chỉ:  {data.addressCustomer}</Text>
                </Text>

                <Text style={styles.col}>

                  <Text style={styles.strong}>Phone: {data.phoneCustomer}</Text>


                </Text>
                <Text style={styles.col}>
                  <Text style={styles.strong}>Status: {getFeedbackStatus(data.status)}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.track}>
              <View style={[styles.step, styles.activeStep]}>
                <Text style={styles.text}>Xác nhận</Text>
                <Text style={styles.icon}>✔️</Text>

              </View>
              <View style={[styles.step, styles.activeStep]}>
                <Text style={styles.text}>Đang vận chuyển</Text>
                <Text style={styles.icon}>👤</Text>

              </View>
              <View style={styles.step}>
                <Text style={styles.text}>Đang giao</Text>
                <Text style={styles.icon}>🚚</Text>

              </View>
              <View style={styles.step}>
                <Text style={styles.text}>Đã nhận</Text>
                <Text style={styles.icon}>📦</Text>

              </View>
            </View>

            {/* <View style={styles.example}>
              <ProgressBarAndroid
                color="#2196F3"
                styleAttr="Horizontal"
                indeterminate={false}
                progress={progress}
              />

            </View> */}


          </View>
          <View style={styles.hr} />
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productList}>
              {data.list_order.map((item) => (
                <View key={item} style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row"
                }}>
                  <TouchableOpacity onPress={() => console.log("Product Pressed")}>
                    <View style={styles.productItem}>
                      {item.productDTO.list_image[0] && item.productDTO.list_image[0].path_image ? (
                        <Image
                          source={{ uri: item.productDTO.list_image[0].path_image }}
                          style={styles.productImage}
                        />
                      ) : (
                        <Text>No Image Available</Text>
                      )}
                      <Text style={styles.productTitle}>
                        {item.productDTO.name_product} {"\n"} X {item.quantity} Size: {item.nameSize}
                      </Text>
                      <Text style={styles.textMuted}>{numberWithCommas(item.price)} đ</Text>
                    </View>
                  </TouchableOpacity>

                  {
                    data.status == 3 &&
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ProductReview", { id_product: item.productDTO.id_product })}
                      style={{
                        height: 50,
                        borderWidth: 1,
                        borderColor: colors.borderGray,
                        padding: 10,
                        backgroundColor: colors.blueRoot,
                        borderRadius: 10
                      }}
                    >
                      <Text style={{
                        color: colors.white, alignItems: "center",
                        alignContent: "center"
                      }}>Đánh giá</Text>
                    </TouchableOpacity>
                  }
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.hr} />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>
              Back to orders
            </Text>
          </TouchableOpacity>
          <View style={styles.example}>

          </View>
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  example: {
    color: "#fff",

  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eeeeee',

  },
  card: {
    position: 'relative',
    minWidth: 0,
    wordWrap: 'break-word',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginBottom: 20,

  },
  cardHeader: {
    padding: 15,
    marginBottom: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    fontSize: 18,
    fontWeight: 'bold',

  },
  cardBody: {
    padding: 15,

  },
  orderId: {
    fontSize: 16,
    marginBottom: 10,

  },
  cardBodyRow: {

    height: 200,
    marginBottom: 5,

  },
  col: {
    flex: 1,


  },
  strong: {
    fontWeight: 'bold',

  },
  phoneIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  track: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,

  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  activeStep: {
    color: '#28a745',
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,

  },
  text: {
    fontSize: 12,

  },
  hr: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,

  },
  productList: {
    flexDirection: 'row',
    marginBottom: 15,

  },
  productItem: {
    marginRight: 15,

  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,

  },
  productTitle: {
    fontSize: 14,
    marginBottom: 5,

  },
  textMuted: {
    fontSize: 12,
    color: '#868e96',

  },
  btn: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',

  },
  btnText: {
    color: '#000',
    fontSize: 16,

  },
  btnIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
});

export default OrderDetailsScreen;
