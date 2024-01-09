import {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function SelectionAttributeBrand({data, reset, getData}){
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() =>{
        setActiveButton(null);
        // console.log(activeButton)
    },[reset])

    // console.log(data);
    const handlePress = (buttonId) => {
        getData(data.title, buttonId);
        setActiveButton(buttonId);
    };
    return(
        <View style={styles.container}>
            <View style={styles.widgetHeader}>
                <View style={styles.widgetHeaderTitle}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{data.title}</Text>
                    </View>
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.productTabContainer}>
                    {data.data.map((i) => (
                        <TouchableOpacity
                            key={i.id}
                            style={[
                                styles.productTab,
                                activeButton === i.id ? styles.activeProductTab : null,
                            ]}
                            onPress={() => handlePress(i.id)}
                        >
                            <Text
                                style={[
                                    styles.productTabText,
                                    activeButton === i.id
                                        ? styles.activeProductTabText
                                        : null,
                                ]}
                            >
                                {i.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,      // Độ rộng của border bottom
        borderBottomColor: 'lightgray',
        paddingVertical: 12, // tương đương với padding-block trong CSS
        paddingHorizontal: 0, // Nếu cần padding theo chiều ngang
        flexDirection: 'column', // flex-direction: column trong CSS
        backgroundColor: 'rgb(255, 255, 255)', // background: rgb(255, 255, 255) trong CSS
        gap: 12,
    },
    //------------------------------------------------------------------
    widgetHeader: {
        paddingLeft: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    titleText: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24, // Điều chỉnh giữa dòng dựa trên percentual của fontSize
        color: '#27272a', // Màu tương ứng với rgb(39, 39, 42)
    },
    //-------------------------------------------------------------------
    productTabContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 16,
        height: 34,
    },

    productTab: {
        flexDirection: 'row', // flex-direction: row;
        paddingVertical: 0, // padding: 0px 12px; (vertical padding only)
        paddingHorizontal: 12, // padding: 0px 12px; (horizontal padding only)
        height: 32, // height: 32px;
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
    productTabText: {
        fontWeight: '600', // font-weight: 600;
        color: '#ccc', // color: rgb(10, 104, 255);
    },

    activeProductTab: {
        flexDirection: 'row', // flex-direction: row;
        paddingVertical: 0, // padding: 0px 12px; (vertical padding only)
        paddingHorizontal: 12, // padding: 0px 12px; (horizontal padding only)
        height: 32, // height: 32px;
        backgroundColor: 'rgb(255, 255, 255)',
        // background: rgb(255, 255, 255);
        alignItems: 'center', // align-items: center;
        borderWidth: 1, // border: 1px solid rgb(221, 221, 227);
        borderColor: 'rgb(10, 104, 255)',
        borderRadius: 16, // border-radius: 16px;
        fontSize: 14, // font-size: 14px;
        lineHeight: 21, // line-height: 150% (14 * 1.5 = 21);
        cursor: 'pointer', // cursor: pointer;
        display: 'flex', // display: flex;
        textAlign: 'center', // text-align: center;
    },
    activeProductTabText: {
        fontWeight: '600', // font-weight: 600;
        color: 'rgb(10, 104, 255)',// color: rgb(10, 104, 255);
    },
    //-------------------------------------------------------------------
});