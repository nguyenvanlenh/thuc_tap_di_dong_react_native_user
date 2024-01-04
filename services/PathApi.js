
export const BASE_URL = 'https://okay-town-production.up.railway.app'

export const API_GET_PATHS = {
    lay_ds_ao: `${BASE_URL}/api/products/`,
    lay_ds_ao_all: `${BASE_URL}/api/products`,

    lay_ds_do_nike_nam: `${BASE_URL}/api/products/ds-ao-da-banh-nike-nam?`,
    lay_ds_do_nike_nu: `${BASE_URL}/api/products/ds-ao-da-banh-nike-nu?`,

    lay_ds_do_adidas_nam: `${BASE_URL}/api/products/ds-ao-da-banh-adidas-nam?`,
    lay_ds_do_adidas_nu: `${BASE_URL}/api/products/ds-ao-da-banh-adidas-nu?`,

    lay_ds_do_puma_nam: `${BASE_URL}/api/products/ds-ao-da-banh-puma-nam?`,
    lay_ds_do_puma_nu: `${BASE_URL}/api/products/ds-ao-da-banh-puma-nu?`,
    // --------------------

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
