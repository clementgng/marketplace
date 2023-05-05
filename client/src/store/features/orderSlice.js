import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { processItem } from './processor';

// ADDRESS_URL
const ORDER_URL = 'api/orders';

const initialState = {
  order: null,
  orders: null,
  error: null,
  creatingOrder: false,
  loading: false,
};

export const get = createAsyncThunk('orders/get', async (token, thunkAPI) => {
  try {
    const response = await axios
      .create({
        headers: {
          Authorization: token,
        },
      })
      .get(ORDER_URL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Cannot get orders');
  }
});

export const create = createAsyncThunk(
  'orders/create',
  async (payload, thunkAPI) => {
    try {
      const { token, cartId, address } = payload;
      const response = await axios
        .create({
          headers: {
            Authorization: token,
          },
        })
        .post(ORDER_URL, {
          cartId,
          address,
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot create order');
    }
  }
);

const processOrder = (order) => {
  order.items = order.items.map((entry) => ({
    ...entry,
    item: processItem(entry.item),
  }));
  return order;
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: {
    [create.pending]: (state) => {
      state.creatingOrder = true;
      state.error = null;
    },
    [create.fulfilled]: (state, action) => {
      state.creatingOrder = false;
      state.error = null;
      state.order = processOrder(action.payload.order);
    },
    [create.rejected]: (state, action) => {
      state.creatingOrder = false;
      state.error = action.payload;
    },
    [get.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [get.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.orders = action.payload.orders.map((order) => processOrder(order));
    },
    [get.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
