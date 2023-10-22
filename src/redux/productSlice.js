import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { productsRef, db } from "../config/firebase";

export const addProduct = createAsyncThunk("product/addProduct", async (_, { getState }) => {
    try {
        await addDoc(productsRef, getState().products.draftProduct);
    } catch (error) {}
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id) => {
    try {
        // await deleteDoc(doc(db, "products", id));
        await deleteDoc(doc(productsRef,id));
    } catch (error) {}
});

const initialState = {
    draftProduct: {
        name: "Casper Nirvana",
        description: "good pc",
        price: 2500,
        tags: ["casper","nirvana"],
    },
    products: [],
    isLoading:false,
    error:null
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        changeDraftProductInfo: (state, action) => {
            state.draftProduct[action.payload[0]] = action.payload[1];
        },
        addDraftProductTag: (state, action) => {
            state.draftProduct.tags.push(action.payload);
        },
        deleteDraftProductTag: (state, action) => {
            state.draftProduct.tags = state.draftProduct.tags.filter((tag) => tag !== action.payload);
        },
        clearDraftProduct: (state) => {
            state.draftProduct = initialState.draftProduct;
        },
        setDraftProduct: (state, action) => {
            state.draftProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const {
    changeDraftProductInfo,
    addDraftProductTag,
    deleteDraftProductTag,
    clearDraftProduct,
    setDraftProduct,
    setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
