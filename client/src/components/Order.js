import Button from 'react-bootstrap/Button';
import { OrderCard } from '.';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetOrder } from '../store/features/orderSlice';

const Order = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickBuyMore = () => {
    dispatch(resetOrder());
    navigate('/dashboard');
  };

  return (
    <>
      <p>Thanks for your order!</p>
      <OrderCard order={order} />
      <Button variant="primary" onClick={handleClickBuyMore}>
        Buy more
      </Button>
    </>
  );
};

export default Order;
