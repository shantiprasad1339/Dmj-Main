import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productInfo: [],
    seoInfo: [],
    thumbImg: [],
    proImage:[],
    size:[],
    color:[],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProductInfo: (state, payload) => {
            state.productInfo = payload
        },
        addSeo: (state, payload) => {
            state.seoInfo = payload
        },
        addThumbImg: (state, payload) => {
            state.thumbImg = payload
        },
        addProImg:(state,payload)=>{
            state.proImage =payload
        },
        addSize:(state,payload)=>{
            state.size = payload
        },
        addColor:(state,payload)=>{
            state.color = payload
        }
    }
}) 

export const {addProductInfo,addProImg,addThumbImg,addSeo,addSize,addColor}=productSlice.actions

export default productSlice.reducer;