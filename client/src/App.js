import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  Dashboard,
  Auth,
  Error,
  Restricted,
  Cart,
  Checkout,
  Orders,
} from './pages';
import PageWrapper from './assets/wrappers/Page';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  setLoaded as setUserLoaded,
} from './store/features/userSlice';
import {
  get as getCart,
  setLoaded as setCartLoaded,
} from './store/features/cartSlice';
import { getCartId, getToken } from './utils/localStorage';
import { Header } from './components';

function App() {
  const { token } = useSelector((store) => store.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getUser(token));
    } else {
      dispatch(setUserLoaded());
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const cartId = getCartId();
      if (cartId) {
        dispatch(getCart({ token, cartId }));
      } else {
        dispatch(setCartLoaded());
      }
    }
  }, [dispatch, token]);

  return (
    <PageWrapper>
      <BrowserRouter>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <Restricted>
                  <Dashboard />
                </Restricted>
              }
            />
            <Route
              path="/cart"
              element={
                <Restricted>
                  <Cart />
                </Restricted>
              }
            />
            <Route
              path="/checkout"
              element={
                <Restricted>
                  <Checkout />
                </Restricted>
              }
            />
            <Route
              path="/orders"
              element={
                <Restricted>
                  <Orders />
                </Restricted>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </PageWrapper>
  );
}

export default App;
