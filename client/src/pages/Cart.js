import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartCard } from '../components';

const Cart = () => {
  const { items, loaded } = useSelector((store) => store.cartState);
  const navigate = useNavigate();

  const handleClickBuyMore = () => {
    navigate('/dashboard');
  };

  const handleClickCheckout = () => {
    navigate('/checkout');
  };

  const getTotalPrice = () => {
    const total = items.reduce(
      (prevTotal, currEntry) =>
        prevTotal + currEntry.item.price * currEntry.quantity,
      0
    );
    return total.toFixed(2);
  };

  return (
    <>
      {loaded &&
        (!!items?.length ? (
          <>
            <div>
              {items.map((entry) => (
                <CartCard
                  key={entry.item.id}
                  item={entry.item}
                  quantity={entry.quantity}
                />
              ))}
            </div>
            <p>
              Total price: <span className="fw-bold">${getTotalPrice()}</span>
            </p>
          </>
        ) : (
          <div>Empty Cart</div>
        ))}
      <div className="d-flex justify-content-between">
        <Button variant="light" onClick={handleClickBuyMore}>
          Buy more
        </Button>
        <Button variant="primary" onClick={handleClickCheckout}>
          Check out
        </Button>
      </div>
    </>
  );
};

export default Cart;
