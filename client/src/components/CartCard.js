import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { ItemCardBody } from '.';
import { update as updateCart } from '../store/features/cartSlice';

const CartCard = ({ item, quantity }) => {
  const { token } = useSelector((store) => store.userState);
  const { id: cartId } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleChange = (evt) => {
    setItemQuantity(evt.target.value);
  };

  const handleBlur = () => {
    // check whether itemQuantity is valid
    const q = Number(itemQuantity);
    if (q > 0 && q !== quantity) {
      dispatch(
        updateCart({
          token,
          cartId,
          item: {
            id: item.id,
            quantity: q,
          },
        })
      );
    }
  };

  const handleClickDelete = () => {
    dispatch(
      updateCart({
        token,
        cartId,
        item: {
          id: item.id,
          quantity: 0,
        },
      })
    );
  };

  const inputId = `quantity-${item._id}`;

  return (
    <Card className="mb-4">
      <ItemCardBody item={item} />
      <Card.Footer className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Form.Label className="me-1 mb-0">Quantity</Form.Label>
          <Form.Control
            id={inputId}
            value={itemQuantity}
            type="number"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <BsTrash role="button" onClick={handleClickDelete} />
      </Card.Footer>
    </Card>
  );
};

export default CartCard;
