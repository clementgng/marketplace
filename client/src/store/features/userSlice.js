import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addToken, removeToken } from "../../utils/localStorage";

const AUTH_URL = "/api/auth";
const REGISTER_PATH = "/register";
const LOGIN_PATH = "/login";
const GET_USER_PATH = "/current";

const initialState = {
    userId: null,
    name: null,
    role: null,
    token: null,
    pending: false,
    error: null,
    loaded: false,
};

export const auth = createAsyncThunk(
    "user/auth",
    async (userInfo, thunkAPI) => {
        // userInfo is for member, then call /api/auth/login
        // userInfo is for non-member, then call /api/auth/register
        const { user, isMember } = userInfo;
        try {
            const url = `${AUTH_URL}${isMember ? LOGIN_PATH : REGISTER_PATH}`;
            const response = await axios.post(url, user);
            return response.data;
        } catch (error) {
            const errorMsg = isMember
                ? "Invalid credential"
                : "Failed to register";
            return thunkAPI.rejectWithValue(errorMsg);
        }
    }
);

export const getUser = createAsyncThunk("user/get", async (token, thunkAPI) => {
    try {
        const url = `${AUTH_URL}${GET_USER_PATH}`;
        const response = await axios
            .create({
                headers: {
                    Authorization: token,
                },
            })
            .get(url);
        return {
            ...response.data,
            token,
        };
    } catch (error) {
        return thunkAPI.rejectWithValue("Invalid token");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
        setLoaded: (state) => {
            state.loaded = true;
        },
        resetUser: () => {
            removeToken();
            return { ...initialState, loaded: true };
        },
    },
    // extraReducers to put actions from reduxThunk
    extraReducers: {
        [auth.pending]: (state) => {
            state.pending = true;
            state.error = null;
        },
        [auth.fulfilled]: (state, action) => {
            state.pending = false;
            const { userId, name, role, token } = action.payload;
            state.userId = userId;
            state.name = name;
            state.role = role;
            state.token = token;
            state.error = null;
            // store the token to local storage
            addToken(token);
        },
        [auth.rejected]: (state, action) => {
            state.pending = false;
            state.error = action.payload;
        },
        [getUser.pending]: (state) => {
            state.pending = true;
            state.error = null;
        },
        [getUser.fulfilled]: (state, action) => {
            state.pending = false;
            const { userId, name, role, token } = action.payload;
            state.userId = userId;
            state.name = name;
            state.role = role;
            state.token = token;
            state.error = null;
            state.loaded = true;
        },
        [getUser.rejected]: (state, action) => {
            state.pending = false;
            state.error = action.payload;
            state.loaded = true;
        },
    },
});

export const { resetError, setLoaded, resetUser } = userSlice.actions;

export default userSlice.reducer;
