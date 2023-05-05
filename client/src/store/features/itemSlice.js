import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { processItem } from './processor';

const ITEMS_URL = '/api/items';

const initialState = {
  items: null,
  previousItems: null,
  currentItem: null,
  loading: false,
  error: null,
};

export const getall = createAsyncThunk(
  'item/getall',
  async (token, thunkAPI) => {
    try {
      const response = await axios
        .create({
          headers: {
            Authorization: token,
          },
        })
        .get(ITEMS_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot get items');
    }
  }
);

export const saveItem = createAsyncThunk(
  'item/save',
  async (payload, thunkAPI) => {
    let { token, item } = payload;
    item = processBeforeSave(item);

    const { id, ...data } = item;
    try {
      if (id) {
        await axios.create({
          headers: {
              Authorization: token,
          },
      })
      .put(`${ITEMS_URL}/${id}`, data);
        return;
      } else {
        // create a new item
        const response = await axios
          .create({
            headers: {
              Authorization: token,
            },
          })
          .post(ITEMS_URL, data);
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot save item');
    }
  }
);

export const deleteItem = createAsyncThunk(
  'item/delete',
  async (payload, thunkAPI) => {
    const { token, id } = payload;
    try {
      await axios
        .create({
          headers: {
            Authorization: token,
          },
        })
        .delete(`${ITEMS_URL}/${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue('Cannot delete item');
    }
  }
);

const processBeforeSave = (item) => ({
  ...item,
  price: item.price * 100,
});

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    updateCurrentItem: (state, action) => {
      const { name, value } = action.payload;
      state.currentItem[name] = value;
    },
    resetCurrentItem: (state) => {
      state.currentItem = null;
    },
    setItem: (state, action) => {
      state.currentItem = null;
      const item = action.payload;
      state.previousItems = state.items.map((obj) => ({ ...obj }));
      const { id } = item;
      if (id) {
        // update existing item
        // use the id to find the index of the existing item
        // in the current list and update it
        const index = state.items.findIndex(
          (itemEntry) => itemEntry._id === id
        );
        state.items[index].name = name;
        state.items[index].description = description;
        state.items[index].price = price;
      } else {
        // add new item
        const newItem = {
          id: uuidv4(),
          ...item,
        };
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.currentItem = null;
      const itemId = action.payload;
      state.previousItems = state.items.map((obj) => ({ ...obj }));
      state.items = state.items.filter((obj) => obj.id !== itemId);
    },
  },
  extraReducers: {
    [getall.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getall.fulfilled]: (state, action) => {
      state.loading = false;
      state.items = action.payload.items.map((item) => processItem(item));
      state.error = null;
    },
    [getall.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [saveItem.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [saveItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.previousItems = null;
      if (action.payload) {
        // update the id of the newly created item
        const idx = state.items.findIndex((obj) => uuidValidate(obj.id));
        if (idx !== -1) {
          state.items[idx] = processItem(action.payload);
        }
      }
      // We do not need to do anything
      // with updating the existing item
    },
    [saveItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = state.previousItems;
      state.previousItems = null;
    },
    [deleteItem.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteItem.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
      state.previousItems = null;
    },
    [deleteItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.items = state.previousItems;
      state.previousItems = null;
    },
  },
});

export const {
  setCurrentItem,
  updateCurrentItem,
  resetCurrentItem,
  setItem,
  removeItem,
} = itemSlice.actions;

export default itemSlice.reducer;
