import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import itemReducer from './features/itemSlice';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';

export const store = configureStore({
  reducer: {
    userState: userReducer,
    itemState: itemReducer,
    cartState: cartReducer,
    orderState: orderReducer,
  },
});
