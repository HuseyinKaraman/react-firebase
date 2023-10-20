import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../config/firebase";
import {
    createUserWithEmailAndPassword,
    updateCurrentUser,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";

const initialState = {
    name: "",
    email: "",
    error: null,
    isLoading: false,
};

export const register = createAsyncThunk("auth/register", async ({ name, email, password }, { rejectWithValue }) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateCurrentUser(auth, { displayName: name });
    } catch (e) {
        return rejectWithValue(e.code);
    }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        return rejectWithValue(e.code);
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        return rejectWithValue(e.code);
    }
});

export const logOut = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
    } catch (error) {
        return rejectWithValue(error.code);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeInfo: (state, action) => {
            state[action.payload[0]] = action.payload[1];
        },
        errorReset: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { changeInfo,errorReset } = authSlice.actions;

export default authSlice.reducer;
