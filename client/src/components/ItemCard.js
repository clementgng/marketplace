import Card from 'react-bootstrap/Card';
import { BsPencilSquare, BsTrash, BsCartPlus } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentItem,
  deleteItem,
  removeItem,
} from '../store/features/itemSlice';
import { isBuyer, isSeller } from '../utils/role';
import {
  createCart,
  createCartAsync,
  update as updateCart,
} from '../store/features/cartSlice';
import { ItemCardBody } from '.';

const ItemCard = ({ item }) => {
  const { token, role } = useSelector((store) => store.userState);
  const { id: cartId } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();

  const handleClickEdit = () => dispatch(setCurrentItem(item));

  const handleClickDelete = () => {
    dispatch(removeItem(item.id));
    dispatch(deleteItem({ token, id: item.id }));
  };

  const handleClickCart = () => {
    if (cartId) {
      // update the cart
      dispatch(
        updateCart({
          token,
          cartId,
          item: {
            id: item.id,
          },
        })
      );
    } else {
      // create a new cart
      dispatch(createCart(item));
      dispatch(createCartAsync({ token, item }));
    }
  };

  return (
    <Card className="mb-4">
      <ItemCardBody item={item} />
      <Card.Footer>
        {isSeller(role) && (
          <span>
            <BsPencilSquare
              role="button"
              className="me-3"
              onClick={handleClickEdit}
            />
            <BsTrash role="button" onClick={handleClickDelete} />
          </span>
        )}
        {isBuyer(role) && (
          <BsCartPlus role="button" onClick={handleClickCart} />
        )}
      </Card.Footer>
    </Card>
  );
};

export default ItemCard;
