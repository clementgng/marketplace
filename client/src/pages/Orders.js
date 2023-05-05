import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { get as getOrders } from '../store/features/orderSlice';
import Button from 'react-bootstrap/Button';
import { OrderCard } from '../components';

const Orders = () => {
  const { token } = useSelector((store) => store.userState);
  const { loading, orders } = useSelector((store) => store.orderState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders(token));
  }, [dispatch, token]);

  if (loading) return null;

  const handleClickBuyMore = () => {
    navigate('/dashboard');
  };

  const renderOrders = () => (
    <>
      {orders.map((order) => (
        <div key={order._id}>
          <p>{new Date(Date.parse(order.createdAt)).toDateString()}</p>
          <OrderCard order={order} />
        </div>
      ))}
    </>
  );

  return (
    <>
      {!!orders?.length ? renderOrders() : <p>No Orders</p>}
      <Button variant="primary" onClick={handleClickBuyMore}>
        Buy more
      </Button>
    </>
  );
};

export default Orders;
