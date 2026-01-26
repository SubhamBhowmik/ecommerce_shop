import * as actionTypes from '../constants/productConstant';


export const getProductReducer = (state = {products: [], selectedCategory: null}, action) => {
    switch(action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return { ...state, products: action.payload }
        case actionTypes.GET_PRODUCTS_FAIL:
            return { ...state, error: action.payload }
        case actionTypes.SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload }
        default:
            return state
    }
};

export const getProductDetailsReducer = (state = { product: {}}, action) => {
    
    console.log('Hi', action.type)
    switch(action.type){
        case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
            return { loading: true }
        case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case actionTypes.GET_PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_PRODUCT_DETAILS_RESET: 
            return {
                product: {}
            }
        default:
            return state
    }
}