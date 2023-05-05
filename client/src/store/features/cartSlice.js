import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addCartId, removeCart } from '../../utils/localStorage';
import { processItem } from './processor';
import { create as createOrder } from './orderSlice';

const CART_URL = '/api/carts';

/*
items: [{
  item: {},
  quantity: ...
}]
*/
const initialState = {
  id: null,
  items: [],
  previousItems: null,
  error: null,
  loading: false,
  loaded: false,
};

export const createCartAsync = createAsyncThunk(
  'cart/create',
  async (payload, thunkAPI) => {
    try {
      const { token, item } = payload;
      const response = await axios
        .create({
          headers: {
            Authorization: token,
          },
        })
        .post(CART_URL, { item: item.id });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot create cart');
    }
  }
);

export const update = createAsyncThunk(
  'cart/update',
  async (payload, thunkAPI) => {
    try {
      const { token, cartId, item } = payload;
      const response = await axios
        .create({
          headers: {
            Authorization: token,
          },
        })
        .patch(`${CART_URL}/${cartId}`, {
          item,
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot update cart');
    }
  }
);

export const get = createAsyncThunk('cart/get', async (payload, thunkAPI) => {
  try {
    const { token, cartId } = payload;
    const response = await axios
      .create({
        headers: {
          Authorization: token,
        },
      })
      .get(`${CART_URL}/${cartId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Cannot get cart');
  }
});

const processItems = (items) =>
  items.map((entry) => ({
    item: processItem(entry.item),
    quantity: entry.quantity,
  }));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCart: (state, action) => {
      const item = action.payload;
      state.previousItems = [];
      state.items = [
        {
          item,
          quantity: 1,
        },
      ];
    },
    setLoaded: (state) => {
      state.loaded = true;
    },
  },
  extraReducers: {
    [createCartAsync.fulfilled]: (state, action) => {
      const { _id, items } = action.payload.cart;
      state.id = _id;
      state.items = processItems(items);
      addCartId(state.id);
      state.previousItems = null;
      state.error = null;
    },
    [createCartAsync.rejected]: (state, action) => {
      state.items = state.previousItems;
      state.previousItems = null;
      state.error = action.payload;
    },
    [get.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [get.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id, items } = action.payload.cart;
      state.id = _id;
      state.items = processItems(items);
      state.error = null;
      state.loaded = true;
    },
    [get.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.loaded = true;
    },
    [update.fulfilled]: (state, action) => {
      const { _id, items } = action.payload.cart;
      state.id = _id;
      state.items = processItems(items);
      state.previousItems = null;
      state.error = null;
    },
    [update.rejected]: (state, action) => {
      state.items = state.previousItems;
      state.previousItems = null;
      state.error = action.payload;
    },
    [createOrder.fulfilled]: () => {
      removeCart();
      return { ...initialState, loaded: true };
    },
  },
});

export const { createCart, setLoaded } = cartSlice.actions;

export default cartSlice.reducer;
