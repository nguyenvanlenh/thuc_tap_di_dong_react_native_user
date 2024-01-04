import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CartIcon from '../../components/CartIcon';
import { categorySelector, selectCategory } from '../../redux/slices/CategorySlice';
import { useNavigation } from "@react-navigation/native";
import { API_GET_PATHS } from '../../services/PathApi';
import { formatMoney } from '../../utils/Utils';
import VoteScreen from '../../components/VoteScreen';
import { colors } from '../../theme';
import SelectionAttributeBrand from "../../components/Category/SelectionAttributeBrand";

const handleProductPress = () => {
  // Gọi màn hình đánh giá khi sản phẩm được nhấn
  navigation.navigate('VoteScreen');
};
const CategoryScreen = () => {


  const [activeButtonBrand, setActiveButtonBrand] = useState(null);
  const handleActiveButtonChangeBrand = (newActiveButton) => {
    setActiveButtonBrand(newActiveButton);
  };

  const [takeAttribute, setTakeAttribute] = useState({
    brand: "",
    gender: "",
    type: "",
  })
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(categorySelector);
  const [leftData, setLeftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [pressedCategory, setPressedCategory] = useState("Đồ Nike Nam");

  const [modalVisible, setModalVisible] = useState(false);

  const [isReset, setIsReset] = useState(false);
  const getData = (name, value) => {
    // setTakeAttribute({brand, gender, type})
    switch (name) {
      case "Thương hiệu":
        setTakeAttribute(prevState => ({
          ...prevState,
          brand: value
        }));
        break;
      case "Giới tính":
        setTakeAttribute(prevState => ({
          ...prevState,
          gender: value
        }));
        break;
      case "Thể loại":
        setTakeAttribute(prevState => ({
          ...prevState,
          type: value
        }));
        break;
    }
  }
  const handleReset = () => {
    setIsReset(true)
  };
  useEffect(() => {
    setIsReset(false)
    setTakeAttribute({
      brand: "",
      gender: "",
      type: "",
    })
  }, [isReset])

  const dataAll = [
    {
      title: "Thương hiệu",
      data: [
        { id: 1, label: "NIKE" },
        { id: 2, label: "ADIDAS" },
        { id: 3, label: "PUMA" },
      ]
    },
    {
      title: "Giới tính",
      data: [
        { id: 0, label: "NAM" },
        { id: 1, label: "NỮ" },
      ]
    },
    {
      title: "Thể loại",
      data: [
        { id: 1, label: "ÁO ĐẤU" },
        { id: 2, label: "ÁO HUẤN LUYỆN" },
        { id: 3, label: "ÁO THỦ MÔN" },
        { id: 4, label: "ÁO FAN" },
      ]
    },];
  useEffect(() => {
    const getProducts = async (apiEndpoint) => {
      setLoading(true);
      try {
        const response = await fetch(`${apiEndpoint}page=${currentPage}&pageSize=15`);
        const responseData = await response.json();

        setLeftData((prevData) => [...prevData, ...responseData.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = () => {
      switch (selectedCategory) {
        case 'Đồ Puma Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_puma_nu);
          break;
        case 'Đồ Puma Nam':
          getProducts(API_GET_PATHS.lay_ds_do_puma_nam);
          break;
        case 'Đồ Adidas Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_adidas_nu);
          break;
        case 'Đồ Adidas Nam':
          getProducts(API_GET_PATHS.lay_ds_do_adidas_nam);
          break;
        case 'Đồ Nike Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_nike_nu);
          break;
        case 'Đồ Nike Nam':
          getProducts(API_GET_PATHS.lay_ds_do_nike_nam);
          break;
        default:
          // Handle unmatched category
          break;
      }
    };

    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    const getProducts = async (apiEndpoint) => {
      setLoading(true);
      try {
        let response;
        if (takeAttribute.gender != "" || takeAttribute.brand != "" || takeAttribute.type != "") {
          response = await fetch(API_GET_PATHS.lay_ds_loc +
            "brand=" + takeAttribute.brand +
            "&sex=" + takeAttribute.gender +
            "&type=" + takeAttribute.type +
            "&size=15" +
            "&page=" + currentPage
          );

        } else {
          response = await fetch(`${apiEndpoint}page=${currentPage}&pageSize=15`);
        }
        const responseData = await response.json();

        setLeftData((prevData) => [...prevData, ...responseData.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = () => {
      switch (selectedCategory) {
        case 'Đồ Puma Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_puma_nu);
          break;
        case 'Đồ Puma Nam':
          getProducts(API_GET_PATHS.lay_ds_do_puma_nam);
          break;
        case 'Đồ Adidas Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_adidas_nu);
          break;
        case 'Đồ Adidas Nam':
          getProducts(API_GET_PATHS.lay_ds_do_adidas_nam);
          break;
        case 'Đồ Nike Nữ':
          getProducts(API_GET_PATHS.lay_ds_do_nike_nu);
          break;
        case 'Đồ Nike Nam':
          getProducts(API_GET_PATHS.lay_ds_do_nike_nam);
          break;
        default:
          // Handle unmatched category
          break;
      }
    };
    fetchData()
  }, [currentPage])

  const handleCategoryPress = (category) => {
    dispatch(selectCategory(category));
    setCurrentPage(1);
    setLeftData([]);
    setPressedCategory(category);
  };

  const handleEndReached = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ProductDetail", {
          productId: item.id_product,
        });
      }}
      style={[
        styles.productTab,
        styles.categoryItem,
        pressedCategory === item.name_product && styles.buttonPressed,
      ]}
    >
      {item.list_image && item.list_image.length > 0 && (
        <Image style={styles.imageProduct} source={{ uri: `${item.list_image[0].path_image}` }} />
      )}
      <Text style={styles.productTabText}>{item.name_product.substring(0, 13)}..</Text>
      <VoteScreen starDefault={item.star_review} ></VoteScreen>
      <Text style={styles.productTabText}>Giá: {formatMoney(item.listed_price)}</Text>
    </TouchableOpacity>
  );

  const handleDataUseFetch = async () => {

    try {
      setLoading(true);
      const response = await fetch(API_GET_PATHS.lay_ds_loc +
        "brand=" + takeAttribute.brand +
        "&sex=" + takeAttribute.gender +
        "&type=" + takeAttribute.type +
        "&size=15");
      const newData = await response.json();
      setLeftData(newData.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setModalVisible(false);
  }
  return (
    <View style={styles.categoryMain}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TouchableOpacity>
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Sản phẩm, thương hiệu và mọi thứ...'
          />
        </View>
        <TouchableOpacity>
          <CartIcon sizeIcon={26}
            colorIcon={colors.blueRoot}
            activeBGColor={true}
            bGQuantity={colors.bgButtonRed}
            colorQuantity="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.leftView}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.category,
                pressedCategory === category && styles.buttonPressed,
              ]}
            >
              <View style={[styles.leftActiveBarPressed, pressedCategory === category && styles.leftActiveBar]}></View>
              {/* <View style={styles.leftActiveBar}></View> */}
              <View style={styles.rightActivebar}>
                {/* <View style={styles.triangle}></View> */}
                <View style={[styles.leftActiveBarPressed, pressedCategory === category && styles.triangle]}></View>
              </View>
              <Image style={styles.imageCategory} alt={category} source={require('../../assets/football.png')} />
              <Text style={styles.textCategory}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.rightView}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleCategory}>{selectedCategory} </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon name='filter' style={styles.iconFilter}></Icon>
              </TouchableOpacity>
            </View>
            <FlatList
              data={leftData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              numColumns={numColumns}
              showsVerticalScrollIndicator={false}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Lọc Sản Phẩm</Text>
            </View>
            {/*<SelectionAttributeBrand title={"Thương Hiệu"} buttons={buttons} onActiveButtonChange={handleActiveButtonChangeBrand} reset={handleReset} />*/}
            {dataAll.map((i, index) =>
              <SelectionAttributeBrand
                key={index}
                data={i}
                onActiveButtonChange={handleActiveButtonChangeBrand}
                reset={isReset}
                getData={getData}
              />
            )
            }
            <View style={styles.modalGroupButton}>
              <TouchableOpacity style={styles.modalButtonReset} onPress={handleReset}>
                <Text style={styles.textReset}>Thiết lập lại</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonClose} onPress={handleDataUseFetch} >
                <Text style={styles.textClose}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    // alignItems: 'flex-end',
    justifyContent: "flex-end",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Để làm mờ giao diện cũ
  },
  modalContent: {
    height: '100%', // Độ dài khoảng 2 phần 3 màn hình
    width: '80%',
    backgroundColor: 'white',
  },
  modalHeader: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(27, 168, 255)",
  },
  closeButton: {
    fontSize: 24,
    color: "white",
    paddingLeft: 20
  },
  modalTitle: {
    fontSize: 17,
    color: "white",
    paddingRight: 20,
    fontWeight: "500",
  },
  modalGroupButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50
  },
  modalButtonReset: {
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "rgb(27, 168, 255)",
    width: "45%",
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonClose: {
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "rgb(27, 168, 255)",
    width: "45%",
    alignItems: "center",
    justifyContent: "center"
  },
  textReset: {
    color: "white",
    fontWeight: "500",
  },
  textClose: {
    color: "white",
    fontWeight: "500",
  },

  categoryMain: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(0, 191, 255)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 50,
  },
  inputContainer: {
    backgroundColor: 'white',
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginLeft: 5,
    paddingLeft: 10,
    borderRadius: 2,
  },
  body: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
  },
  leftView: {
    flex: 0.5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
  },
  rightView: {
    flex: 1.7,
    backgroundColor: 'white',
    flexDirection: 'column',
  }, category: {
    alignItems: 'center',
    borderBottomWidth: 0.2,
    justifyContent: 'center',
  },
  categoryItem: {
    backgroundColor: 'white',
    width: 130,
    height: 160,
    alignItems: 'center',
  },
  textCategory: {
    textAlign: 'center', // text-align: left;
    fontWeight: 'bold',
  },
  imageCategory: {
    width: 55,
    height: 55,
    alignSelf: 'center',
    marginTop: 10,
  },
  imageProduct: {
    width: 127,
    height: 90,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  rightTop: {
    flex: 0.5,
  },
  rightBottom: {
    flex: 0.5,
  },
  priceProduct: {
    margin: 0, // margin: 0px;
    display: 'flex', // display: flex;
    textAlign: 'left', // text-align: left;
    fontSize: 16, // font-size: 16px;
    lineHeight: 24, // line-height: 150%; (tính theo fontSize * 1.5)
    fontWeight: '300', // font-weight: 500;
    color: 'rgb(39, 39, 42)', // color: rgb(39, 39, 42);
  },
  productTabText: {
    fontWeight: '400', // font-weight: 600;
    color: 'black', // color: rgb(10, 104, 255);
    fontSize: 12,


  },
  leftActiveBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 4,
    backgroundColor: 'rgb(26, 148, 255)',
  },

  rightActivebar: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -50 }],
    width: 8,
    height: 22,
  },
  triangle: {
    marginTop: 35,
    width: 22,
    height: 22,
    backgroundColor: 'rgb(239, 239, 239)',
    transform: [{ rotate: '45deg' }],
    borderRadius: 4,
  },
  buttonPressed: {
    backgroundColor: 'white', // Change this to the color you want when pressed
    width: 80,
  },
  productTab: {
    marginLeft: 5,
    marginBottom: 5,
    flexDirection: 'column', // flex-direction: row;
    paddingVertical: 0, // padding: 0px 12px; (vertical padding only)
    paddingHorizontal: 12, // padding: 0px 12px; (horizontal padding only)
    height: 30, // height: 32px;
    backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255);
    alignItems: 'center', // align-items: center;
    borderWidth: 1, // border: 1px solid rgb(221, 221, 227);
    borderColor: '#ccc', // border: 1px solid rgb(10, 104, 255);
    borderRadius: 16, // border-radius: 16px;
    fontSize: 14, // font-size: 14px;
    lineHeight: 21, // line-height: 150% (14 * 1.5 = 21);
    cursor: 'pointer', // cursor: pointer;
    display: 'flex', // display: flex;
    textAlign: 'center', // text-align: center;
  },
  titleCategory: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Thêm dòng này để canh lề trái và lề phải
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: 5,

  },
  iconFilter: {
    color: 'black',
    borderColor: "black",
    fontSize: 18,
    marginRight: 10,
  },
});
export default CategoryScreen;
