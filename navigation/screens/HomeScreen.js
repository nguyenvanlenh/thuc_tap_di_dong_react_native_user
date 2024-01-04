import React, {useEffect, useState} from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/home/Header";
import BannerGrid from "../../components/home/BannerGrid";
import ElementProduct from "../../components/home/ElementProduct";
import SuggestedProduct from "../../components/home/SuggestedProduct";
import {useFetchDataSuggested} from "../../utils/LoadData";

function HomeScreen() {
    const { data, handleScroll } = useFetchDataSuggested();
    return (
        <View style={{flex: 1}}>
            <Header></Header>
            <ScrollView onScroll={handleScroll}
                        scrollEventThrottle={16}>
                <View style={styles.main}>
                    <View style={styles.mainFormat}>
                        <BannerGrid></BannerGrid>
                        <ElementProduct title={"Sản phẩm bán chạy"} type={"ds-ao-da-banh-hot"}></ElementProduct>
                        <ElementProduct title={"Sản phẩm mới"} type={"ds-ao-da-banh-moi"}></ElementProduct>
                        <ElementProduct title={"Sản phẩm khuyến mãi"} type={"ds-ao-da-banh-khuyen-mai"}></ElementProduct>
                        {/*<SuggestedProduct data={data}></SuggestedProduct>*/}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    mainFormat: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        backgroundColor: "#F5F5FA",
    },
});

export default HomeScreen;
