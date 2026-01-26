import * as actionTypes from '../constants/productConstant';
import axios from 'axios';

export const getProducts = () => async (dispatch) => {
    try {
        console.log('Hiiiiii')
        const { data } = await axios.get(`http://localhost:8000/products`);
        dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response });
    }
};

export const getProductsByCategory = (category) => async (dispatch) => {
    try {
        console.log("📦 Fetching products for category:", category);

        const url = `https://eccomerce-spring-2.onrender.com/api/products/category/${category}`;
        console.log("🔗 API URL:", url);

        const { data } = await axios.get(url);

        console.log("✅ API response data:", data);

        // Transform API response to match the expected format for Slide component
        const transformedData = data.map(product => {
            // Get the first image URL from the images array
            const imageUrl = product.images && Array.isArray(product.images) && product.images.length > 0 
                ? product.images[0] 
                : '';

            return {
                id: product.id,
                url: imageUrl,
                title: {
                    shortTitle: product.name || '',
                    longTitle: product.description || product.name || ''
                },
                price: {
                    mrp: product.price || 0,
                    cost: product.price || 0,
                    discount: product.rating ? `${product.rating}⭐` : ''
                },
                discount: `₹${product.price || 0}`,
                tagline: product.subcategory || product.category || '',
                description: product.description || '',
                rating: product.rating || 0,
                reviews: product.reviews || 0,
                stock: product.stock || 0,
                size: product.size || [],
                // Keep original API data for list view
                name: product.name,
                images: product.images,
                category: product.category,
                subcategory: product.subcategory,
                originalPrice: product.price
            };
        });

        console.log("🔄 Transformed data:", transformedData);

        // Set selected category
        dispatch({
            type: actionTypes.SET_SELECTED_CATEGORY,
            payload: category
        });

        dispatch({
            type: actionTypes.GET_PRODUCTS_SUCCESS,
            payload: transformedData,
        });
    } catch (error) {
        console.error("❌ Error fetching products by category:", error);

        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.response?.data || error.message,
        });
    }
};


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`https://eccomerce-spring-2.onrender.com/api/products/${id}`);
        console.log(data);

        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.response});

    }
};


export const clearSelectedCategory = () => (dispatch) => {
    dispatch({
        type: actionTypes.SET_SELECTED_CATEGORY,
        payload: null
    });
};
