import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,

} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { HeaderProductDetail } from "../components/product/HeaderProductDetail";
import { ProductImage } from "../components/product/ProductImage";
import { ItemEvaluate } from "../components/product/evaluation/ItemEvaluate";
import { ButtonAction } from "../components/product/ButtonAction";
import { Policy } from "../components/product/Policy";
import { colors } from "../theme";
import { addCart, updateCart } from "../redux/slices/CartsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import uuidv4 from "uuid/v4";
import { addOrderProduct, removeAllOrderProduct } from "../redux/slices/OrderProductSlice";
import { calculateDiscountPercentage, formatCurrency, productDescription } from "../utils/Utils";
import { saveHistoryViewToAsyncStorage } from "../utils/localStorage";
import { API_GET_PATHS } from "../services/PathApi";
export const ProducDetail = ({ navigation }) => {
  // xử lý hiển thị đánh giá
  const [listComment, setListComment] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);

  const handleSeeMoreComments = () => {
    setVisibleComments(
      visibleComments === listComment.length ? 3 : listComment.length
    );
  };

  const quantity_sold = 500;
  const quantity_rating = 500;
  const [selectSize, setSelectSize] = useState(false);
  const [size, setSize] = useState();
  const [color, setColor] = useState();
  const [productData, setProductData] = useState();
  const [quantity, setQuantity] = useState(1);
  const [idV4, setIdV4] = useState();
  const route = useRoute();

  let { productId } = route.params ? route.params : 0;

  // redux
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts);
  const orders = useSelector((state) => state.orderProducts)
  const history = useSelector((state) => state.historys)
  // theo dõi giỏ hàng
  useEffect(() => {
    const existingCartItem = carts.find((item) => {
      return item.id === productId && item.size === size;
    });
    setQuantity(existingCartItem ? existingCartItem.quantity + 1 : 1);
    setIdV4(existingCartItem && existingCartItem.idv4);
  }, [carts]);
  const link = API_GET_PATHS.lay_thong_tin_san_pham + productId;

  // xử lý thay đổi màu trên header
  const [scrollY] = useState(new Animated.Value(0));

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: ["rgba(255, 255, 255, 0)", colors.white],
    extrapolate: "clamp",
  });
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false } // Make sure to set useNativeDriver to false
  );

  // fetch data product
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(link);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductData(data.data);
        setListComment(data.data.list_comment);
        saveHistoryViewToAsyncStorage(data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

  }, []);

  const handleAddToCart = () => {
    const newCartItem = {
      id: productData.id_product,
      title: productData.name_product,
      price: productData.listed_price,
      discountPrice: productData.promotional_price,
      size: size === undefined ? productData.list_size[0].name_size : size,
      color: color ? "Trắng" : "Xanh",
      quantity: 1,
      path_img: productData ? productData.list_image[0].path_image : "",
    };
    if (idV4) {
      setQuantity(quantity + 1);
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, thì cập nhật
      dispatch(
        updateCart({
          idv4: idV4,
          quantity: quantity,
        })
      );
      alert("Cập nhật giỏ hàng thành công");
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thì thêm mới
      setSize(newCartItem.size);
      dispatch(addCart(newCartItem));
      alert("Thêm vào giỏ hàng thành công");
    }
  };
  const handleBuyNow = () => {
    const newCartItem = {
      idv4: uuidv4(),
      id: productData.id_product,
      title: productData.name_product,
      price: productData.listed_price,
      discountPrice: productData.promotional_price,
      size: size ? size : productData.list_size[0].name_size,
      color: color ? "Trắng" : "Xanh",
      quantity: 1,
      status: true,
      path_img: productData && productData.list_image[0].path_image,
    };
    const existingOrderItem = orders.find((item) => {
      return item.id === newCartItem.id && item.size === newCartItem.size;
    });

    if (existingOrderItem) {
      navigation.navigate("OrderConfirm");
    } else {
      dispatch(removeAllOrderProduct())
      dispatch(addOrderProduct(newCartItem));
      navigation.navigate("OrderConfirm", { order_items: [newCartItem] });

    }
  };
  // nếu fecth chưa hết thì hiển thị loading..
  if (!productData) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator
          size="large"
          color="#0000ff"
          hidesWhenStopped={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fixedHeaderProductDetail,
          { backgroundColor: headerBackgroundColor },
        ]}
      >
        <HeaderProductDetail navigation={navigation} id={productId} />
      </Animated.View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 70 }} // Để có không gian cuối ScrollView để hiển thị ButtonAction
      >
        {productData ? (
          <>
            <View>
              <ProductImage list={productData.list_image} />
              <View style={styles.margin10}>
                <View>
                  <View>
                    <Text style={{ fontSize: 30 }}>
                      {productData.name_product}
                    </Text>
                    <Text>
                      <View style={styles.starContainer}>
                        {Array.from({ length: 5 }, (v, i) => (
                          <Ionicons
                            key={i}
                            name={
                              i < productData.star_review
                                ? "star"
                                : "star-outline"
                            }
                            color={
                              i < productData.star_review ? "gold" : "gray"
                            }
                          />
                        ))}
                      </View>
                      {" ("}
                      {quantity_rating}
                      {") "}| Đã bán {quantity_sold}+
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                        {formatCurrency(productData.listed_price)}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 3,
                          backgroundColor: colors.borderGray,
                          borderRadius: 5,
                        }}
                      >
                        {calculateDiscountPercentage(100, 25)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SelectSize", {
                          data: productData,
                        })
                      }
                      style={styles.btnSelect}
                    >
                      <View>
                        <Text>
                          Size{" "}
                          {selectSize ? "" : productData.list_size[0].name_size}{" "}
                          | Trắng
                        </Text>
                      </View>
                      <Text
                        style={{ color: colors.blueRoot, fontWeight: "bold" }}
                      >
                        Chọn
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 8, backgroundColor: "white" }}>
              <Policy />
            </View>

            <View style={styles.margin10}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Thông tin sản phẩm
              </Text>
              <Text>
                {productDescription}
              </Text>
            </View>

            <View style={styles.margin10}>
              <Text style={{ fontSize: 20 }}>ĐÁNH GIÁ KHÁCH HÀNG</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 30, alignContent: "center" }}>
                  {productData.star_review}
                </Text>

                <Text style={{ fontSize: 20, marginTop: 2 }}>
                  <View style={styles.starContainer}>
                    {Array.from({ length: 5 }, (v, i) => (
                      <Ionicons
                        key={i}
                        name={
                          i < productData.star_review ? "star" : "star-outline"
                        }
                        size={20}
                        color={i < productData.star_review ? "gold" : "gray"}
                      />
                    ))}
                  </View>
                  <Text style={{ color: colors.grayLight }}>
                    {" "}
                    {quantity_rating} Đánh giá
                  </Text>
                </Text>
              </View>
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProductReview", { id_product: productData.id_product })}
                style={{
                  borderWidth: 1,
                  borderColor: colors.borderGray,
                  padding: 10,
                  color: colors.white,
                }}
              >
                <Text>Đánh giá</Text>
              </TouchableOpacity> */}
              <View>
                {listComment
                  ? listComment.slice(0, visibleComments).map((e, i) => {
                    return <ItemEvaluate key={i} data={e} />
                  })
                  : "Không có bình luận nào"}

                {listComment.length > 3 && (
                  <TouchableOpacity
                    style={styles.btnMore}
                    onPress={handleSeeMoreComments}
                  >
                    <Text>
                      {visibleComments === listComment.length
                        ? "Thu nhỏ"
                        : "Xem thêm"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        ) : (
          ""
        )}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
          paddingHorizontal: 10,
          backgroundColor: "white",
        }}
      >
        <ButtonAction
          handleAddToCart={handleAddToCart}
          handleBuyNow={handleBuyNow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 16,
    backgroundColor: colors.borderGray,
  },
  starContainer: {
    flexDirection: "row",
  },
  fixedHeaderProductDetail: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: 90,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  margin10: {
    padding: 10,
    backgroundColor: "white",
  },
  btnSelect: {
    marginVertical: 10,
    padding: 10,

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

    height: 45,
    borderColor: colors.borderGray,
    borderWidth: 1,
    borderRadius: 8,
  },
  btnMore: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",

    borderWidth: 1,
    borderColor: colors.borderGray,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
