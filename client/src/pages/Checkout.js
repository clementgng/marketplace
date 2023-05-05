import { useSelector } from 'react-redux';
import { AddressForm, Order } from '../components';

const Checkout = () => {
  const { order } = useSelector((store) => store.orderState);

  if (order) {
    return <Order order={order} />;
  } else {
    return <AddressForm />;
  }
};

export default Checkout;
