
export const BASE_URL = 'http://localhost:8080'

export const API_GET_PATHS = {
    lay_ds_giay_moi: `${BASE_URL}/api/product-shoes/ds-giay-moi?`,
    lay_ds_giay_hot: `${BASE_URL}/api/product-shoes/ds-giay-hot?`,
    lay_ds_giay_khuyen_mai: `${BASE_URL}/api/product-shoes/ds-giay-khuyen_mai?`,

    lay_ds_giay_nike_nam: `${BASE_URL}/api/product-shoes/ds-giay-nike-nam?`,
    lay_ds_giay_nike_nu: `${BASE_URL}/api/product-shoes/ds-giay-nike-nu?`,

    lay_ds_giay_adidas_nam: `${BASE_URL}/api/product-shoes/ds-giay-adidas-nam?`,
    lay_ds_giay_adidas_nu: `${BASE_URL}/api/product-shoes/ds-giay-adidas-nu?`,

    lay_ds_giay_jordan_nam: `${BASE_URL}/api/product-shoes/ds-giay-jordan-nam?`,
    lay_ds_giay_jordan_nu: `${BASE_URL}/api/product-shoes/ds-giay-jordan-nu?`,

    lay_ds_san_pham_theo_ten: `${BASE_URL}/api/products/ds-san-pham?`,
    lay_thong_tin_san_pham: `${BASE_URL}/api/products/infor-product/`,
    tim_kiem_san_pham: `${BASE_URL}/api/products/search?name=`,
    danh_gia_san_pham: `${BASE_URL}/api/comment`,

    chi_tiet_don_hang: `${BASE_URL}/api/order/infor-order?`,
    lich_su_mua_hang: `${BASE_URL}/api/history/lich-su-mua-hang?`
}


export const API_POST_PATHS = {
    tao_don_hang: `${BASE_URL}/api/order/create-order`
}
