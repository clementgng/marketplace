const addToken = (token) => localStorage.setItem('token', token);

const removeToken = () => localStorage.removeItem('token');

const getToken = () => localStorage.getItem('token');

const addCartId = (cartId) => localStorage.setItem('cart', cartId);

const getCartId = () => localStorage.getItem('cart');

const removeCart = () => localStorage.removeItem('cart');

export { addToken, removeToken, getToken, addCartId, getCartId, removeCart };
